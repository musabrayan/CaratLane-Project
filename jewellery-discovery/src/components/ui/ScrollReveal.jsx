import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  cascadeUp: {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
}

export const ScrollReveal = ({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className = '',
  as = 'div',
  style = {},
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const variants = presets[preset] || presets.fadeUp

  const MotionComponent = motion[as] || motion.div

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={{ ...style, perspective: preset === 'cascadeUp' ? '800px' : undefined }}
    >
      {children}
    </MotionComponent>
  )
}

// Stagger container for groups of items
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Child item for stagger groups
export const StaggerItem = ({
  children,
  preset = 'fadeUp',
  duration = 0.6,
  className = '',
  style = {},
}) => {
  const variants = presets[preset] || presets.fadeUp

  return (
    <motion.div
      variants={variants}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
