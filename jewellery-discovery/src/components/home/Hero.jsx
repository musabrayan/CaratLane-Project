import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { homePageImages } from '../../data/homePageImages'

export const Hero = ({ moment }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const headlineWords = "Jewellery For Life's Most Meaningful Moments".split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden rounded-3xl border border-pearl-200 shadow-card-lg"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 -top-[10%] -bottom-[10%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${homePageImages.heroBanner})`,
          y: imageY,
        }}
      />

      {/* Gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-midnight-900" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-900/80 via-midnight-900/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 via-transparent to-midnight-900/20" />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-12 lg:px-20 py-20"
        style={{ y: textY }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-[1px] bg-champagne-400" />
            <p className="font-label text-xs uppercase tracking-[0.25em] text-champagne-300 font-bold">
              Jewellery discovery, reimagined
            </p>
          </motion.div>

          {/* Animated headline — word by word */}
          <h1 className="font-display text-display-lg sm:text-display-xl xl:text-display-2xl text-ivory-50 leading-[1.05] mb-8">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-body-lg text-pearl-300 max-w-lg mb-10 leading-relaxed"
          >
            Explore curated collections for engagements, weddings, anniversaries, birthdays, and quiet everyday luxury.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/occasion/engagement"
              className="group px-8 py-4 rounded-full bg-rose-gold-500 text-white font-bold shadow-gold hover:bg-rose-gold-400 hover:shadow-gold-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Discover Your Moment
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-full border border-ivory-200/30 text-ivory-100 font-bold hover:bg-ivory-50/10 hover:-translate-y-1 backdrop-blur-sm transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Featured moment card — floating bottom-right */}
        <motion.div
          initial={{ opacity: 0, y: 40, x: 40 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block absolute bottom-12 right-12 xl:right-20 max-w-xs float-gentle"
        >
          <div className="p-6 rounded-2xl bg-midnight-800/50 backdrop-blur-xl border border-white/10 text-ivory-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
              <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-champagne-300">
                Featured Moment
              </p>
            </div>
            <h3 className="font-display text-2xl mb-2">{moment.label}</h3>
            <p className="text-sm text-midnight-100 leading-relaxed">{moment.story}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-champagne-400/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-champagne-400/20 rounded-bl-lg pointer-events-none" />
    </section>
  )
}

export default Hero