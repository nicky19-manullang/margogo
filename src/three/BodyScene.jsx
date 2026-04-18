import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export const organs = [
  {
    id: 'brain', name: 'Otak', emoji: '🧠',
    svgX: 49, svgY: 5, color: '#06b6d4',
    description: 'Pusat kendali tubuh dengan 86 miliar neuron. Memproses 70.000 pikiran per hari dan menggunakan 20% energi tubuh.',
    functions: ['Mengatur seluruh fungsi tubuh', 'Memproses informasi sensorik', 'Mengontrol gerakan & keseimbangan', 'Menyimpan memori jangka panjang'],
    diseases: [
      { name: 'Stroke', severity: 'Kritis', icon: '⚡', desc: 'Gangguan aliran darah ke otak menyebabkan kematian sel saraf secara masif dalam hitungan menit.' },
      { name: 'Alzheimer', severity: 'Kronis', icon: '🌀', desc: 'Penyakit neurodegeneratif progresif yang menghancurkan memori dan fungsi kognitif.' },
      { name: 'Meningitis', severity: 'Akut', icon: '🔥', desc: 'Peradangan selaput otak yang dapat menyebabkan kerusakan permanen atau kematian.' },
      { name: 'Epilepsi', severity: 'Kronis', icon: '⚡', desc: 'Gangguan listrik otak yang memicu kejang berulang tak terkendali.' },
      { name: 'Tumor Otak', severity: 'Kritis', icon: '🔴', desc: 'Pertumbuhan sel abnormal yang menekan jaringan otak dan mengganggu fungsinya.' },
    ],
    prevention: ['Tidur 7-9 jam/malam', 'Olahraga aerobik rutin', 'Stimulasi mental aktif', 'Hindari alkohol & narkoba', 'Kelola stres dengan meditasi'],
    facts: ['Otak terdiri dari 73% air', 'Kapasitas memori setara 2.5 juta GB', 'Menghasilkan 23 watt listrik saat aktif'],
  },
  {
    id: 'eyes', name: 'Mata', emoji: '👁️',
    svgX: 49, svgY: 9.5, color: '#3b82f6',
    description: 'Organ penglihatan dengan 130 juta sel fotoreseptor yang mampu membedakan 10 juta warna berbeda.',
    functions: ['Mendeteksi cahaya & warna', 'Memfokuskan gambar ke retina', 'Mengirim sinyal ke otak', 'Perlindungan dari debu & cahaya'],
    diseases: [
      { name: 'Katarak', severity: 'Kronis', icon: '🌫️', desc: 'Pengaburan lensa mata yang menyebabkan penglihatan kabur seperti melihat melalui kaca buram.' },
      { name: 'Glaukoma', severity: 'Kritis', icon: '🔴', desc: 'Tekanan tinggi dalam bola mata yang merusak saraf optik secara permanen.' },
      { name: 'Retinopati', severity: 'Kronis', icon: '⚠️', desc: 'Kerusakan pembuluh darah retina akibat diabetes yang dapat menyebabkan kebutaan.' },
      { name: 'Miopi', severity: 'Sedang', icon: '👓', desc: 'Gangguan refraksi dimana objek jauh tampak kabur karena bentuk bola mata terlalu panjang.' },
    ],
    prevention: ['Istirahat mata 20-20-20', 'Pakai kacamata UV', 'Konsumsi vitamin A', 'Periksa mata tiap tahun', 'Kurangi screen time'],
    facts: ['Mata berkedip 15-20x per menit', 'Bisa melihat dalam gelap setelah 20 menit', 'Retina memiliki 7 juta sel kerucut'],
  },
  {
    id: 'lungs', name: 'Paru-paru', emoji: '🫁',
    svgX: 49, svgY: 27, color: '#f97316',
    description: 'Sepasang organ respirasi yang memproses 11.000 liter udara per hari. Total luas permukaan setara lapangan tenis.',
    functions: ['Pertukaran O₂ dan CO₂', 'Menyaring partikel udara', 'Mengatur pH darah', 'Melindungi jantung secara mekanis'],
    diseases: [
      { name: 'Pneumonia', severity: 'Akut', icon: '🦠', desc: 'Infeksi yang mengisi kantong udara dengan cairan, menyebabkan sesak napas parah.' },
      { name: 'Asma', severity: 'Kronis', icon: '💨', desc: 'Peradangan saluran napas yang menyebabkan penyempitan dan kesulitan bernapas.' },
      { name: 'TBC', severity: 'Kronis', icon: '🦠', desc: 'Infeksi bakteri yang merusak jaringan paru dan sangat menular melalui udara.' },
      { name: 'Kanker Paru', severity: 'Kritis', icon: '🔴', desc: 'Penyebab kematian kanker nomor 1 di dunia, erat kaitannya dengan rokok.' },
      { name: 'PPOK', severity: 'Kronis', icon: '💨', desc: 'Kerusakan permanen saluran napas yang menyebabkan sesak napas progresif.' },
    ],
    prevention: ['Hindari rokok aktif & pasif', 'Pakai masker di area berpolusi', 'Vaksinasi pneumonia & flu', 'Olahraga pernapasan', 'Ventilasi rumah yang baik'],
    facts: ['Paru kanan sedikit lebih besar dari kiri', 'Bernapas 23.000 kali per hari', 'Kapasitas total 6 liter udara'],
  },
  {
    id: 'heart', name: 'Jantung', emoji: '❤️',
    svgX: 44, svgY: 28, color: '#ef4444',
    description: 'Pompa muskular seukuran kepalan tangan yang berdetak 100.000 kali/hari, memompa 7.500 liter darah sepanjang 96.000 km pembuluh darah.',
    functions: ['Memompa darah ke seluruh tubuh', 'Mensuplai oksigen & nutrisi', 'Membuang karbon dioksida', 'Mengatur tekanan darah sistemik'],
    diseases: [
      { name: 'Serangan Jantung', severity: 'Kritis', icon: '💔', desc: 'Penyumbatan total arteri koroner. Setiap menit 2 juta sel jantung mati tanpa penanganan.' },
      { name: 'Gagal Jantung', severity: 'Kritis', icon: '⚠️', desc: 'Jantung kehilangan kemampuan memompa darah secara efektif ke seluruh tubuh.' },
      { name: 'Aritmia', severity: 'Sedang', icon: '📈', desc: 'Irama jantung tidak teratur — bisa terlalu cepat, lambat, atau tidak berpola.' },
      { name: 'Kardiomiopati', severity: 'Kronis', icon: '🔴', desc: 'Otot jantung melemah dan membesar sehingga tidak dapat berkontraksi dengan baik.' },
    ],
    prevention: ['Diet rendah lemak jenuh', 'Olahraga 150 menit/minggu', 'Hentikan merokok', 'Kontrol tekanan darah', 'Kelola diabetes'],
    facts: ['Jantung wanita berdetak lebih cepat', 'Memompa 1 juta barel darah seumur hidup', 'Dapat berdetak tanpa otak (impuls sendiri)'],
  },
  {
    id: 'liver', name: 'Hati', emoji: '🫀',
    svgX: 57, svgY: 36, color: '#a855f7',
    description: 'Kelenjar terbesar tubuh (1.5 kg) dengan lebih dari 500 fungsi metabolik. Satu-satunya organ yang dapat meregenerasi dirinya sendiri.',
    functions: ['Menyaring 1.7L darah/menit', 'Memproduksi 800-1000ml empedu/hari', 'Sintesis protein plasma', 'Metabolisme obat & toksin'],
    diseases: [
      { name: 'Hepatitis B & C', severity: 'Kronis', icon: '🦠', desc: 'Infeksi virus yang merusak sel hati dan dapat berkembang menjadi sirosis atau kanker.' },
      { name: 'Sirosis', severity: 'Kritis', icon: '⚠️', desc: 'Jaringan parut permanen menggantikan sel hati sehat, menghancurkan fungsinya.' },
      { name: 'Fatty Liver', severity: 'Sedang', icon: '🍔', desc: 'Akumulasi lemak berlebih di hati, sering dipicu obesitas dan konsumsi alkohol.' },
      { name: 'Kanker Hati', severity: 'Kritis', icon: '🔴', desc: 'Sel ganas yang tumbuh di hati, sering merupakan komplikasi hepatitis atau sirosis.' },
    ],
    prevention: ['Vaksinasi Hepatitis A & B', 'Batasi konsumsi alkohol', 'Jaga berat badan ideal', 'Hindari obat tanpa resep', 'Cek fungsi hati rutin'],
    facts: ['Satu-satunya organ yang bisa regenerasi', 'Dapat berfungsi dengan hanya 25% jaringan', 'Menghasilkan panas terbanyak di tubuh'],
  },
  {
    id: 'stomach', name: 'Lambung', emoji: '🫃',
    svgX: 47, svgY: 38, color: '#eab308',
    description: 'Kantong muskular elastis yang dapat mengembang hingga 1.5 liter. Menghasilkan asam klorida cukup kuat untuk melarutkan logam.',
    functions: ['Mencerna protein dengan pepsin', 'Membunuh bakteri dengan HCl', 'Mengatur pengosongan ke usus', 'Menyerap vitamin B12'],
    diseases: [
      { name: 'Gastritis', severity: 'Sedang', icon: '🔥', desc: 'Peradangan lapisan lambung akibat bakteri H. pylori, alkohol, atau obat anti-nyeri.' },
      { name: 'GERD', severity: 'Kronis', icon: '⬆️', desc: 'Asam lambung naik ke kerongkongan menyebabkan heartburn dan kerusakan esofagus.' },
      { name: 'Tukak Lambung', severity: 'Akut', icon: '🕳️', desc: 'Luka terbuka pada lapisan lambung akibat erosi asam lambung yang berlebihan.' },
      { name: 'Kanker Lambung', severity: 'Kritis', icon: '🔴', desc: 'Adenokarsinoma lambung yang sering terdeteksi terlambat karena gejala awal mirip maag.' },
    ],
    prevention: ['Makan teratur 3x sehari', 'Hindari makanan pedas & asam', 'Batasi kafein & alkohol', 'Eradikasi H. pylori', 'Hindari NSAID berlebihan'],
    facts: ['Dinding lambung diganti tiap 3-4 hari', 'Menghasilkan 2-3 liter asam per hari', 'Suara keroncongan berasal dari kontraksi otot'],
  },
  {
    id: 'kidney', name: 'Ginjal', emoji: '🫘',
    svgX: 38, svgY: 40, color: '#22c55e',
    description: 'Sepasang organ berbentuk kacang yang menyaring 200 liter darah per hari, menghasilkan 1-2 liter urin, dan mengatur keseimbangan seluruh cairan tubuh.',
    functions: ['Menyaring 200L darah/hari', 'Mengatur tekanan darah (renin)', 'Produksi eritropoietin', 'Aktivasi vitamin D'],
    diseases: [
      { name: 'Gagal Ginjal Akut', severity: 'Kritis', icon: '⚠️', desc: 'Hilangnya fungsi ginjal secara tiba-tiba, memerlukan dialisis darurat.' },
      { name: 'CKD', severity: 'Kronis', icon: '📉', desc: 'Kerusakan ginjal progresif selama >3 bulan, stadium akhir membutuhkan cuci darah.' },
      { name: 'Batu Ginjal', severity: 'Akut', icon: '💎', desc: 'Kristal mineral yang mengeras di ginjal, menyebabkan nyeri luar biasa saat melewati ureter.' },
      { name: 'Infeksi Ginjal', severity: 'Akut', icon: '🦠', desc: 'Bakteri mencapai ginjal dari kandung kemih, menyebabkan demam tinggi dan nyeri pinggang.' },
    ],
    prevention: ['Minum 2-3 liter air/hari', 'Diet rendah garam & protein', 'Kontrol diabetes & hipertensi', 'Hindari obat nefrotoksik', 'Olahraga teratur'],
    facts: ['Ginjal kiri sedikit lebih tinggi dari kanan', 'Setiap menit menyaring 125ml darah', 'Dapat berfungsi normal dengan satu ginjal'],
  },
  {
    id: 'intestine', name: 'Usus', emoji: '🌀',
    svgX: 49, svgY: 48, color: '#ec4899',
    description: 'Sistem pencernaan sepanjang 7.5 meter (usus halus 6m + usus besar 1.5m) dengan 100 triliun bakteri baik yang membentuk microbiome.',
    functions: ['Menyerap nutrisi makanan', 'Menyerap air & elektrolit', 'Tempat 70% sistem imun', 'Produksi serotonin (90%)'],
    diseases: [
      { name: 'Sindrom Iritasi Usus', severity: 'Kronis', icon: '😣', desc: 'Gangguan fungsional usus besar yang menyebabkan kram, diare, dan konstipasi bergantian.' },
      { name: 'Crohn\'s Disease', severity: 'Kronis', icon: '🔥', desc: 'Peradangan autoimun yang dapat terjadi di seluruh saluran cerna dari mulut hingga anus.' },
      { name: 'Kanker Kolon', severity: 'Kritis', icon: '🔴', desc: 'Kanker terbanyak ke-3 di dunia, sering diawali polip jinak yang berkembang menjadi ganas.' },
      { name: 'Appendisitis', severity: 'Akut', icon: '⚠️', desc: 'Peradangan usus buntu yang memerlukan operasi segera untuk mencegah pecah.' },
    ],
    prevention: ['Diet tinggi serat', 'Probiotik & prebiotik', 'Hindari makanan ultra-proses', 'Olahraga rutin', 'Kolonoskopi rutin >50 tahun'],
    facts: ['Usus punya sistem saraf sendiri (200 juta neuron)', '90% serotonin diproduksi di usus', 'Microbiome unik seperti sidik jari'],
  },
  {
    id: 'bladder', name: 'Kandung Kemih', emoji: '💧',
    svgX: 49, svgY: 57, color: '#0ea5e9',
    description: 'Organ berotot elastis yang menyimpan 400-600ml urin. Dinding kandung kemih dapat mengembang 3x ukuran normal untuk menampung urin.',
    functions: ['Menyimpan urin sementara', 'Mengatur pengeluaran urin', 'Melindungi saluran kemih atas', 'Sinyal ke otak saat penuh'],
    diseases: [
      { name: 'ISK', severity: 'Akut', icon: '🦠', desc: 'Infeksi bakteri saluran kemih, lebih sering pada wanita. Menyebabkan nyeri dan sering buang air.' },
      { name: 'Kanker Kandung Kemih', severity: 'Kritis', icon: '🔴', desc: 'Tumor ganas pada dinding kandung kemih, gejala utama adalah darah dalam urin.' },
      { name: 'Batu Kandung Kemih', severity: 'Akut', icon: '💎', desc: 'Mineral mengkristal di kandung kemih, menyebabkan nyeri dan gangguan buang air kecil.' },
      { name: 'Inkontinensia', severity: 'Kronis', icon: '💧', desc: 'Ketidakmampuan mengendalikan buang air kecil, umum pada lansia dan pasca melahirkan.' },
    ],
    prevention: ['Minum cukup air', 'Jaga kebersihan area genital', 'Jangan menahan kencing terlalu lama', 'Latihan kegel', 'Hindari kafein berlebihan'],
    facts: ['Dapat menampung hingga 600ml urin', 'Wanita 2x lebih sering terkena ISK', 'Dinding terdiri dari 3 lapisan otot'],
  },
  {
    id: 'bones', name: 'Tulang & Sendi', emoji: '🦴',
    svgX: 49, svgY: 70, color: '#f1f5f9',
    description: 'Rangka manusia terdiri dari 206 tulang yang hidup dan dinamis. Tulang terus diperbarui setiap 10 tahun, mengandung sumsum penghasil 2 juta sel darah per detik.',
    functions: ['Menopang & memberi bentuk tubuh', 'Melindungi organ vital', 'Tempat produksi sel darah', 'Menyimpan 99% kalsium tubuh'],
    diseases: [
      { name: 'Osteoporosis', severity: 'Kronis', icon: '🦴', desc: 'Kepadatan tulang menurun drastis sehingga tulang menjadi rapuh dan mudah patah.' },
      { name: 'Arthritis', severity: 'Kronis', icon: '🔴', desc: 'Peradangan sendi yang menyebabkan nyeri, kaku, dan pembengkakan, terutama di pagi hari.' },
      { name: 'Fraktur', severity: 'Akut', icon: '💥', desc: 'Patah tulang akibat trauma atau tulang rapuh, memerlukan imobilisasi atau operasi.' },
      { name: 'Scoliosis', severity: 'Kronis', icon: '🌀', desc: 'Kelengkungan tulang belakang abnormal yang dapat menekan organ dalam jika parah.' },
    ],
    prevention: ['Konsumsi kalsium & vitamin D', 'Olahraga beban (weight-bearing)', 'Hindari rokok & alkohol', 'Postur tubuh yang baik', 'Cek densitas tulang >50 tahun'],
    facts: ['Tulang lebih kuat dari baja per gram', 'Bayi lahir dengan 270+ tulang', 'Tulang terkecil: stapes di telinga (3mm)'],
  },
  {
    id: 'muscles', name: 'Otot', emoji: '💪',
    svgX: 62, svgY: 55, color: '#f43f5e',
    description: 'Tubuh memiliki 640+ otot yang membentuk 40% berat badan. Otot adalah satu-satunya jaringan yang dapat berkontraksi aktif untuk menghasilkan gerakan.',
    functions: ['Menghasilkan gerakan tubuh', 'Menjaga postur & keseimbangan', 'Menghasilkan panas tubuh', 'Mendukung organ & pembuluh darah'],
    diseases: [
      { name: 'Distrofi Otot', severity: 'Kritis', icon: '📉', desc: 'Penyakit genetik yang menyebabkan kelemahan dan degenerasi otot progresif.' },
      { name: 'Fibromyalgia', severity: 'Kronis', icon: '🔴', desc: 'Nyeri otot dan jaringan lunak yang meluas, disertai kelelahan kronis dan gangguan tidur.' },
      { name: 'Strain Otot', severity: 'Akut', icon: '⚡', desc: 'Robekan serat otot akibat peregangan berlebihan atau kontraksi tiba-tiba.' },
      { name: 'Tendinitis', severity: 'Akut', icon: '🔥', desc: 'Peradangan tendon akibat penggunaan berlebihan, sering pada atlet dan pekerja kantor.' },
    ],
    prevention: ['Pemanasan sebelum olahraga', 'Protein cukup 0.8g/kg BB', 'Istirahat pemulihan cukup', 'Peregangan rutin', 'Hindari overtraining'],
    facts: ['Otot terbesar: gluteus maximus', 'Otot tercepat: otot mata (kedip)', 'Tersenyum butuh 17 otot wajah'],
  },
  {
    id: 'skin', name: 'Kulit', emoji: '🧬',
    svgX: 73, svgY: 35, color: '#fb923c',
    description: 'Organ terbesar tubuh (2m², 4kg) yang berfungsi sebagai pelindung utama. Mengandung 650 kelenjar keringat per cm² dan meregenerasi seluruh permukaannya setiap 27 hari.',
    functions: ['Pelindung dari infeksi & UV', 'Mengatur suhu tubuh', 'Produksi vitamin D', 'Organ perasa (sentuhan, suhu, nyeri)'],
    diseases: [
      { name: 'Melanoma', severity: 'Kritis', icon: '🔴', desc: 'Kanker kulit paling mematikan yang berasal dari sel melanosit penghasil pigmen.' },
      { name: 'Psoriasis', severity: 'Kronis', icon: '⚠️', desc: 'Penyakit autoimun yang menyebabkan sel kulit tumbuh terlalu cepat, membentuk plak bersisik.' },
      { name: 'Eksim', severity: 'Kronis', icon: '🔥', desc: 'Peradangan kulit kronis yang menyebabkan gatal parah, kemerahan, dan kulit kering bersisik.' },
      { name: 'Vitiligo', severity: 'Kronis', icon: '🌗', desc: 'Kehilangan pigmen kulit akibat kerusakan melanosit, menyebabkan bercak putih permanen.' },
    ],
    prevention: ['Sunscreen SPF 30+ setiap hari', 'Hidrasi kulit & tubuh', 'Hindari paparan UV berlebihan', 'Diet antioksidan tinggi', 'Periksa tahi lalat rutin'],
    facts: ['Kulit berganti sepenuhnya tiap 27 hari', 'Berisi 300+ jenis bakteri baik', 'Menyumbang 15% total berat badan'],
  },
]

function FloatingParticles() {
  const points = useRef()
  const count = 80
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
  }
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#06b6d4" transparent opacity={0.4} />
    </points>
  )
}

function RotatingRing({ radius, color, speed, tilt }) {
  const ref = useRef()
  useFrame((s) => { if (ref.current) ref.current.rotation.z = s.clock.getElapsedTime() * speed })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  )
}

export default function BodyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-3, -3, -3]} intensity={0.8} color="#a855f7" />
      <FloatingParticles />
      <RotatingRing radius={2.2} color="#06b6d4" speed={0.15} tilt={0.3} />
      <RotatingRing radius={2.6} color="#a855f7" speed={-0.1} tilt={0.8} />
      <RotatingRing radius={3.0} color="#ef4444" speed={0.08} tilt={1.2} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  )
}