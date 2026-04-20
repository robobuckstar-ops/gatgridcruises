'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'bot'
  text: string
  id: string
}

const RESPONSES: { patterns: RegExp[]; response: string }[] = [
  {
    patterns: [/price|cost|how much|expensive|cheap|budget/i],
    response: "Disney cruise prices vary a lot by ship, date, and stateroom type. A 3-night Bahamian starts around $2,800 for an inside stateroom. Our Cost Calculator at /tools/cost-calculator can give you a real total including flights, hotels, and extras. The advertised price is never the full picture!",
  },
  {
    patterns: [/best ship|which ship|recommend.*ship|newest ship/i],
    response: "It depends on what you're after! The Disney Wish, Treasure, and Destiny are the newest with the most features. The Dream and Fantasy are the sweet spot of modern amenities at slightly lower prices. Magic and Wonder are smaller and more intimate — great for first-timers who want a classic experience. Check our Ships page at /ships for detailed comparisons.",
  },
  {
    patterns: [/stateroom|room|cabin|inside|verandah|oceanview|concierge/i],
    response: "Great question! Inside staterooms save money but have no window. Oceanview gives you a porthole. Verandah gives you a private balcony — most families say it's worth the upgrade. Concierge is the luxury tier with a private lounge and butler service. Our Stateroom Finder at /tools/staterooms has noise ratings and honest pros/cons for every room.",
  },
  {
    patterns: [/castaway|island|private island/i],
    response: "Castaway Cay is Disney's private island in the Bahamas, and it's included on most Bahamian sailings. Everything on the island is free — beaches, food, drinks, snorkeling equipment, bikes. It's genuinely the highlight of most Caribbean itineraries. The only upcharge is the cabana rentals ($500+), which are nice but not necessary.",
  },
  {
    patterns: [/pack|luggage|bring|what to bring/i],
    response: "Key packing tips: bring a lanyard for your Key to the World card, magnetic hooks for extra storage (the walls are metal!), a small day bag for ports, reef-safe sunscreen, and formal/semi-formal outfits for the 1-2 dress-up nights. Disney provides shampoo and body wash but bring your own conditioner. And don't forget chargers — the rooms have limited outlets!",
  },
  {
    patterns: [/tip|gratuity|tipping/i],
    response: "Gratuities are automatically charged at $14.50 per person per night (standard staterooms) or $16.50 (Concierge). For a family of 4 on a 7-night cruise, that's $406. You can adjust at Guest Services, but the crew depends on these. Budget for it — our Cost Calculator includes this automatically.",
  },
  {
    patterns: [/drink|alcohol|bar|beverage|beer|wine|cocktail/i],
    response: "Alcoholic drinks are NOT included in your cruise fare. Beers run $7-9, cocktails $10-15, and wine $8-14 per glass. There's no 'drink package' officially, but some sailings offer beverage packages. Bring-your-own is NOT allowed (unlike some other cruise lines). Budget $50-100/day per adult if you plan to drink.",
  },
  {
    patterns: [/wifi|internet|connected|phone/i],
    response: "Disney's internet packages run $12/day (basic — email and messaging only) to $28/day (premium — streaming capable). The wifi quality has improved but don't expect home speeds. Pro tip: many people just disconnect and enjoy — it's vacation! If you need to stay connected for work, budget for premium.",
  },
  {
    patterns: [/transfer|uber|lyft|get to port|transportation|drive|parking/i],
    response: "Getting to the port is one of the most overlooked costs. Disney's ground transfer is $39/person each way — $312 round trip for a family of 4! An Uber from MCO to Port Canaveral is about $45 total. Check our Transfer Guide at /tools/transfers for the best option at your port.",
  },
  {
    patterns: [/when.*book|best time|how far ahead|advance/i],
    response: "Book as early as possible for the best selection, especially for new ships (Wish, Treasure, Destiny) and holiday sailings. Prices tend to drop for 3-4 night sailings as the date approaches, but 7-night sailings on popular ships rarely get cheaper. Our Deal Grid tracks prices daily so you can spot drops at /deals.",
  },
  {
    patterns: [/hello|hi|hey|good morning|good evening/i],
    response: "Hey there! 👋 I'm the GatGridCruises concierge. I can help with questions about Disney cruise pricing, ships, staterooms, packing, ports, transfers, and more. What would you like to know?",
  },
  {
    patterns: [/thank|thanks|helpful|awesome/i],
    response: "You're welcome! If you have more questions, I'm here. And check out our tools — the Cost Calculator and Deal Grid are the most popular. Happy planning! ⚓",
  },
]

const DEFAULT_RESPONSE = "That's a great question! I'm a simple concierge bot right now, so I might not have the perfect answer. Try browsing our tools — the Deal Grid at /deals, Cost Calculator at /tools/cost-calculator, and Stateroom Finder at /tools/staterooms cover most planning questions. Or email grayson@gatgridcruises.com for personal help!"

function getResponse(input: string): string {
  for (const { patterns, response } of RESPONSES) {
    if (patterns.some(pattern => pattern.test(input))) {
      return response
    }
  }
  return DEFAULT_RESPONSE
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hey! I'm the GatGridCruises concierge. Ask me anything about Disney cruises — pricing, ships, staterooms, packing, you name it.",
      id: 'welcome',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      text: input,
      id: Date.now().toString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate slight delay for bot response
    await new Promise(resolve => setTimeout(resolve, 500))

    const botResponse = getResponse(input)
    const botMessage: Message = {
      role: 'bot',
      text: botResponse,
      id: (Date.now() + 1).toString(),
    }

    setMessages(prev => [...prev, botMessage])
    setIsLoading(false)
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
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-[#D4AF37] rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40 hover:scale-110 transition-transform focus:outline-2 focus:outline-offset-2 focus:outline-blue-700"
        aria-label={isOpen ? 'Close chat' : 'Open chat with cruise concierge'}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
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
          id="chatbot-panel"
          className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-2xl flex flex-col h-96 z-50 animate-in fade-in slide-in-from-bottom-2"
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-4 rounded-t-lg border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 id="chatbot-title" className="font-semibold flex items-center gap-2">
                <span aria-hidden="true">⚓</span> Cruise Concierge
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-2 focus:outline-offset-0 focus:outline-white"
                aria-label="Close chat dialog"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-900 border border-blue-200'
                  }`}
                  role={msg.role === 'bot' ? 'article' : 'article'}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-900 border border-blue-200 px-4 py-2 rounded-lg" aria-label="Bot is typing">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" aria-hidden="true" />
                    <div className="w-2 h-2 bg-navy rounded-full animate-bounce delay-100" aria-hidden="true" />
                    <div className="w-2 h-2 bg-navy rounded-full animate-bounce delay-200" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-slate-200 p-3 bg-white rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-2 focus:outline-offset-0 focus:outline-blue-600 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center focus:outline-2 focus:outline-offset-0 focus:outline-blue-700"
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
