'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Loader2, MessageSquarePlus, RefreshCw, Search, Send } from 'lucide-react'

/** Mirrors the shape returned by /api/sms/threads. */
interface StoredMessage {
  id: string
  conversationId: string
  from: string
  to: string
  body: string
  direction: 'inbound' | 'outbound'
  timestamp: string
  contactName: string
  status: string
  readyToBook: boolean
}

interface Conversation {
  conversationId: string
  phone: string
  displayPhone: string
  contactName: string
  messages: StoredMessage[]
  lastMessage: string
  lastTimestamp: string
  lastDirection: 'inbound' | 'outbound'
  unreadCount: number
  readyToBook: boolean
}

interface ThreadsResponse {
  conversations?: Conversation[]
  businessNumber?: string
  sendingConfigured?: boolean
  error?: string
  detail?: string
}

/** Slow enough to stay well inside Airtable's rate limit, fast enough to feel live. */
const POLL_INTERVAL_MS = 12_000

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(-10)
  if (digits.length !== 10) return raw || 'Unknown'
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function relativeTime(iso: string): string {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''

  const minutes = Math.round((Date.now() - then) / 60_000)
  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes}m`
  if (minutes < 60 * 24) return `${Math.round(minutes / 60)}h`
  if (minutes < 60 * 24 * 7) return `${Math.round(minutes / (60 * 24))}d`
  return new Date(then).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function messageTime(iso: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function MessagesInbox({ initialError }: { initialError?: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string>(initialError ?? '')
  const [sendError, setSendError] = useState('')
  const [sendingConfigured, setSendingConfigured] = useState(true)
  const [businessNumber, setBusinessNumber] = useState('')
  const [composeTo, setComposeTo] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement | null>(null)
  // Tracked in a ref so the polling effect doesn't need to re-subscribe every
  // time the operator clicks a different thread.
  const selectedRef = useRef<string | null>(null)
  selectedRef.current = selectedId

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/sms/threads', { cache: 'no-store' })
      const data: ThreadsResponse = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || 'Could not load conversations.')
        return
      }

      setError('')
      setConversations(data.conversations ?? [])
      setSendingConfigured(data.sendingConfigured !== false)
      if (data.businessNumber) setBusinessNumber(data.businessNumber)
    } catch {
      setError('Lost connection to the server — retrying.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
    const timer = setInterval(() => void load(), POLL_INTERVAL_MS)
    // Catch up immediately when the tab comes back rather than waiting out the
    // rest of the interval on a laptop that just woke up.
    const onVisible = () => {
      if (document.visibilityState === 'visible') void load()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [load])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return conversations
    const digits = needle.replace(/\D/g, '')
    return conversations.filter(
      c =>
        c.contactName.toLowerCase().includes(needle) ||
        c.lastMessage.toLowerCase().includes(needle) ||
        (digits.length >= 3 && c.phone.replace(/\D/g, '').includes(digits)),
    )
  }, [conversations, query])

  const selected = useMemo(
    () => conversations.find(c => c.conversationId === selectedId) ?? null,
    [conversations, selectedId],
  )

  // Keep the newest message in view as the thread grows or changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [selected?.messages.length, selectedId])

  const openThread = useCallback(
    async (conversation: Conversation) => {
      setSelectedId(conversation.conversationId)
      setComposeTo(null)
      setSendError('')
      if (!conversation.unreadCount) return

      // Optimistic: clear the badge now, let the next poll confirm.
      setConversations(prev =>
        prev.map(c =>
          c.conversationId === conversation.conversationId ? { ...c, unreadCount: 0 } : c,
        ),
      )
      try {
        await fetch('/api/sms/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId: conversation.conversationId }),
        })
      } catch {
        // Non-fatal: the badge reappears on the next poll if this failed.
      }
    },
    [],
  )

  const recipient = composeTo !== null ? composeTo : (selected?.phone ?? '')

  const handleSend = useCallback(async () => {
    const body = draft.trim()
    const to = recipient.trim()
    if (!body || !to || sending) return

    setSending(true)
    setSendError('')
    try {
      const res = await fetch('/api/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, body }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setSendError(data?.error || 'The message could not be sent.')
        return
      }

      setDraft('')
      const conversationId: string | undefined = data?.message?.conversationId
      if (conversationId) {
        setSelectedId(conversationId)
        setComposeTo(null)
      }
      await load()
    } catch {
      setSendError('Could not reach the server. The message was not sent.')
    } finally {
      setSending(false)
    }
  }, [draft, recipient, sending, load])

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <header className="flex items-center justify-between gap-4 bg-navy px-5 py-3 text-white">
        <div className="min-w-0">
          <h1 className="font-display text-lg font-bold leading-tight">Messages</h1>
          <p className="truncate text-xs text-navy-200">
            {businessNumber ? formatPhoneDisplay(businessNumber) : '(405) 526-4956'}
            {totalUnread > 0 && ` · ${totalUnread} unread`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setComposeTo('')
              setSelectedId(null)
              setSendError('')
            }}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white/20"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New
          </button>
          <button
            type="button"
            onClick={() => void load()}
            aria-label="Refresh conversations"
            className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {!sendingConfigured && (
        <p className="bg-gold-50 px-5 py-2 text-sm text-gold-800">
          Incoming texts are being saved, but replies can&apos;t send yet — the Twilio credentials
          (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER) still need to be added in Vercel.
        </p>
      )}
      {error && <p className="bg-red-50 px-5 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex min-h-0 flex-1">
        {/* Thread list */}
        <aside
          className={`w-full flex-col border-r border-slate-200 bg-white sm:flex sm:w-80 lg:w-96 ${
            selected || composeTo !== null ? 'hidden sm:flex' : 'flex'
          }`}
        >
          <div className="border-b border-slate-200 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search name, number, or text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-ocean focus:bg-white"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {loading && !conversations.length && (
              <p className="p-5 text-sm text-slate-500">Loading conversations…</p>
            )}
            {!loading && !filtered.length && (
              <p className="p-5 text-sm text-slate-500">
                {conversations.length
                  ? 'No conversations match that search.'
                  : 'No texts yet. Anything sent to the business number shows up here.'}
              </p>
            )}

            {filtered.map(conversation => {
              const isActive = conversation.conversationId === selectedId
              return (
                <button
                  key={conversation.conversationId}
                  type="button"
                  onClick={() => void openThread(conversation)}
                  className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${
                    isActive ? 'bg-navy-50' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          conversation.unreadCount ? 'font-bold text-navy-900' : 'font-medium text-slate-800'
                        }`}
                      >
                        {conversation.contactName || conversation.displayPhone}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">
                        {relativeTime(conversation.lastTimestamp)}
                      </span>
                    </div>
                    {conversation.contactName && (
                      <p className="truncate text-xs text-slate-400">{conversation.displayPhone}</p>
                    )}
                    <p
                      className={`mt-0.5 truncate text-sm ${
                        conversation.unreadCount ? 'text-slate-800' : 'text-slate-500'
                      }`}
                    >
                      {conversation.lastDirection === 'outbound' && (
                        <span className="text-slate-400">You: </span>
                      )}
                      {conversation.lastMessage || '(no text)'}
                    </p>
                    {conversation.readyToBook && (
                      <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Ready to book
                      </span>
                    )}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-ocean px-1.5 text-[11px] font-bold text-white">
                      {conversation.unreadCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Thread pane */}
        <section
          className={`min-w-0 flex-1 flex-col ${selected || composeTo !== null ? 'flex' : 'hidden sm:flex'}`}
        >
          {!selected && composeTo === null ? (
            <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-slate-400">
              Pick a conversation to read it and reply.
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null)
                    setComposeTo(null)
                  }}
                  className="text-sm text-slate-500 hover:text-navy sm:hidden"
                >
                  ← All
                </button>
                {composeTo !== null && !selected ? (
                  <div className="min-w-0 flex-1">
                    <label htmlFor="sms-to" className="block text-xs text-slate-500">
                      Text to
                    </label>
                    <input
                      id="sms-to"
                      value={composeTo}
                      onChange={e => setComposeTo(e.target.value)}
                      placeholder="(405) 555-0134"
                      inputMode="tel"
                      autoFocus
                      className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-ocean"
                    />
                  </div>
                ) : (
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-navy-900">
                      {selected?.contactName || selected?.displayPhone}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {selected?.displayPhone}
                      {selected?.readyToBook && (
                        <span className="ml-2 font-semibold text-emerald-700">· Ready to book</span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-slate-100 px-4 py-5">
                {selected?.messages.map(message => {
                  const outbound = message.direction === 'outbound'
                  return (
                    <div key={message.id} className={`flex ${outbound ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[75%]">
                        <div
                          className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-2 text-[15px] leading-snug ${
                            outbound
                              ? message.status === 'Failed'
                                ? 'bg-red-100 text-red-900'
                                : 'bg-ocean text-white'
                              : 'bg-white text-slate-900'
                          }`}
                        >
                          {message.body || <span className="italic opacity-70">(no text)</span>}
                        </div>
                        <p
                          className={`mt-1 px-1 text-[11px] text-slate-400 ${
                            outbound ? 'text-right' : 'text-left'
                          }`}
                        >
                          {messageTime(message.timestamp)}
                          {outbound && message.status === 'Failed' && (
                            <span className="ml-1 font-semibold text-red-600">· not delivered</span>
                          )}
                        </p>
                      </div>
                    </div>
                  )
                })}
                {composeTo !== null && !selected && (
                  <p className="py-8 text-center text-sm text-slate-400">
                    New conversation — enter a number above and write your message.
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="border-t border-slate-200 bg-white p-3">
                {sendError && <p className="mb-2 text-sm text-red-600">{sendError}</p>}
                <div className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => {
                      // Enter sends; Shift+Enter is a newline, as in every chat app.
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        void handleSend()
                      }
                    }}
                    rows={1}
                    placeholder="Write a reply…"
                    className="max-h-32 min-h-[42px] flex-1 resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-[15px] outline-none focus:border-ocean"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={sending || !draft.trim() || !recipient.trim()}
                    className="flex h-[42px] items-center gap-1.5 rounded-xl bg-navy px-4 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Send
                  </button>
                </div>
                <p className="mt-1.5 px-1 text-[11px] text-slate-400">
                  {draft.length > 160
                    ? `${draft.length} characters — sends as ${Math.ceil(draft.length / 153)} segments`
                    : 'Enter sends · Shift+Enter for a new line'}
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
