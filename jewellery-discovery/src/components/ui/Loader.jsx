export const Loader = ({ label = 'Loading collection' }) => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
    <div className="w-12 h-12 rounded-full border-4 border-pearl-200 border-t-rose-gold-500 animate-spin" />
    <p className="text-midnight-400 font-medium tracking-wide">{label}</p>
  </div>
)

export default Loader