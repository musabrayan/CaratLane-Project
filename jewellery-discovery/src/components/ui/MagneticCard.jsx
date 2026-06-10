import { useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'

const springConfig = { stiffness: 300, damping: 25, mass: 0.8 }

export const MagneticCard = ({
  children,
  className = '',
  intensity = 8,
  lightColor = 'rgba(229, 192, 85, 0.15)',
  as = 'div',
  style = {},
  ...props
}) => {
  const cardRef = useRef(null)
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 })

  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const percentX = mouseX / (rect.width / 2)
    const percentY = mouseY / (rect.height / 2)

    rotateX.set(-percentY * intensity)
    rotateY.set(percentX * intensity)

    // Light position as percentage
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [intensity, rotateX, rotateY])

  const handleMouseEnter = useCallback(() => {
    scale.set(1.02)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    setLightPos({ x: 50, y: 50 })
  }, [rotateX, rotateY, scale])

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    const Tag = as
    return (
      <Tag className={className} style={style} {...props}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      ref={cardRef}
      className={`magnetic-card ${className}`}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {/* Light reflection overlay */}
      <div
        className="magnetic-card-light"
        style={{
          background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, ${lightColor} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
    </MotionTag>
  )
}

export default MagneticCard
