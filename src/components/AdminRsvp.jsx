import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import * as XLSX from 'xlsx'

const ADMIN_PASSWORD = 'chelsea-ranu-2026'

export default function AdminRsvp() {
  const [isAuth, setIsAuth]     = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPass, setWrongPass] = useState(false)
  const [data, setData]         = useState([])
  const [loading, setLoading]   = useState(false)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('semua') 

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setWrongPass(false)
    } else {
      setWrongPass(true)
    }
  }

  useEffect(() => {
    if (!isAuth) return
    fetchData()
  }, [isAuth])

  const fetchData = async () => {
    setLoading(true)
    const { data: rows, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setData(rows)
    setLoading(false)
  }

  const exportExcel = () => {
    const rows = filteredData.map((r, i) => ({
      'No':              i + 1,
      'Nama':            r.nama,
      'Status':          r.status === 'hadir' ? 'Hadir' : 'Tidak Hadir',
      'Jumlah Tamu':     r.status === 'hadir' ? r.jumlah_tamu : '-',
      'Waktu Konfirmasi': new Date(r.created_at).toLocaleString('id-ID'),
    }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()

    // Auto column width
    const colWidths = [
      { wch: 5 }, { wch: 30 }, { wch: 15 }, { wch: 12 }, { wch: 22 }
    ]
    ws['!cols'] = colWidths

    XLSX.utils.book_append_sheet(wb, ws, 'RSVP Chelsea & Ranu')
    XLSX.writeFile(wb, `RSVP_Chelsea_Ranu_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.xlsx`)
  }

  const filteredData = data
    .filter(r => filter === 'semua' || r.status === filter)
    .filter(r => r.nama?.toLowerCase().includes(search.toLowerCase()))

  const totalHadir     = data.filter(r => r.status === 'hadir').length
  const totalTidak     = data.filter(r => r.status === 'tidak_hadir').length
  const totalJiwa      = data.filter(r => r.status === 'hadir').reduce((acc, r) => acc + (r.jumlah_tamu || 1), 0)

  // ── Login Screen ──
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-sage-dark flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="space-y-2">
            <p className="font-cormorant text-gold tracking-[0.3em] text-xs uppercase">Admin</p>
            <h1 className="font-cormorant text-cream text-3xl italic">Chelsea & Ranu</h1>
            <p className="font-elle text-cream/40 text-xs tracking-widest">Data Konfirmasi Kehadiran</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-cream text-lg placeholder:text-cream/20 text-center tracking-widest transition-colors"
            />
            {wrongPass && (
              <p className="font-elle text-red-400 text-xs tracking-wider">Password salah.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 border border-gold/50 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-sage-dark transition-all duration-300"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-cream font-elle">
      {/* Header */}
      <div className="bg-sage-dark px-6 py-8 text-center">
        <p className="font-cormorant text-gold tracking-[0.3em] text-xs uppercase mb-1">Admin Panel</p>
        <h1 className="font-cormorant text-cream text-3xl italic">Data RSVP</h1>
        <p className="font-cormorant text-cream/50 text-base mt-1">Chelsea & Ranu · 19 April 2026</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Respons', value: data.length, color: 'text-sage-dark' },
            { label: 'Hadir', value: totalHadir, color: 'text-sage-dark' },
            { label: 'Total Tamu', value: totalJiwa, color: 'text-gold' },
          ].map(s => (
            <div key={s.label} className="bg-white/60 border border-gold/15 rounded-sm p-4 text-center">
              <p className={`font-cormorant text-3xl font-light ${s.color}`}>{s.value}</p>
              <p className="font-elle text-sage-dark/50 text-xs tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama tamu..."
            className="flex-1 bg-white/60 border border-gold/20 rounded-sm px-4 py-2.5 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 outline-none focus:border-gold/50 transition-colors"
          />

          {/* Filter */}
          <div className="flex gap-2">
            {[
              { key: 'semua', label: 'Semua' },
              { key: 'hadir', label: 'Hadir' },
              { key: 'tidak_hadir', label: 'Tidak Hadir' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2 text-xs tracking-widest border transition-all duration-200 rounded-sm
                  ${filter === f.key
                    ? 'bg-sage-dark text-cream border-sage-dark'
                    : 'border-gold/30 text-sage-dark/60 hover:border-gold/60'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Export */}
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 px-4 py-2.5 bg-gold text-sage-dark text-xs tracking-widest uppercase font-elle rounded-sm hover:bg-gold-dark transition-colors duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Excel
          </button>

          {/* Refresh */}
          <button
            onClick={fetchData}
            className="px-3 py-2.5 border border-gold/30 text-sage-dark/60 hover:border-gold/60 transition-colors rounded-sm"
            title="Refresh data"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/60 border border-gold/15 rounded-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <p className="font-cormorant text-sage-dark/40 text-lg italic">Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-cormorant text-sage-dark/40 text-lg italic">Belum ada data.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/15 bg-sage-dark/5">
                    <th className="text-left px-4 py-3 font-elle text-xs tracking-widest text-sage-dark/50 uppercase">No</th>
                    <th className="text-left px-4 py-3 font-elle text-xs tracking-widest text-sage-dark/50 uppercase">Nama</th>
                    <th className="text-left px-4 py-3 font-elle text-xs tracking-widest text-sage-dark/50 uppercase">Status</th>
                    <th className="text-left px-4 py-3 font-elle text-xs tracking-widest text-sage-dark/50 uppercase">Tamu</th>
                    <th className="text-left px-4 py-3 font-elle text-xs tracking-widest text-sage-dark/50 uppercase">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, i) => (
                    <tr key={row.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                      <td className="px-4 py-3 font-elle text-sage-dark/40 text-sm">{i + 1}</td>
                      <td className="px-4 py-3 font-cormorant text-sage-dark text-base">{row.nama}</td>
                      <td className="px-4 py-3">
                        <span className={`font-elle text-xs tracking-wider px-2 py-1 rounded-sm
                          ${row.status === 'hadir'
                            ? 'bg-sage/15 text-sage-dark'
                            : 'bg-red-50 text-red-400'}`}>
                          {row.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-cormorant text-sage-dark/70 text-base">
                        {row.status === 'hadir' ? `${row.jumlah_tamu} orang` : '—'}
                      </td>
                      <td className="px-4 py-3 font-elle text-sage-dark/40 text-xs">
                        {new Date(row.created_at).toLocaleString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="font-elle text-sage-dark/30 text-xs text-center tracking-widest">
          {filteredData.length} dari {data.length} data ditampilkan
        </p>
      </div>
    </div>
  )
}