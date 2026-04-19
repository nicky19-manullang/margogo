import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const words = ['Lebih Dalam', 'Lebih Sehat', 'Lebih Cerdas']

function TypeWriter() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length === word.length) setTimeout(() => setDeleting(true), 1800)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setIndex((index + 1) % words.length) }
      }
    }, deleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      {text}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
    </span>
  )
}

function TiltCard({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="relative w-48 h-48 mx-auto mb-10 cursor-pointer"
    >
      {children}
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#060d1f] flex items-center justify-center relative overflow-hidden px-6">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)' }}/>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-15 bg-cyan-500"/>
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-[80px] opacity-10 bg-purple-600"/>
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 h-px opacity-10"
          style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}/>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-sm mb-8">
          <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}/>
         <span>Platform Edukasi Kesehatan Interaktif</span>
        </motion.div>

        {/* Center Visual */}
        <TiltCard>
          {/* Rings */}
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              className="absolute rounded-full border border-cyan-500/20"
              style={{ inset: i * 20 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute w-2 h-2 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: '0 0 8px #06b6d4' }}/>
            </motion.div>
          ))}
          {/* Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)' }}
            >
              <svg viewBox="0 0 50 70" className="w-12 h-14" fill="none">
                <ellipse cx="25" cy="9" rx="7" ry="8" fill="#06b6d420" stroke="#06b6d4" strokeWidth="0.7"/>
                <path d="M14 20 Q14 17 18 17 L32 17 Q36 17 36 20 L34 44 Q34 47 31 47 L19 47 Q16 47 16 44Z"
                  fill="#06b6d415" stroke="#06b6d4" strokeWidth="0.7"/>
                <path d="M21 29 Q21 25 24 25 Q25.5 25 26 27 Q26.5 25 28 25 Q31 25 31 29 Q31 33 26 37 Q21 33 21 29Z"
                  fill="#ef444450" stroke="#ef4444" strokeWidth="0.5"/>
                <motion.path d="M10 33 L14 33 L16 28 L18 38 L20 30 L22 33 L38 33"
                  fill="none" stroke="#06b6d4" strokeWidth="1" strokeLinecap="round"
                  strokeDasharray="50" strokeDashoffset="50"
                  animate={{ strokeDashoffset: [50, 0, 50] }}
                  transition={{ duration: 2, repeat: Infinity }}/>
                <path d="M18 46 L16 60 Q16 63 19 63 L23 63 L24 46" fill="#06b6d415" stroke="#06b6d4" strokeWidth="0.6"/>
                <path d="M32 46 L34 60 Q34 63 31 63 L27 63 L26 46" fill="#06b6d415" stroke="#06b6d4" strokeWidth="0.6"/>
              </svg>
            </motion.div>
          </div>
        </TiltCard>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
          Kenali Tubuhmu<br />
          <TypeWriter />
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Jelajahi anatomi <span className="text-cyan-400">3D interaktif</span>, pelajari penyakit,
          dan konsultasi dengan <span className="text-purple-400">Margogo</span>
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link to="/explorer" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"/>
            <div className="relative px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              Jelajahi Tubuh 3D
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </div>
          </Link>
          <Link to="/chat"
            className="px-7 py-3.5 rounded-full border border-white/15 text-white/70 font-semibold hover:bg-white/8 hover:text-white hover:border-white/25 transition-all flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}/>
            Tanya Margo AI
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {[
            { value: '50+', label: 'Penyakit', color: '#ef4444' },
            { value: '12', label: 'Organ 3D', color: '#06b6d4' },
            { value: 'AI', label: 'Chatbot', color: '#a855f7' },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}
              className="p-3 rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm">
              <div className="font-bold text-xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-white/35 text-xs">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
