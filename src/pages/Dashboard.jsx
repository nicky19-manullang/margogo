import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { organs } from '../data/organsData'

const healthTips = [
  { icon: '💧', title: 'Minum Air', desc: 'Sudah minum 8 gelas hari ini?', color: '#0ea5e9' },
  { icon: '🏃', title: 'Olahraga', desc: '30 menit aktivitas fisik/hari', color: '#22c55e' },
  { icon: '😴', title: 'Tidur Cukup', desc: 'Target 7-9 jam per malam', color: '#a855f7' },
  { icon: '🥗', title: 'Makan Sehat', desc: 'Perbanyak sayur dan buah', color: '#eab308' },
  { icon: '🧘', title: 'Kelola Stres', desc: 'Meditasi 10 menit/hari', color: '#f97316' },
  { icon: '☀️', title: 'Vitamin D', desc: 'Jemur 15 menit pagi hari', color: '#06b6d4' },
]

const recentArticles = [
  { title: 'Kenali Tanda Awal Serangan Jantung', category: 'Jantung', time: '5 min read', icon: '❤️', color: '#ef4444' },
  { title: 'Cara Menjaga Kesehatan Ginjal', category: 'Ginjal', time: '4 min read', icon: '🫘', color: '#22c55e' },
  { title: 'Tips Meningkatkan Fungsi Otak', category: 'Otak', time: '6 min read', icon: '🧠', color: '#06b6d4' },
  { title: 'Makanan Terbaik untuk Paru-paru', category: 'Paru-paru', time: '3 min read', icon: '🫁', color: '#f97316' },
]

const severityConfig = {
  Kritis: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  Akut: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  Kronis: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  Sedang: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
}

const allDiseases = organs.flatMap(o =>
  o.diseases.map(d => ({ ...d, organ: o.name, organEmoji: o.emoji, organColor: o.color }))
)

function StatCard({ icon, label, value, sub, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d1224] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-white/20 transition-all"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: color + '20' }}>
        {icon}
      </div>
      <div>
        <div className="text-white/40 text-xs mb-0.5">{label}</div>
        <div className="text-white font-bold text-2xl" style={{ color }}>{value}</div>
        {sub && <div className="text-white/30 text-xs mt-0.5">{sub}</div>}
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [searchDisease, setSearchDisease] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('Semua')
  const [selectedOrganFilter, setSelectedOrganFilter] = useState('Semua')

  const filteredDiseases = allDiseases.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchDisease.toLowerCase()) ||
      d.organ.toLowerCase().includes(searchDisease.toLowerCase())
    const matchSeverity = filterSeverity === 'Semua' || d.severity === filterSeverity
    const matchOrgan = selectedOrganFilter === 'Semua' || d.organ === selectedOrganFilter
    return matchSearch && matchSeverity && matchOrgan
  })

  return (
    <div className="min-h-screen bg-[#060d1f] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-1">
            Dashboard <span className="text-cyan-400">Kesehatan</span>
          </h1>
          <p className="text-white/40 text-sm">Pantau informasi kesehatan dan edukasi penyakit</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="🫀" label="Total Organ" value={organs.length}
            sub="Terdokumentasi" color="#06b6d4" />
          <StatCard icon="🦠" label="Total Penyakit" value={allDiseases.length}
            sub="Dari semua organ" color="#ef4444" />
          <StatCard icon="🛡️" label="Tips Pencegahan"
            value={organs.reduce((a, o) => a + o.prevention.length, 0)}
            sub="Saran kesehatan" color="#22c55e" />
          <StatCard icon="💡" label="Fun Facts"
            value={organs.reduce((a, o) => a + o.facts.length, 0)}
            sub="Fakta menarik" color="#eab308" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT — Disease Encyclopedia */}
          <div className="xl:col-span-2 flex flex-col gap-4">

            {/* Disease search & filter */}
            <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <h2 className="text-white font-bold text-lg mb-4">
                🦠 Ensiklopedia Penyakit
              </h2>

              {/* Search */}
              <input
                type="text"
                placeholder="Cari nama penyakit atau organ..."
                value={searchDisease}
                onChange={e => setSearchDisease(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/80 text-sm placeholder-white/25 outline-none focus:border-cyan-500/40 mb-3 transition-all"
              />

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex gap-1">
                  {['Semua', 'Kritis', 'Akut', 'Kronis', 'Sedang'].map(s => (
                    <button key={s} onClick={() => setFilterSeverity(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterSeverity === s
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/70'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organ filter */}
              <div className="flex flex-wrap gap-1 mb-4">
                <button onClick={() => setSelectedOrganFilter('Semua')}
                  className={`px-2 py-1 rounded-lg text-xs transition-all ${
                    selectedOrganFilter === 'Semua'
                      ? 'bg-white/15 text-white' : 'text-white/30 hover:text-white/60'
                  }`}>
                  Semua Organ
                </button>
                {organs.map(o => (
                  <button key={o.id} onClick={() => setSelectedOrganFilter(o.name)}
                    className={`px-2 py-1 rounded-lg text-xs transition-all ${
                      selectedOrganFilter === o.name
                        ? 'bg-white/15 text-white' : 'text-white/30 hover:text-white/60'
                    }`}>
                    {o.emoji} {o.name}
                  </button>
                ))}
              </div>

              {/* Results count */}
              <div className="text-white/30 text-xs mb-3">
                Menampilkan {filteredDiseases.length} penyakit
              </div>

              {/* Disease list */}
              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
                {filteredDiseases.length === 0 ? (
                  <div className="text-center text-white/30 py-8 text-sm">
                    Tidak ditemukan hasil untuk pencarian ini
                  </div>
                ) : (
                  filteredDiseases.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/15 transition-all group"
                    >
                      <span className="text-xl flex-shrink-0">{d.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-sm">{d.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${severityConfig[d.severity].bg} ${severityConfig[d.severity].color}`}>
                            {d.severity}
                          </span>
                        </div>
                        <p className="text-white/45 text-xs leading-relaxed mt-1">{d.desc}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <span className="text-xs">{d.organEmoji}</span>
                          <span className="text-xs" style={{ color: d.organColor }}>{d.organ}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <h2 className="text-white font-bold text-lg mb-4">📚 Artikel Kesehatan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recentArticles.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
                    style={{ background: `linear-gradient(135deg, ${a.color}10, transparent)` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{a.icon}</span>
                      <div>
                        <p className="text-white/80 text-sm font-medium leading-snug group-hover:text-white transition-colors">
                          {a.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: a.color + '20', color: a.color }}>
                            {a.category}
                          </span>
                          <span className="text-white/30 text-xs">{a.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Quick actions */}
            <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <h2 className="text-white font-bold text-lg mb-4">⚡ Akses Cepat</h2>
              <div className="flex flex-col gap-2">
                <Link to="/explorer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center text-lg">🫀</div>
                  <div>
                    <div className="text-white font-medium text-sm">Body Explorer 3D</div>
                    <div className="text-white/40 text-xs">Jelajahi anatomi tubuh</div>
                  </div>
                  <span className="ml-auto text-cyan-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link to="/chat"
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg">🤖</div>
                  <div>
                    <div className="text-white font-medium text-sm">Tanya Margo AI</div>
                    <div className="text-white/40 text-xs">Konsultasi gejala</div>
                  </div>
                  <span className="ml-auto text-purple-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Daily health tips */}
            <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <h2 className="text-white font-bold text-lg mb-4">💪 Tips Hari Ini</h2>
              <div className="flex flex-col gap-2">
                {healthTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ backgroundColor: tip.color + '20' }}>
                      {tip.icon}
                    </div>
                    <div>
                      <div className="text-white/80 text-xs font-semibold">{tip.title}</div>
                      <div className="text-white/35 text-xs">{tip.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Organ summary */}
            <div className="bg-[#0d1224] border border-white/10 rounded-2xl p-5">
              <h2 className="text-white font-bold text-lg mb-4">📊 Ringkasan Organ</h2>
              <div className="flex flex-col gap-2">
                {organs.slice(0, 6).map((o, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-base w-6 text-center">{o.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/70 text-xs">{o.name}</span>
                        <span className="text-white/40 text-xs">{o.diseases.length} penyakit</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(o.diseases.length / 5) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: o.color }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}