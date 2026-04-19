import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { organs } from '../data/organsData'

// ══ CUSTOM SVG ICONS ══
const Icons = {
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.754 4.068 2 6.281 2c1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447C20.266 2.01 23 4 23 7.191c0 4.069-5.136 8.625-11 14.402z"
        fill="currentColor"/>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M9.5 2C7 2 5 4 5 6.5c0 .5.1 1 .3 1.5C3.5 8.5 2 10.1 2 12c0 1.5.8 2.8 2 3.5V17c0 1.7 1.3 3 3 3h1v1a1 1 0 002 0v-1h4v1a1 1 0 002 0v-1h1c1.7 0 3-1.3 3-3v-1.5c1.2-.7 2-2 2-3.5 0-1.9-1.5-3.5-3.3-3.9.2-.5.3-1 .3-1.6C19 4 17 2 14.5 2c-1 0-1.9.3-2.5.8C11.4 2.3 10.5 2 9.5 2z"
        fill="currentColor"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="currentColor"/>
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M9 21h6M12 3C8.686 3 6 5.686 6 9c0 2.21 1.13 4.153 2.838 5.296L9 17h6l.162-2.704C16.87 13.153 18 11.21 18 9c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  Virus: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="white" opacity="0.5"/>
    </svg>
  ),
  Water: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0C19 10 12 2 12 2z" fill="currentColor"/>
      <path d="M9 16c0 1.657 1.343 3 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Run: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="13" cy="4" r="2" fill="currentColor"/>
      <path d="M7.5 21L10 14l3 3 3-6 2.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M4 10l4-2 3 2 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
      <circle cx="18" cy="5" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="21" cy="9" r="0.7" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  Leaf: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s-1-2 3-6c-4 0-9 5-9 5" fill="currentColor"/>
    </svg>
  ),
  Meditation: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="5" r="2" fill="currentColor"/>
      <path d="M12 8c-3 0-6 2-6 5h12c0-3-3-5-6-5z" fill="currentColor" opacity="0.7"/>
      <path d="M6 13c-2 1-3 3-2 5h16c1-2 0-4-2-5" fill="currentColor" opacity="0.4"/>
      <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="5" fill="currentColor"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Explorer: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Bot: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="3" y="8" width="18" height="13" rx="3" fill="currentColor" opacity="0.8"/>
      <circle cx="9" cy="14" r="2" fill="white"/>
      <circle cx="15" cy="14" r="2" fill="white"/>
      <circle cx="9" cy="14" r="1" fill="currentColor"/>
      <circle cx="15" cy="14" r="1" fill="currentColor"/>
      <path d="M12 3v5M9 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
      <path d="M8 21v2M16 21v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 16l4-6 4 4 4-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="7" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Article: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

const healthTips = [
  { Icon: Icons.Water, title: 'Minum Air', desc: 'Sudah minum 8 gelas hari ini?', color: '#0ea5e9', bg: '#0ea5e915' },
  { Icon: Icons.Run, title: 'Olahraga', desc: '30 menit aktivitas fisik/hari', color: '#22c55e', bg: '#22c55e15' },
  { Icon: Icons.Moon, title: 'Tidur Cukup', desc: 'Target 7-9 jam per malam', color: '#a855f7', bg: '#a855f715' },
  { Icon: Icons.Leaf, title: 'Makan Sehat', desc: 'Perbanyak sayur dan buah', color: '#eab308', bg: '#eab30815' },
  { Icon: Icons.Meditation, title: 'Kelola Stres', desc: 'Meditasi 10 menit/hari', color: '#f97316', bg: '#f9731615' },
  { Icon: Icons.Sun, title: 'Vitamin D', desc: 'Jemur 15 menit pagi hari', color: '#06b6d4', bg: '#06b6d415' },
]

const recentArticles = [
  { title: 'Kenali Tanda Awal Serangan Jantung', category: 'Jantung', time: '5 min', Icon: Icons.Heart, color: '#ef4444' },
  { title: 'Cara Menjaga Kesehatan Ginjal', category: 'Ginjal', time: '4 min', emoji: '🫘', color: '#22c55e' },
  { title: 'Tips Meningkatkan Fungsi Otak', category: 'Otak', time: '6 min', Icon: Icons.Brain, color: '#06b6d4' },
  { title: 'Makanan Terbaik untuk Paru-paru', category: 'Paru-paru', time: '3 min', Icon: Icons.Leaf, color: '#f97316' },
]

const severityConfig = {
  Kritis: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', bar: '#ef4444' },
  Akut:   { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', bar: '#f97316' },
  Kronis: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', bar: '#eab308' },
  Sedang: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', bar: '#3b82f6' },
}

const allDiseases = organs.flatMap(o =>
  o.diseases.map(d => ({ ...d, organ: o.name, organEmoji: o.emoji, organColor: o.color }))
)

// ══ STAT CARD ══
function StatCard({ Icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative bg-[#0d1224] border border-white/10 rounded-2xl p-5 overflow-hidden group hover:border-white/20 transition-all"
    >
      {/* Glow bg */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}/>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 p-2.5"
          style={{ backgroundColor: color + '20', color }}>
          <Icon />
        </div>
        <div>
          <div className="text-white/40 text-xs mb-0.5">{label}</div>
          <div className="font-bold text-2xl" style={{ color }}>{value}</div>
          {sub && <div className="text-white/30 text-xs mt-0.5">{sub}</div>}
        </div>
      </div>
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}/>
    </motion.div>
  )
}

// ══ SEVERITY BADGE ══
function SeverityBadge({ severity }) {
  const cfg = severityConfig[severity] || severityConfig.Sedang
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color}`}>
      {severity}
    </span>
  )
}

export default function Dashboard() {
  const [searchDisease, setSearchDisease] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('Semua')
  const [selectedOrganFilter, setSelectedOrganFilter] = useState('Semua')
  const [activeSection, setActiveSection] = useState('encyclopedia')

  const filteredDiseases = allDiseases.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchDisease.toLowerCase()) ||
      d.organ.toLowerCase().includes(searchDisease.toLowerCase())
    const matchSeverity = filterSeverity === 'Semua' || d.severity === filterSeverity
    const matchOrgan = selectedOrganFilter === 'Semua' || d.organ === selectedOrganFilter
    return matchSearch && matchSeverity && matchOrgan
  })

  const severityCounts = ['Kritis','Akut','Kronis','Sedang'].map(s => ({
    label: s,
    count: allDiseases.filter(d => d.severity === s).length,
    color: severityConfig[s].bar,
  }))

  return (
    <div className="min-h-screen bg-[#060d1f] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 rounded-full bg-cyan-400"/>
              <h1 className="text-3xl font-bold text-white">
                Dashboard <span className="text-cyan-400">Kesehatan</span>
              </h1>
            </div>
            <p className="text-white/35 text-sm ml-3">Pusat informasi & edukasi kesehatan interaktif</p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
            <span className="text-green-400 text-xs font-medium">Data Terupdate</span>
          </div>
        </motion.div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard Icon={Icons.Explorer} label="Total Organ" value={organs.length}
            sub="Terdokumentasi" color="#06b6d4" delay={0} />
          <StatCard Icon={Icons.Virus} label="Total Penyakit" value={allDiseases.length}
            sub="Dari semua organ" color="#ef4444" delay={0.08} />
          <StatCard Icon={Icons.Shield} label="Tips Pencegahan"
            value={organs.reduce((a,o) => a + o.prevention.length, 0)}
            sub="Saran kesehatan" color="#22c55e" delay={0.16} />
          <StatCard Icon={Icons.Lightbulb} label="Fun Facts"
            value={organs.reduce((a,o) => a + o.facts.length, 0)}
            sub="Fakta menarik" color="#eab308" delay={0.24} />
        </div>

        {/* ── SEVERITY OVERVIEW ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0d1224] border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 text-red-400"><Icons.Virus /></div>
            <h2 className="text-white font-bold">Distribusi Tingkat Keparahan Penyakit</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {severityCounts.map((s, i) => (
              <motion.button
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                onClick={() => setFilterSeverity(prev => prev === s.label ? 'Semua' : s.label)}
                className={`relative p-4 rounded-xl border transition-all text-left overflow-hidden group ${
                  filterSeverity === s.label
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/5 bg-white/3 hover:border-white/15'
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ background: s.color }}/>
                <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.count}</div>
                <div className="text-white/60 text-xs font-medium">{s.label}</div>
                <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / allDiseases.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT: Main Content ── */}
          <div className="xl:col-span-2 flex flex-col gap-5">

            {/* Section tabs */}
            <div className="flex gap-2">
              {[
                { id: 'encyclopedia', label: 'Ensiklopedia Penyakit', Icon: Icons.Virus },
                { id: 'articles', label: 'Artikel Kesehatan', Icon: Icons.Article },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/70'
                  }`}>
                  <div className="w-4 h-4"><tab.Icon /></div>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* Encyclopedia */}
              {activeSection === 'encyclopedia' && (
                <motion.div key="enc"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">

                  {/* Search */}
                  <div className="relative mb-4">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input type="text" placeholder="Cari penyakit atau organ..."
                      value={searchDisease} onChange={e => setSearchDisease(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white/80 text-sm placeholder-white/25 outline-none focus:border-cyan-500/40 transition-all"/>
                  </div>

                  {/* Organ pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <button onClick={() => setSelectedOrganFilter('Semua')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                        selectedOrganFilter === 'Semua'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : 'bg-white/5 text-white/35 border-white/5 hover:text-white/60'
                      }`}>
                      Semua
                    </button>
                    {organs.map(o => (
                      <button key={o.id} onClick={() => setSelectedOrganFilter(o.name)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                          selectedOrganFilter === o.name
                            ? 'text-white border-white/30 bg-white/15'
                            : 'bg-white/5 text-white/35 border-white/5 hover:text-white/60'
                        }`}
                        style={selectedOrganFilter === o.name ? { borderColor: o.color + '60', color: o.color } : {}}>
                        {o.emoji} {o.name}
                      </button>
                    ))}
                  </div>

                  {/* Count */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/30 text-xs">{filteredDiseases.length} penyakit ditemukan</span>
                    {(searchDisease || selectedOrganFilter !== 'Semua' || filterSeverity !== 'Semua') && (
                      <button onClick={() => { setSearchDisease(''); setSelectedOrganFilter('Semua'); setFilterSeverity('Semua') }}
                        className="text-cyan-400/60 text-xs hover:text-cyan-400 transition-colors">
                        Reset filter
                      </button>
                    )}
                  </div>

                  {/* Disease list */}
                  <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1 custom-scroll">
                    {filteredDiseases.length === 0 ? (
                      <div className="text-center text-white/25 py-12">
                        <div className="text-4xl mb-3">🔍</div>
                        <div className="text-sm">Tidak ada hasil ditemukan</div>
                      </div>
                    ) : filteredDiseases.map((d, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.025 }}
                        className="flex items-start gap-3 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-all group cursor-pointer"
                        style={{ background: `linear-gradient(135deg, ${d.organColor}06, transparent)` }}
                      >
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-white/10"
                          style={{ backgroundColor: d.organColor + '15' }}>
                          {d.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-white font-semibold text-sm">{d.name}</span>
                            <SeverityBadge severity={d.severity} />
                          </div>
                          <p className="text-white/45 text-xs leading-relaxed mb-2">{d.desc}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">{d.organEmoji}</span>
                            <span className="text-xs font-medium" style={{ color: d.organColor }}>{d.organ}</span>
                            <span className="text-white/20 text-xs">•</span>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: severityConfig[d.severity]?.bar }}/>
                            <span className={`text-xs ${severityConfig[d.severity]?.color}`}>{d.severity}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Articles */}
              {activeSection === 'articles' && (
                <motion.div key="art"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentArticles.map((a, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${a.color}12, transparent)` }}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
                          style={{ background: `radial-gradient(circle, ${a.color}, transparent 70%)` }}/>
                        <div className="w-10 h-10 rounded-xl p-2 mb-3 relative z-10"
                          style={{ backgroundColor: a.color + '20', color: a.color }}>
                          {a.Icon ? <a.Icon /> : <span className="text-xl">{a.emoji}</span>}
                        </div>
                        <p className="text-white/80 text-sm font-semibold leading-snug mb-3 group-hover:text-white transition-colors relative z-10">
                          {a.title}
                        </p>
                        <div className="flex items-center gap-2 relative z-10">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: a.color + '20', color: a.color }}>
                            {a.category}
                          </span>
                          <span className="text-white/25 text-xs">⏱ {a.time} baca</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Coming soon */}
                  <div className="mt-4 p-4 rounded-xl border border-dashed border-white/10 text-center">
                    <div className="text-white/25 text-sm">✍️ Lebih banyak artikel segera hadir</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="flex flex-col gap-4">

            {/* Quick Access */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 text-yellow-400"><Icons.Lightbulb /></div>
                <h2 className="text-white font-bold">Akses Cepat</h2>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/explorer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 transition-all group">
                  <div className="w-10 h-10 rounded-xl p-2 bg-cyan-500/20 text-cyan-400 flex-shrink-0">
                    <Icons.Explorer />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">Body Explorer 3D</div>
                    <div className="text-white/35 text-xs">Jelajahi anatomi tubuh</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
                <Link to="/chat"
                  className="flex items-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/15 transition-all group">
                  <div className="w-10 h-10 rounded-xl p-2 bg-purple-500/20 text-purple-400 flex-shrink-0">
                    <Icons.Bot />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">Tanya Margo AI</div>
                    <div className="text-white/35 text-xs">Konsultasi gejala</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-3 h-3 text-purple-400" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Health Tips */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 }}
              className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 text-green-400"><Icons.Shield /></div>
                <h2 className="text-white font-bold">Tips Hari Ini</h2>
              </div>
              <div className="flex flex-col gap-2">
                {healthTips.map((tip, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 transition-all group cursor-pointer"
                    style={{ background: tip.bg }}
                  >
                    <div className="w-8 h-8 rounded-lg p-1.5 flex-shrink-0"
                      style={{ backgroundColor: tip.color + '25', color: tip.color }}>
                      <tip.Icon />
                    </div>
                    <div>
                      <div className="text-white/85 text-xs font-semibold">{tip.title}</div>
                      <div className="text-white/35 text-xs">{tip.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Organ Summary */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.36 }}
              className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 text-cyan-400"><Icons.Chart /></div>
                <h2 className="text-white font-bold">Ringkasan Organ</h2>
              </div>
              <div className="flex flex-col gap-3">
                {organs.map((o, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <span className="text-base w-6 text-center flex-shrink-0">{o.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-white/65 text-xs font-medium truncate">{o.name}</span>
                        <span className="text-white/35 text-xs flex-shrink-0 ml-2">{o.diseases.length}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(o.diseases.length / 5) * 100}%` }}
                          transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
                          className="h-full rounded-full relative"
                          style={{ backgroundColor: o.color }}
                        >
                          <div className="absolute inset-0 opacity-50"
                            style={{ background: `linear-gradient(90deg, transparent, ${o.color})` }}/>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
