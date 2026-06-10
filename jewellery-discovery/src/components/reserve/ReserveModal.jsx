import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const timeOptions = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']

export const ReserveModal = ({ product, stores, onSubmit, loading = false, success = false, userName = '' }) => {
  const [form, setForm] = useState({
    name: userName,
    phone: '',
    store: stores[0]?.city || '',
    date: '',
    time: timeOptions[0],
  })

  const availableStores = useMemo(() => {
    if (!product?.availability?.length) return stores
    return stores.filter((store) => product.availability.includes(store.city))
  }, [product, stores])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit(form)
  }

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-ivory-50 rounded-3xl p-8 sm:p-16 text-center border border-pearl-200 shadow-card-xl animate-scale-in">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-4">Reservation confirmed</p>
        <h1 className="font-display text-4xl sm:text-5xl text-midnight-800 leading-tight mb-6">Your jewellery experience has been reserved.</h1>
        <p className="text-body-lg text-midnight-500 mb-10">Our team will prepare the selected piece for your private viewing.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="px-8 py-4 rounded-full bg-rose-gold-500 text-white font-bold shadow-gold hover:bg-rose-gold-400 transition-luxury">
            Return Home
          </Link>
          <Link to="/stores" className="px-8 py-4 rounded-full bg-ivory-100 border border-pearl-300 text-midnight-600 font-bold hover:bg-white transition-luxury">
            Explore Stores
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full max-w-2xl mx-auto bg-ivory-50 rounded-3xl p-8 sm:p-12 border border-pearl-200 shadow-card-xl animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-100 rounded-full blur-3xl opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10 mb-10">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-3">Reserve in store</p>
        <h1 className="font-display text-3xl sm:text-4xl text-midnight-800 leading-tight mb-4">
          {product ? `Reserve ${product.name}` : 'Reserve your jewellery experience'}
        </h1>
        <p className="text-midnight-500 leading-relaxed">
          Submit your details and we will prepare a private, in-store viewing for your chosen moment.
        </p>
      </div>

      <form className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5">
          <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Name</span>
          <input
            type="text" name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 shadow-sm"
          />
        </label>
        
        <label className="flex flex-col gap-1.5">
          <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Phone</span>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange} required
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 shadow-sm"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Store</span>
          <select 
            name="store" value={form.store} onChange={handleChange} required
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 shadow-sm appearance-none cursor-pointer"
          >
            {availableStores.map((store) => (
              <option key={store.city} value={store.city}>{store.city}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Date</span>
          <input
            type="date" name="date" value={form.date} onChange={handleChange} required
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 shadow-sm cursor-pointer"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Time</span>
          <select 
            name="time" value={form.time} onChange={handleChange} required
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 shadow-sm appearance-none cursor-pointer"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </label>

        <button 
          type="submit" 
          disabled={loading}
          className="sm:col-span-2 mt-4 py-4 rounded-full bg-rose-gold-500 text-white font-bold shadow-gold hover:bg-rose-gold-400 hover:-translate-y-0.5 transition-luxury disabled:opacity-70 disabled:hover:translate-y-0 text-lg"
        >
          {loading ? 'Submitting...' : 'Confirm Reservation'}
        </button>
      </form>
    </section>
  )
}

export default ReserveModal