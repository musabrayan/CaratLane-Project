import { Link } from 'react-router-dom'
import { homePageImages } from '../data/homePageImages'

export const About = () => {
  return (
    <div className="py-12 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-4">
          The Brand
        </p>
        <h1 className="font-display text-display-md sm:text-display-lg text-midnight-800 leading-tight mb-6">
          Crafting memories, not just jewellery.
        </h1>
        <p className="text-body-lg text-midnight-500 leading-relaxed max-w-2xl mx-auto">
          We believe that fine jewellery is not about the product category. It's about the moment it represents. 
          A first salary. An engagement. A quiet Tuesday that feels special.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-card border border-pearl-200 mb-16">
        <img 
          src={homePageImages.storySection} 
          alt="Artisan crafting jewellery" 
          className="w-full h-[400px] sm:h-[500px] object-cover" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
        <article className="p-8 sm:p-10 bg-ivory-50 rounded-3xl border border-pearl-200 shadow-card-sm">
          <h2 className="font-display text-3xl text-midnight-800 mb-4">Our Heritage</h2>
          <p className="text-midnight-500 leading-relaxed">
            With decades of craftsmanship, we blend traditional techniques with modern design. 
            Every piece is ethically sourced, rigorously tested, and masterfully finished.
          </p>
        </article>
        
        <article className="p-8 sm:p-10 bg-ivory-50 rounded-3xl border border-pearl-200 shadow-card-sm">
          <h2 className="font-display text-3xl text-midnight-800 mb-4">Our Promise</h2>
          <p className="text-midnight-500 leading-relaxed">
            We promise uncompromising quality and a personalized experience. 
            From online discovery to in-store consultation, your journey with us is designed to be flawless.
          </p>
        </article>
      </div>

      <div className="text-center p-12 bg-ivory-100 rounded-3xl border border-pearl-200 shadow-card">
        <h2 className="font-display text-4xl text-midnight-800 mb-6">Begin your story</h2>
        <Link to="/occasion/engagement" className="inline-flex px-8 py-4 rounded-full bg-rose-gold-500 text-white font-bold shadow-gold hover:bg-rose-gold-400 hover:-translate-y-1 transition-luxury">
          Discover the Collection
        </Link>
      </div>
    </div>
  )
}

export default About