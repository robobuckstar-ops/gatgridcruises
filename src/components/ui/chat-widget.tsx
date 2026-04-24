'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant' | 'transition'
  content: string
  id: string
  isGrayson?: boolean
}

const WELCOME_MESSAGE =
  "Hi! I'm GatGrid's Disney cruise assistant. Ask me anything about Disney cruises — sailings, itineraries, staterooms, onboard credit, or how to book!"

function renderMarkdown(raw: string): string {
  // Escape HTML first to prevent XSS, then apply markdown transforms
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const lines = escaped.split('\n')
  const parts: string[] = []
  let inList = false

  const applyInline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="underline text-[#1E3A5F] hover:opacity-80" target="_blank" rel="noopener noreferrer">$1</a>'
      )

  for (const line of lines) {
    const trimmed = line.trim()
    if (/^[-*] /.test(trimmed)) {
      if (!inList) {
        parts.push('<ul class="my-1 space-y-0.5">')
        inList = true
      }
      parts.push(`<li class="flex gap-1.5"><span>•</span><span>${applyInline(trimmed.slice(2))}</span></li>`)
    } else {
      if (inList) {
        parts.push('</ul>')
        inList = false
      }
      if (trimmed === '') {
        parts.push('<div class="h-1" />')
      } else {
        parts.push(`<p>${applyInline(trimmed)}</p>`)
      }
    }
  }
  if (inList) parts.push('</ul>')

  return parts.join('')
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE, id: 'welcome' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeCount, setExchangeCount] = useState(0)
  const [graysonJoined, setGraysonJoined] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userContent = input.trim()
    const userMessage: Message = {
      role: 'user',
      content: userContent,
      id: Date.now().toString(),
    }

    const history = messages
      .filter(m => m.id !== 'welcome' && m.content && m.role !== 'transition')
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const newExchangeCount = exchangeCount + 1
    setExchangeCount(newExchangeCount)

    const assistantId = `assistant-${Date.now()}`
    // Messages created after Grayson joined get his styling
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '', id: assistantId, isGrayson: graysonJoined },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userContent, history }),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m
            )
          )
        }
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "I'm having trouble connecting right now. Please try again or email bookings@gatgridcruises.com for help!",
              }
            : m
        )
      )
    } finally {
      setIsLoading(false)
      // After the 3rd exchange, Grayson "joins" the chat
      if (newExchangeCount === 3 && !graysonJoined) {
        setGraysonJoined(true)
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              role: 'transition',
              content: 'Grayson, your cruise concierge, has joined the chat.',
              id: 'grayson-transition',
            },
          ])
        }, 900)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#1E3A5F] text-[#D4AF37] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center z-40 focus:outline-2 focus:outline-offset-2 focus:outline-[#D4AF37]"
        aria-label={isOpen ? 'Close cruise assistant chat' : 'Chat with our Disney cruise assistant'}
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          id="chat-widget-panel"
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-full sm:max-w-sm bg-white rounded-xl shadow-2xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ height: 'min(480px, calc(100svh - 120px))' }}
          role="dialog"
          aria-labelledby="chat-widget-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-[#1E3A5F] text-white px-4 py-3 rounded-t-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              {graysonJoined ? (
                <span
                  className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  G
                </span>
              ) : (
                <span className="text-[#D4AF37] text-xl leading-none" aria-hidden="true">
                  ⚓
                </span>
              )}
              <div>
                <h2 id="chat-widget-title" className="font-semibold text-sm leading-tight">
                  {graysonJoined ? 'Grayson' : 'GatGrid Cruise Assistant'}
                </h2>
                <p className="text-xs text-blue-200 leading-tight">Your Disney Cruise Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors focus:outline-2 focus:outline-offset-0 focus:outline-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 min-h-0"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map(msg => {
              if (msg.role === 'transition') {
                return (
                  <div key={msg.id} className="flex items-center gap-2 my-3">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400 italic whitespace-nowrap px-1">
                      ⚓ {msg.content}
                    </span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>
                )
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-1.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && msg.isGrayson && (
                    <span
                      className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#1E3A5F] font-bold text-xs flex items-center justify-center shrink-0 mb-0.5"
                      aria-hidden="true"
                    >
                      G
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1E3A5F] text-white rounded-br-sm'
                        : msg.isGrayson
                          ? 'bg-amber-50 text-slate-800 border border-amber-200 rounded-bl-sm shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.content ? (
                      msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div
                          className="space-y-1 [&_strong]:font-semibold [&_em]:italic [&_a]:underline [&_ul]:pl-0 [&_li]:flex [&_li]:gap-1"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      )
                    ) : (
                      <div
                        className="flex gap-1 items-center py-0.5"
                        aria-label="Assistant is typing"
                      >
                        {[0, 150, 300].map(delay => (
                          <span
                            key={delay}
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-slate-200 p-3 bg-white rounded-b-xl shrink-0">
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <label htmlFor="chat-widget-input" className="sr-only">
                Type your message
              </label>
              <input
                ref={inputRef}
                id="chat-widget-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Disney cruises..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-2 focus:outline-offset-0 focus:outline-[#1E3A5F] disabled:bg-slate-50"
                disabled={isLoading}
                autoComplete="off"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-[#1E3A5F] text-[#D4AF37] rounded-lg hover:bg-[#162d4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center focus:outline-2 focus:outline-offset-0 focus:outline-[#D4AF37]"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
