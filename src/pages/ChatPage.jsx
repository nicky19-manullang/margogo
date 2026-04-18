import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SYSTEM_PROMPT = `Kamu adalah Margo, asisten kesehatan AI dari platform Margogo. 
Kamu membantu pengguna memahami gejala penyakit, memberikan edukasi kesehatan, dan saran pencegahan.
Selalu jawab dalam Bahasa Indonesia yang ramah dan mudah dipahami.
Berikan informasi yang akurat namun selalu ingatkan pengguna untuk konsultasi dokter untuk diagnosis resmi.
Jangan pernah memberikan diagnosis pasti — hanya edukasi dan saran umum.
Format jawaban dengan poin-poin jika perlu agar mudah dibaca.`

const suggestions = [
  '🤧 Apa gejala flu dan cara mengatasinya?',
  '❤️ Bagaimana cara menjaga kesehatan jantung?',
  '🧠 Apa tanda-tanda awal stroke?',
  '💊 Kapan harus ke dokter saat sakit?',
  '🥗 Makanan apa yang baik untuk ginjal?',
  '😴 Kenapa tidur cukup itu penting?',
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        M
      </div>
      <div className="bg-[#0d1f38] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center">
          {[0,1,2].map(i => (
            <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        isUser
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
          : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
      }`}>
        {isUser ? 'U' : 'M'}
      </div>
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-sm'
          : 'bg-[#0d1f38] border border-white/10 text-white/80 rounded-bl-sm'
      }`}>
        {msg.content.split('\n').map((line, i) => (
          <p key={i} className={line === '' ? 'mt-2' : ''}>{line}</p>
        ))}
        <div className={`text-xs mt-1.5 ${isUser ? 'text-white/60 text-right' : 'text-white/30'}`}>
          {msg.time}
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Saya Margo 👋, asisten kesehatan AI dari Margogo.\n\nSaya siap membantu kamu memahami gejala penyakit, memberikan edukasi kesehatan, dan tips pencegahan.\n\nAda yang ingin kamu tanyakan tentang kesehatan hari ini?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content || isLoading) return

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    const userMsg = { role: 'user', content, time }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 1024,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content }
          ],
        }),
      })

      if (!response.ok) throw new Error('Gagal menghubungi AI')

      const data = await response.json()
      const aiContent = data.choices[0].message.content

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiContent,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }])
    } catch (err) {
      setError('Gagal terhubung ke AI. Periksa API key kamu di file .env')
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#060d1f] pt-20 flex flex-col">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#060d1f]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div>
            <h1 className="text-white font-bold">Margo AI</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              <span className="text-white/40 text-xs">Asisten Kesehatan • Online</span>
            </div>
          </div>
          <div className="ml-auto bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-1.5">
            <span className="text-yellow-400 text-xs">⚠️ Bukan pengganti dokter</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        <div className="flex-1 overflow-y-auto py-6">

          {/* Suggestions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <p className="text-white/30 text-xs mb-3 text-center">Pertanyaan populer:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s.substring(2))}
                    className="text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white hover:border-cyan-500/30 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {isLoading && <TypingIndicator />}

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
              ⚠️ {error}
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="py-4 border-t border-white/10">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-[#0d1f38] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-cyan-500/40 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya tentang gejala, penyakit, atau tips kesehatan..."
                rows={1}
                className="w-full bg-transparent text-white/80 text-sm placeholder-white/25 outline-none resize-none"
                style={{ maxHeight: 120 }}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/20 text-xs">Enter kirim • Shift+Enter baris baru</span>
                <span className="text-white/20 text-xs">{input.length}/500</span>
              </div>
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:scale-100"
            >
              {isLoading ? (
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}