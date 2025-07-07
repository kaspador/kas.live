'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Sparkle = ({ delay = 0, x = '50%', y = '50%' }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white rounded-full"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  />
)

const NaturalCurtainLeft = () => (
  <motion.div
    className="absolute left-0 top-0 w-[48%] h-full overflow-hidden"
    initial={{ x: 0 }}
    animate={{ x: [0, -200, 0] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  >
    {/* Main curtain fabric */}
    <div 
      className="relative w-full h-full"
      style={{
        background: `
          linear-gradient(90deg, 
            #1a1a1a 0%, 
            #2d2d2d 15%, 
            #3f3f3f 30%, 
            #2d2d2d 45%, 
            #1a1a1a 60%, 
            #2d2d2d 75%, 
            #3f3f3f 90%, 
            #0f0f0f 100%
          )`,
        boxShadow: `
          inset -40px 0 80px rgba(0,0,0,0.8),
          inset 0 0 200px rgba(0,0,0,0.4),
          20px 0 60px rgba(0,0,0,0.9)
        `
      }}
    >
      {/* Curtain pleats */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full opacity-70"
          style={{
            left: `${i * 12.5}%`,
            width: '8px',
            background: `linear-gradient(90deg, 
              rgba(0,0,0,0.9) 0%, 
              rgba(255,255,255,0.05) 50%, 
              rgba(0,0,0,0.9) 100%
            )`,
            transform: `skewX(${-5 + Math.sin(i) * 3}deg)`
          }}
        />
      ))}
      
      {/* Natural fabric texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 3%),
            radial-gradient(circle at 60% 40%, rgba(255,255,255,0.04) 0%, transparent 2%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 4%),
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
          `,
          backgroundSize: '25px 25px, 20px 20px, 30px 30px, 15px 15px'
        }}
      />
      
      {/* Subtle fabric weave */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%)
          `,
          backgroundSize: '3px 3px'
        }}
      />
      
      {/* Heavy curtain rod shadow */}
      <div 
        className="absolute top-0 left-0 w-full h-8"
        style={{
          background: `linear-gradient(180deg, 
            rgba(0,0,0,0.95) 0%, 
            rgba(0,0,0,0.6) 50%, 
            transparent 100%
          )`
        }}
      />
      
      {/* Natural right edge shadow */}
      <div 
        className="absolute right-0 top-0 w-20 h-full"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(0,0,0,0.4) 60%, 
            rgba(0,0,0,0.8) 100%
          )`
        }}
      />
    </div>
  </motion.div>
)

const NaturalCurtainRight = () => (
  <motion.div
    className="absolute right-0 top-0 w-[48%] h-full overflow-hidden"
    initial={{ x: 0 }}
    animate={{ x: [0, 200, 0] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  >
    {/* Main curtain fabric */}
    <div 
      className="relative w-full h-full"
      style={{
        background: `
          linear-gradient(90deg, 
            #0f0f0f 0%, 
            #1a1a1a 10%, 
            #2d2d2d 25%, 
            #3f3f3f 40%, 
            #2d2d2d 55%, 
            #1a1a1a 70%, 
            #2d2d2d 85%, 
            #1a1a1a 100%
          )`,
        boxShadow: `
          inset 40px 0 80px rgba(0,0,0,0.8),
          inset 0 0 200px rgba(0,0,0,0.4),
          -20px 0 60px rgba(0,0,0,0.9)
        `
      }}
    >
      {/* Curtain pleats */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full opacity-70"
          style={{
            right: `${i * 12.5}%`,
            width: '8px',
            background: `linear-gradient(90deg, 
              rgba(0,0,0,0.9) 0%, 
              rgba(255,255,255,0.05) 50%, 
              rgba(0,0,0,0.9) 100%
            )`,
            transform: `skewX(${5 - Math.sin(i) * 3}deg)`
          }}
        />
      ))}
      
      {/* Natural fabric texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 3%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.04) 0%, transparent 2%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 4%),
            linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
          `,
          backgroundSize: '25px 25px, 20px 20px, 30px 30px, 15px 15px'
        }}
      />
      
      {/* Subtle fabric weave */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%)
          `,
          backgroundSize: '3px 3px'
        }}
      />
      
      {/* Heavy curtain rod shadow */}
      <div 
        className="absolute top-0 right-0 w-full h-8"
        style={{
          background: `linear-gradient(180deg, 
            rgba(0,0,0,0.95) 0%, 
            rgba(0,0,0,0.6) 50%, 
            transparent 100%
          )`
        }}
      />
      
      {/* Natural left edge shadow */}
      <div 
        className="absolute left-0 top-0 w-20 h-full"
        style={{
          background: `linear-gradient(90deg, 
            rgba(0,0,0,0.8) 0%, 
            rgba(0,0,0,0.4) 40%, 
            transparent 100%
          )`
        }}
      />
    </div>
  </motion.div>
)

const TextContent = () => (
  <div className="relative z-10 text-center">
    <motion.h1
      className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      Smart Contracts
    </motion.h1>
    <motion.p
      className="text-2xl md:text-3xl font-light text-gray-200 tracking-wider uppercase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1.3 }}
    >
      Coming Soon
    </motion.p>
    <motion.div
      className="mt-8 w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mx-auto rounded-full"
      initial={{ width: 0 }}
      animate={{ width: 128 }}
      transition={{ duration: 2, delay: 1.8 }}
    />
  </div>
)

const SoftLighting = () => (
  <>
    {/* Subtle ambient lighting */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-800/5 via-transparent to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent" />
    
    {/* Gentle spotlight effect */}
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15"
      style={{
        background: `radial-gradient(circle, 
          rgba(255,255,255,0.2) 0%, 
          rgba(255,255,255,0.05) 30%, 
          transparent 70%
        )`
      }}
    />
    
    {/* Subtle sparkles */}
    <Sparkle delay={0} x="15%" y="20%" />
    <Sparkle delay={1.5} x="85%" y="25%" />
    <Sparkle delay={3} x="20%" y="80%" />
    <Sparkle delay={4.5} x="80%" y="75%" />
    <Sparkle delay={6} x="50%" y="15%" />
  </>
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Natural dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-black" />
      
      <SoftLighting />
      
      <div className="relative flex items-center justify-center min-h-screen">
        <TextContent />
      </div>
      
      {/* Natural black curtains */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <NaturalCurtainLeft />
        <NaturalCurtainRight />
      </div>
    </main>
  )
} 