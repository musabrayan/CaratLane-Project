import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaGem } from 'react-icons/fa'

export const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const data = await register(form.name, form.email, form.password)
      if (data.success) {
        navigate('/', { replace: true })
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md bg-ivory-50 rounded-3xl p-8 sm:p-12 border border-pearl-200 shadow-card-xl relative overflow-hidden">
        {/* Decorative corner blur */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-gold-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center mb-10">
          <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-gold-100 to-rose-gold-50 border border-rose-gold-200 flex items-center justify-center text-rose-gold-500 shadow-inner-sm mb-6">
            <FaGem className="text-2xl" />
          </span>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-2">Begin your journey</p>
          <h1 className="font-display text-3xl text-midnight-800 leading-tight mb-2">Create your account</h1>
          <p className="text-sm text-midnight-500">Join to reserve exclusive in-store jewellery experiences.</p>
        </div>

        {error && (
          <div className="relative z-10 mb-6 p-4 rounded-xl bg-blush-50 border border-blush-200 text-blush-700 text-sm font-semibold text-center animate-fade-in">
            {error}
          </div>
        )}

        <form className="relative z-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Full name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 placeholder-pearl-400 shadow-sm"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 placeholder-pearl-400 shadow-sm"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 placeholder-pearl-400 shadow-sm"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-xs text-midnight-500 font-semibold uppercase tracking-wider ml-1">Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-white border border-pearl-300 focus:border-rose-gold-400 focus:ring-1 focus:ring-rose-gold-400 outline-none transition-colors text-midnight-800 placeholder-pearl-400 shadow-sm"
            />
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 py-4 rounded-full bg-rose-gold-500 text-white font-bold shadow-gold hover:bg-rose-gold-400 hover:-translate-y-0.5 transition-luxury disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="relative z-10 mt-8 text-center text-sm text-midnight-500">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-gold-600 font-bold hover:text-rose-gold-500 hover:underline underline-offset-4 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
