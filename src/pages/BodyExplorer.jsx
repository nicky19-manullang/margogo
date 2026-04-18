import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BodyScene, { organs } from '../three/BodyScene'

const severityConfig = {
  Kritis: { color: 'bg-red-500/20 text-red-400 border-red-500/40', dot: 'bg-red-400' },
  Akut:   { color: 'bg-orange-500/20 text-orange-400 border-orange-500/40', dot: 'bg-orange-400' },
  Kronis: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', dot: 'bg-yellow-400' },
  Sedang: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', dot: 'bg-blue-400' },
}

// SVG Human Body — anatomically accurate silhouette
function HumanBodySVG({ selectedOrgan, onOrganClick }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 100 160"
        className="h-full max-h-[600px] w-auto"
        style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.15))' }}
      >
        {/* Glow defs */}
        <defs>
          {organs.map(o => (
            <radialGradient key={o.id} id={`glow-${o.id}`}>
              <stop offset="0%" stopColor={o.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={o.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* ── BODY SILHOUETTE ── */}
        {/* Head */}
        <ellipse cx="49" cy="8" rx="7.5" ry="8.5"
          fill="none" stroke="#1e4a7a" strokeWidth="0.5" opacity="0.8"/>
        {/* Neck */}
        <rect x="45.5" y="16" width="7" height="4" rx="1"
          fill="none" stroke="#1e4a7a" strokeWidth="0.5" opacity="0.7"/>
        {/* Shoulders */}
        <path d="M28 22 Q35 19 45.5 20 L52.5 20 Q62 19 70 22"
          fill="none" stroke="#1e4a7a" strokeWidth="0.6" opacity="0.8"/>
        {/* Upper torso */}
        <path d="M33 22 L31 45 Q31 48 34 48 L64 48 Q67 48 67 45 L65 22"
          fill="none" stroke="#1e4a7a" strokeWidth="0.5"
          fill="rgba(14,42,74,0.25)"/>
        {/* Lower torso / abdomen */}
        <path d="M34 48 L33 62 Q33 65 36 65 L62 65 Q65 65 65 62 L64 48"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Pelvis */}
        <path d="M33 62 Q33 72 40 73 L58 73 Q65 72 65 62"
          fill="none" stroke="#1e4a7a" strokeWidth="0.5" opacity="0.7"/>
        {/* Left upper arm */}
        <path d="M33 22 Q27 24 26 28 L24 45 Q24 48 26 48 L31 47"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Right upper arm */}
        <path d="M65 22 Q71 24 72 28 L74 45 Q74 48 72 48 L67 47"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Left forearm */}
        <path d="M24 45 L20 65 Q19 68 21 68 L26 68 L28 47"
          fill="rgba(14,42,74,0.18)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Right forearm */}
        <path d="M74 45 L78 65 Q79 68 77 68 L72 68 L70 47"
          fill="rgba(14,42,74,0.18)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Left hand */}
        <ellipse cx="20" cy="71" rx="3" ry="4.5"
          fill="rgba(14,42,74,0.15)" stroke="#1e4a7a" strokeWidth="0.4"/>
        {/* Right hand */}
        <ellipse cx="78" cy="71" rx="3" ry="4.5"
          fill="rgba(14,42,74,0.15)" stroke="#1e4a7a" strokeWidth="0.4"/>
        {/* Left thigh */}
        <path d="M36 72 L33 100 Q33 103 36 103 L44 103 L46 72"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Right thigh */}
        <path d="M62 72 L65 100 Q65 103 62 103 L54 103 L52 72"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Left lower leg */}
        <path d="M33 102 L32 130 Q32 133 35 133 L43 133 L44 102"
          fill="rgba(14,42,74,0.18)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Right lower leg */}
        <path d="M65 102 L66 130 Q66 133 63 133 L55 133 L54 102"
          fill="rgba(14,42,74,0.18)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Left foot */}
        <path d="M32 132 L31 138 Q31 141 34 141 L44 141 Q46 141 46 139 L45 133"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>
        {/* Right foot */}
        <path d="M66 132 L67 138 Q67 141 64 141 L54 141 Q52 141 52 139 L53 133"
          fill="rgba(14,42,74,0.2)" stroke="#1e4a7a" strokeWidth="0.5"/>

        {/* Spine line */}
        <line x1="49" y1="20" x2="49" y2="72"
          stroke="#1e4a7a" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5"/>
        {/* Rib cage outline */}
        <ellipse cx="49" cy="32" rx="11" ry="12"
          fill="none" stroke="#1e4a7a" strokeWidth="0.35" strokeDasharray="1.5,1" opacity="0.4"/>

        {/* ── ORGAN DOTS ── */}
        {organs.map((organ) => {
          const isSelected = selectedOrgan?.id === organ.id
          return (
            <g
              key={organ.id}
              onClick={() => onOrganClick(organ)}
              style={{ cursor: 'pointer' }}
            >
              {/* Glow pulse */}
              <circle
                cx={organ.svgX} cy={organ.svgY} r={isSelected ? 4.5 : 3}
                fill={`url(#glow-${organ.id})`}
                opacity={isSelected ? 0.8 : 0.3}
              >
                <animate
                  attributeName="r"
                  values={`${isSelected ? 4 : 2.5};${isSelected ? 5.5 : 4};${isSelected ? 4 : 2.5}`}
                  dur="2s" repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.7;0.3"
                  dur="2s" repeatCount="indefinite"
                />
              </circle>
              {/* Core dot */}
              <circle
                cx={organ.svgX} cy={organ.svgY} r={isSelected ? 2.5 : 1.8}
                fill={organ.color}
                opacity={isSelected ? 1 : 0.85}
              />
              {/* Ring if selected */}
              {isSelected && (
                <circle
                  cx={organ.svgX} cy={organ.svgY} r="4"
                  fill="none" stroke={organ.color} strokeWidth="0.5" opacity="0.8"
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function BodyExplorer() {
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [search, setSearch] = useState('')

  const filtered = organs.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.diseases.some(d => d.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSelect = (organ) => {
    setSelectedOrgan(prev => prev?.id === organ.id ? null : organ)
    setActiveTab('info')
  }

  return (
    <div className="min-h-screen bg-[#060d1f] pt-20">

      {/* Header */}
      <div className="text-center py-6 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        >
          Body <span className="text-cyan-400">Explorer 3D</span>
        </motion.h1>
        <p className="text-white/40 text-sm">Klik organ untuk detail lengkap • {organs.length} organ tersedia</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10 flex flex-col xl:flex-row gap-4">

        {/* LEFT — Organ List */}
        <div className="w-full xl:w-56 flex-shrink-0">
          <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-3 sticky top-24">
            <input
              type="text"
              placeholder="Cari organ/penyakit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/80 text-xs placeholder-white/30 outline-none focus:border-cyan-500/50 mb-3"
            />
            <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto pr-1">
              {filtered.map(organ => (
                <button
                  key={organ.id}
                  onClick={() => handleSelect(organ)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all text-xs ${
                    selectedOrgan?.id === organ.id
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">{organ.emoji}</span>
                  <div>
                    <div className="font-semibold">{organ.name}</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>{organ.diseases.length} penyakit</div>
                  </div>
                  {selectedOrgan?.id === organ.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: organ.color }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — Body */}
        <div className="flex-1 flex flex-col gap-4">
          {/* 3D background + SVG body */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: 580 }}>
            {/* 3D particle background */}
            <div className="absolute inset-0">
              <BodyScene />
            </div>
            {/* SVG anatomy overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full py-4">
                <HumanBodySVG selectedOrgan={selectedOrgan} onOrganClick={handleSelect} />
              </div>
            </div>
            {/* Hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/30 text-xs">
                Klik organ • {organs.length} titik interaktif
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Organ', value: organs.length, icon: '🫀' },
              { label: 'Total Penyakit', value: organs.reduce((a, o) => a + o.diseases.length, 0), icon: '🦠' },
              { label: 'Tips Kesehatan', value: organs.reduce((a, o) => a + o.prevention.length, 0), icon: '💡' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0d1224] border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-cyan-400 font-bold text-lg">{s.value}</div>
                <div className="text-white/40 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Info Panel */}
        <div className="w-full xl:w-96 flex-shrink-0">
          <AnimatePresence mode="wait">
            {selectedOrgan ? (
              <motion.div
                key={selectedOrgan.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0d1224] border border-white/10 rounded-2xl overflow-hidden sticky top-24"
              >
                {/* Header */}
                <div className="p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${selectedOrgan.color}20, transparent 60%)` }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, ${selectedOrgan.color}15, transparent 70%)` }} />
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="text-4xl">{selectedOrgan.emoji}</div>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-xl leading-tight">{selectedOrgan.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedOrgan.color }} />
                        <span className="text-white/40 text-xs">{selectedOrgan.diseases.length} penyakit terdokumentasi</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed mt-3 relative z-10">{selectedOrgan.description}</p>

                  {/* Facts */}
                  <div className="mt-3 flex flex-wrap gap-1.5 relative z-10">
                    {selectedOrgan.facts.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/50 border border-white/10">
                        💡 {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  {[
                    { id: 'info', label: 'Fungsi', icon: '⚙️' },
                    { id: 'penyakit', label: 'Penyakit', icon: '🦠' },
                    { id: 'pencegahan', label: 'Pencegahan', icon: '🛡️' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        activeTab === tab.id
                          ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      <span>{tab.icon}</span> {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-4 max-h-80 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                      <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                        {selectedOrgan.functions.map((fn, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: selectedOrgan.color + '30', color: selectedOrgan.color }}>
                              {i + 1}
                            </div>
                            <span className="text-white/70 text-sm">{fn}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'penyakit' && (
                      <motion.div key="penyakit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                        {selectedOrgan.diseases.map((d, i) => (
                          <div key={i} className="p-3 rounded-xl border border-white/5 hover:border-white/15 transition-all"
                            style={{ background: `linear-gradient(135deg, ${selectedOrgan.color}08, transparent)` }}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{d.icon}</span>
                              <span className="text-white font-semibold text-sm flex-1">{d.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${severityConfig[d.severity].color}`}>
                                {d.severity}
                              </span>
                            </div>
                            <p className="text-white/50 text-xs leading-relaxed">{d.desc}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'pencegahan' && (
                      <motion.div key="pencegahan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                        {selectedOrgan.prevention.map((tip, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-lg">
                              {['🥗','🏃','💧','😴','🩺'][i % 5]}
                            </span>
                            <span className="text-white/70 text-sm">{tip}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-[#0d1224] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center sticky top-24"
                style={{ minHeight: 400 }}
              >
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center text-4xl mb-4 border border-cyan-500/20">
                  🫀
                </div>
                <h3 className="text-white/70 font-bold text-lg mb-2">Pilih Organ</h3>
                <p className="text-white/30 text-sm leading-relaxed max-w-52">
                  Klik titik bercahaya pada tubuh manusia atau pilih dari daftar organ di sebelah kiri
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 w-full">
                  {organs.slice(0, 6).map(o => (
                    <button
                      key={o.id}
                      onClick={() => handleSelect(o)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all text-center"
                    >
                      <div className="text-xl">{o.emoji}</div>
                      <div className="text-white/50 text-xs mt-1">{o.name}</div>
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