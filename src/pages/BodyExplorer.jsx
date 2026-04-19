import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { organs } from '../data/organsData'

const severityConfig = {
  Kritis: { color: 'bg-red-500/20 text-red-400 border-red-500/40', dot: '#ef4444' },
  Akut:   { color: 'bg-orange-500/20 text-orange-400 border-orange-500/40', dot: '#f97316' },
  Kronis: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', dot: '#eab308' },
  Sedang: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', dot: '#3b82f6' },
}

function XRayBody({ selectedOrgan, onOrganClick, zoom, rotation }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ scale: zoom, rotateY: rotation, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <svg
          viewBox="0 0 120 220"
          width="320"
          height="580"
          style={{ filter: 'drop-shadow(0 0 25px rgba(6,182,212,0.5))' }}
        >
          <defs>
            {organs.map(o => (
              <radialGradient key={o.id} id={`glow-${o.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={o.color} stopOpacity="1" />
                <stop offset="60%" stopColor={o.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={o.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* ══ BODY SILHOUETTE ══ */}
          {/* Head */}
          <ellipse cx="60" cy="13" rx="11" ry="12"
            fill="#0d2d4e" stroke="#22d3ee" strokeWidth="0.7"/>
          {/* Neck */}
          <path d="M55 24 L55 28 Q60 30 65 28 L65 24"
            fill="#0d2d4e" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Torso */}
          <path d="M36 30 Q36 26 42 26 L78 26 Q84 26 84 30 L82 80 Q82 84 78 84 L42 84 Q38 84 38 80 Z"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Abdomen */}
          <path d="M40 83 L39 108 Q39 112 43 112 L77 112 Q81 112 81 108 L80 83"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Pelvis */}
          <path d="M39 110 Q36 120 40 126 L80 126 Q84 120 81 110"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>

          {/* Left upper arm */}
          <path d="M36 30 Q28 33 26 42 L24 66 Q24 70 28 70 L36 68 L40 30"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Left forearm */}
          <path d="M24 67 L21 92 Q21 96 25 96 L33 95 L37 68"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Left hand */}
          <ellipse cx="23" cy="102" rx="4" ry="7"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.5"/>

          {/* Right upper arm */}
          <path d="M84 30 Q92 33 94 42 L96 66 Q96 70 92 70 L84 68 L80 30"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Right forearm */}
          <path d="M96 67 L99 92 Q99 96 95 96 L87 95 L83 68"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Right hand */}
          <ellipse cx="97" cy="102" rx="4" ry="7"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.5"/>

          {/* Left thigh */}
          <path d="M41 124 L38 162 Q38 166 42 166 L53 166 L56 124"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Left lower leg */}
          <path d="M38 164 L36 196 Q36 200 40 200 L52 200 L54 164"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Left foot */}
          <path d="M36 198 L34 207 Q34 211 38 211 L54 211 Q57 211 57 208 L54 200"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.5"/>

          {/* Right thigh */}
          <path d="M79 124 L82 162 Q82 166 78 166 L67 166 L64 124"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Right lower leg */}
          <path d="M82 164 L84 196 Q84 200 80 200 L68 200 L66 164"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.6"/>
          {/* Right foot */}
          <path d="M84 198 L86 207 Q86 211 82 211 L66 211 Q63 211 63 208 L66 200"
            fill="#0a2040" stroke="#22d3ee" strokeWidth="0.5"/>

          {/* ══ SKELETON ══ */}
          {/* Skull detail */}
          <ellipse cx="60" cy="12" rx="8" ry="9" fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.7"/>
          <ellipse cx="56" cy="10" rx="2" ry="1.8" fill="#060e1f" stroke="#38bdf8" strokeWidth="0.3"/>
          <ellipse cx="64" cy="10" rx="2" ry="1.8" fill="#060e1f" stroke="#38bdf8" strokeWidth="0.3"/>
          <path d="M55 16 Q60 19 65 16" fill="none" stroke="#38bdf8" strokeWidth="0.3" opacity="0.6"/>

          {/* Spine */}
          {[28,34,40,46,52,58,64,70,76,82,88,94,100,106,112,118,124].map((y,i) => (
            <rect key={i} x="57.5" y={y} width="5" height="4" rx="1"
              fill="#0a1e38" stroke="#38bdf8" strokeWidth="0.3" opacity="0.8"/>
          ))}

          {/* Ribs */}
          {[0,1,2,3,4,5,6].map(i => (
            <g key={i} opacity="0.65">
              <path d={`M58 ${36+i*6} Q${47-i} ${33+i*6} ${42-i} ${38+i*6} Q${41-i} ${44+i*6} ${46-i} ${45+i*6}`}
                fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
              <path d={`M62 ${36+i*6} Q${73+i} ${33+i*6} ${78+i} ${38+i*6} Q${79+i} ${44+i*6} ${74+i} ${45+i*6}`}
                fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
            </g>
          ))}

          {/* Sternum */}
          <rect x="58" y="33" width="4" height="36" rx="2"
            fill="#0a1e38" stroke="#38bdf8" strokeWidth="0.4" opacity="0.6"/>

          {/* Clavicles */}
          <path d="M60 28 Q50 27 41 32" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.8"/>
          <path d="M60 28 Q70 27 79 32" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.8"/>

          {/* Pelvis bone */}
          <path d="M43 113 Q40 120 46 125 L74 125 Q80 120 77 113"
            fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.6"/>
          <ellipse cx="60" cy="120" rx="9" ry="7"
            fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.5"/>

          {/* Femur */}
          <line x1="48" y1="126" x2="45" y2="163" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>
          <line x1="72" y1="126" x2="75" y2="163" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>
          {/* Patella */}
          <ellipse cx="44" cy="167" rx="5" ry="4" fill="#0a1e38" stroke="#38bdf8" strokeWidth="0.4" opacity="0.7"/>
          <ellipse cx="76" cy="167" rx="5" ry="4" fill="#0a1e38" stroke="#38bdf8" strokeWidth="0.4" opacity="0.7"/>
          {/* Tibia */}
          <line x1="43" y1="171" x2="41" y2="197" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>
          <line x1="77" y1="171" x2="79" y2="197" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>

          {/* Arm bones */}
          <line x1="37" y1="33" x2="26" y2="67" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>
          <line x1="83" y1="33" x2="94" y2="67" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7"/>
          <line x1="25" y1="68" x2="22" y2="93" stroke="#38bdf8" strokeWidth="0.5" opacity="0.6"/>
          <line x1="95" y1="68" x2="98" y2="93" stroke="#38bdf8" strokeWidth="0.5" opacity="0.6"/>

          {/* ══ ORGANS ══ */}
          {/* Brain */}
          <ellipse cx="60" cy="11" rx="7.5" ry="8"
            fill="#06b6d430" stroke="#06b6d4" strokeWidth="0.5"/>
          <path d="M55 8 Q60 6 65 8 M54 11 Q60 9 66 11 M55 14 Q60 12 65 14"
            fill="none" stroke="#06b6d4" strokeWidth="0.35" opacity="0.7"/>

          {/* Heart */}
          <path d="M54 36 Q54 31 58 31 Q61 31 62 34 Q63 31 66 31 Q70 31 70 36 Q70 41 62 47 Q54 41 54 36Z"
            fill="#ef444445" stroke="#ef4444" strokeWidth="0.5"/>

          {/* Lungs */}
          <path d="M44 32 Q40 36 39 45 Q38 55 42 62 Q46 67 50 64 Q53 57 53 47 Q53 37 48 32Z"
            fill="#f9731635" stroke="#f97316" strokeWidth="0.5"/>
          <path d="M76 32 Q80 36 81 45 Q82 55 78 62 Q74 67 70 64 Q67 57 67 47 Q67 37 72 32Z"
            fill="#f9731635" stroke="#f97316" strokeWidth="0.5"/>

          {/* Liver */}
          <path d="M63 58 Q72 55 79 60 Q82 68 77 75 Q71 78 63 73 Q58 68 63 58Z"
            fill="#a855f730" stroke="#a855f7" strokeWidth="0.5"/>

          {/* Stomach */}
          <path d="M50 60 Q45 63 44 71 Q45 79 50 82 Q57 84 62 79 Q65 73 63 64Z"
            fill="#eab30830" stroke="#eab308" strokeWidth="0.5"/>

          {/* Kidneys */}
          <ellipse cx="46" cy="80" rx="5" ry="7" fill="#22c55e25" stroke="#22c55e" strokeWidth="0.5"/>
          <ellipse cx="74" cy="80" rx="5" ry="7" fill="#22c55e25" stroke="#22c55e" strokeWidth="0.5"/>

          {/* Intestines */}
          <path d="M46 92 Q41 97 43 104 Q47 111 54 109 Q62 107 63 100 Q65 93 72 93 Q79 98 76 107 Q71 114 63 114 Q55 117 50 114"
            fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.65"/>
          <path d="M50 114 Q45 119 47 126 Q52 132 60 130 Q68 128 68 121"
            fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.55"/>

          {/* Bladder */}
          <ellipse cx="60" cy="122" rx="6" ry="5"
            fill="#0ea5e920" stroke="#0ea5e9" strokeWidth="0.5"/>

          {/* ══ ORGAN DOTS ══ */}
          {organs.map((organ) => {
            const isSelected = selectedOrgan?.id === organ.id
            const x = organ.svgX * 1.2
            const y = organ.svgY * 1.375
            return (
              <g key={organ.id} onClick={() => onOrganClick(organ)} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={y} r={isSelected ? 7 : 5}
                  fill={`url(#glow-${organ.id})`}>
                  <animate attributeName="r"
                    values={`${isSelected?6:4};${isSelected?9:6};${isSelected?6:4}`}
                    dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx={x} cy={y} r={isSelected ? 3.5 : 2.5} fill={organ.color}/>
                {isSelected && (
                  <>
                    <circle cx={x} cy={y} r="6" fill="none" stroke={organ.color} strokeWidth="0.8" opacity="0.9"/>
                    <circle cx={x} cy={y} r="10" fill="none" stroke={organ.color} strokeWidth="0.3" opacity="0.4"/>
                  </>
                )}
                <rect x={x + 6} y={y - 5} width={organ.name.length * 5 + 8} height="11" rx="3"
                  fill="#000000cc"/>
                <text x={x + 10} y={y + 3} fontSize="5.5" fill={isSelected ? organ.color : '#ffffffaa'}
                  fontFamily="sans-serif" fontWeight={isSelected ? 'bold' : 'normal'}>
                  {organ.name}
                </text>
              </g>
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}

export default function BodyExplorer() {
const [selectedOrgan, setSelectedOrgan] = useState(null)
const [activeTab, setActiveTab] = useState('info')
const [zoom, setZoom] = useState(1)
const [rotation, setRotation] = useState(0)
const [search, setSearch] = useState('')
const [isDragging, setIsDragging] = useState(false)
const [dragStart, setDragStart] = useState(0)
const [rotationStart, setRotationStart] = useState(0)
const [autoRotate, setAutoRotate] = useState(true)
const containerRef = useRef(null)
const animFrameRef = useRef(null)
const lastTimeRef = useRef(null)

// Auto rotate 360°
useEffect(() => {
  if (!autoRotate) {
    cancelAnimationFrame(animFrameRef.current)
    lastTimeRef.current = null
    return
  }
  const animate = (time) => {
    if (lastTimeRef.current !== null) {
      const delta = time - lastTimeRef.current
      setRotation(prev => (prev + delta * 0.05) % 360)
    }
    lastTimeRef.current = time
    animFrameRef.current = requestAnimationFrame(animate)
  }
  animFrameRef.current = requestAnimationFrame(animate)
  return () => {
    cancelAnimationFrame(animFrameRef.current)
    lastTimeRef.current = null
  }
}, [autoRotate])

const handleMouseDown = useCallback((e) => {
  setAutoRotate(false)
  setIsDragging(true)
  setDragStart(e.clientX)
  setRotationStart(rotation)
}, [rotation])

const handleMouseMove = useCallback((e) => {
  if (!isDragging) return
  const delta = (e.clientX - dragStart) * 0.5
  setRotation((rotationStart + delta) % 360)
}, [isDragging, dragStart, rotationStart])

const handleMouseUp = useCallback(() => setIsDragging(false), [])

const handleWheel = useCallback((e) => {
  e.preventDefault()
  setZoom(prev => Math.max(0.7, Math.min(2.5, prev - e.deltaY * 0.001)))
}, [])

  const filtered = organs.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.diseases.some(d => d.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSelect = (organ) => {
    setSelectedOrgan(prev => prev?.id === organ.id ? null : organ)
    setActiveTab('info')
  }

  return (
    <div className="min-h-screen bg-[#030810] pt-20">

      {/* Header */}
      <div className="text-center py-5 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          <span className="text-cyan-400">X-Ray</span> Body Explorer
        </h1>
        <p className="text-white/30 text-sm">Drag untuk rotasi • Scroll untuk zoom • Klik organ</p>
      </div>

      <div className="max-w-8xl mx-auto px-3 pb-10 flex gap-3">

        {/* LEFT panel */}
        <div className="w-52 flex-shrink-0 hidden xl:block">
          <div className="bg-[#060f1e] border border-cyan-900/30 rounded-2xl p-3 sticky top-24">
            <div className="text-cyan-400/60 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Organ</div>
            <input
              type="text" placeholder="Cari..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-xs placeholder-white/20 outline-none focus:border-cyan-500/40 mb-2"
            />
            <div className="flex flex-col gap-0.5 max-h-[520px] overflow-y-auto">
              {filtered.map(organ => (
                <button key={organ.id} onClick={() => handleSelect(organ)}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all ${
                    selectedOrgan?.id === organ.id
                      ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}>
                  <span className="text-sm">{organ.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{organ.name}</div>
                    <div className="text-white/25" style={{fontSize:'9px'}}>{organ.diseases.length} penyakit</div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selectedOrgan?.id === organ.id ? organ.color : 'transparent' }}/>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — X-Ray Body */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden border border-cyan-900/40 bg-[#020710]"
            style={{ height: 640, cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.015) 2px, rgba(6,182,212,0.015) 4px)',
              }}/>
            {/* Corner decorations */}
            {[['top-3 left-3','border-t-2 border-l-2'],['top-3 right-3','border-t-2 border-r-2'],
              ['bottom-3 left-3','border-b-2 border-l-2'],['bottom-3 right-3','border-b-2 border-r-2']
            ].map(([pos, border], i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5 border-cyan-500/40 ${border}`}/>
            ))}
            {/* HUD elements */}
            <div className="absolute top-4 left-16 text-cyan-500/40 text-xs font-mono z-10">
              MARGOGO XRAY v2.0
            </div>
            <div className="absolute top-4 right-4 text-cyan-500/40 text-xs font-mono z-10">
              ZOOM: {(zoom * 100).toFixed(0)}% | ROT: {rotation.toFixed(0)}°
            </div>
            <div className="absolute bottom-4 right-4 flex gap-1 z-10">
              <button onClick={() => setZoom(p => Math.min(2.5, p + 0.15))}
                className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all">+</button>
              <button onClick={() => setZoom(1)}
                className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/20 transition-all">⟳</button>
              <button onClick={() => setZoom(p => Math.max(0.7, p - 0.15))}
                className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all">−</button>
            </div>

            <XRayBody
              selectedOrgan={selectedOrgan}
              onOrganClick={handleSelect}
              zoom={zoom}
              rotation={rotation}
            />
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Total Organ', value: organs.length, icon: '🫀', color: 'cyan' },
              { label: 'Total Penyakit', value: organs.reduce((a,o) => a + o.diseases.length, 0), icon: '🦠', color: 'red' },
              { label: 'Tips Pencegahan', value: organs.reduce((a,o) => a + o.prevention.length, 0), icon: '🛡️', color: 'green' },
              { label: 'Fun Facts', value: organs.reduce((a,o) => a + o.facts.length, 0), icon: '💡', color: 'yellow' },
            ].map((s, i) => (
              <div key={i} className="bg-[#060f1e] border border-white/5 rounded-xl p-3 text-center">
                <div className="text-lg mb-0.5">{s.icon}</div>
                <div className={`font-bold text-lg text-${s.color}-400`}>{s.value}</div>
                <div className="text-white/30 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Info panel */}
        <div className="w-88 flex-shrink-0" style={{width: 340}}>
          <AnimatePresence mode="wait">
            {selectedOrgan ? (
              <motion.div key={selectedOrgan.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}
                className="bg-[#060f1e] border border-white/10 rounded-2xl overflow-hidden sticky top-24">

                {/* Header */}
                <div className="p-5 relative overflow-hidden border-b border-white/10"
                  style={{ background: `linear-gradient(135deg, ${selectedOrgan.color}25, transparent 60%)` }}>
                  <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full opacity-20"
                    style={{ background: `radial-gradient(circle, ${selectedOrgan.color}, transparent 70%)` }}/>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">{selectedOrgan.emoji}</div>
                    <div>
                      <h2 className="text-white font-bold text-xl">{selectedOrgan.name}</h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor: selectedOrgan.color}}/>
                        <span className="text-white/30 text-xs">{selectedOrgan.diseases.length} penyakit terdokumentasi</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed">{selectedOrgan.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedOrgan.facts.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40">
                        💡 {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex">
                  {[{id:'info',label:'Fungsi',icon:'⚙️'},{id:'penyakit',label:'Penyakit',icon:'🦠'},{id:'pencegahan',label:'Cegah',icon:'🛡️'}].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-1 border-b-2 ${
                        activeTab === tab.id
                          ? 'border-cyan-400 text-cyan-400 bg-cyan-400/5'
                          : 'border-transparent text-white/30 hover:text-white/60'
                      }`}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="p-4 max-h-72 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                      <motion.div key="info" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-2">
                        {selectedOrgan.functions.map((fn, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{backgroundColor: selectedOrgan.color+'25', color: selectedOrgan.color}}>
                              {i+1}
                            </div>
                            <span className="text-white/65 text-xs leading-relaxed">{fn}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === 'penyakit' && (
                      <motion.div key="penyakit" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-2">
                        {selectedOrgan.diseases.map((d, i) => (
                          <div key={i} className="p-3 rounded-xl border border-white/5 hover:border-white/15 transition-all"
                            style={{background: `linear-gradient(135deg, ${selectedOrgan.color}08, transparent)`}}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-base">{d.icon}</span>
                              <span className="text-white font-semibold text-sm flex-1">{d.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${severityConfig[d.severity].color}`}>
                                {d.severity}
                              </span>
                            </div>
                            <p className="text-white/45 text-xs leading-relaxed">{d.desc}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === 'pencegahan' && (
                      <motion.div key="pencegahan" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-2">
                        {selectedOrgan.prevention.map((tip, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                            <span className="text-lg">{['🥗','🏃','💧','😴','🩺','🧘','🚭','💊'][i%8]}</span>
                            <span className="text-white/65 text-xs">{tip}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}}
                className="bg-[#060f1e] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center sticky top-24"
                style={{minHeight: 400}}>
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl mb-4">🫀</div>
                <h3 className="text-white/60 font-bold mb-2">Pilih Organ</h3>
                <p className="text-white/25 text-xs leading-relaxed mb-5 max-w-44">Klik titik bercahaya pada tubuh X-Ray atau pilih dari daftar</p>
                <div className="grid grid-cols-3 gap-1.5 w-full">
                  {organs.slice(0,9).map(o => (
                    <button key={o.id} onClick={() => handleSelect(o)}
                      className="p-2 rounded-xl bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all">
                      <div className="text-lg">{o.emoji}</div>
                      <div className="text-white/40 mt-0.5" style={{fontSize:'9px'}}>{o.name}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}