'use client'

import { useEffect, useState } from 'react'

interface NextReduction {
  'Rewards per Block': number
  Date: string
}

interface CurrentReward {
  blockreward: number
}

export default function TimerPage() {
  const [nextReduction, setNextReduction] = useState<NextReduction | null>(null)
  const [currentBlockReward, setCurrentBlockReward] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  const [rewardText, setRewardText] = useState('...')

  // Fetch current block reward
  async function fetchCurrentReward() {
    try {
      const response = await fetch('https://api.kaspa.org/info/blockreward?stringOnly=false')
      if (!response.ok) throw new Error('Failed to fetch current block reward')
      const data: CurrentReward = await response.json()
      setCurrentBlockReward(data.blockreward)
    } catch (error) {
      console.error('Error fetching current block reward:', error)
    }
  }

  // Fetch next reduction data
  async function fetchNextReduction() {
    try {
      const response = await fetch('https://api.kaspa.org/info/halving')
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      setNextReduction({
        'Rewards per Block': data.nextHalvingAmount,
        'Date': data.nextHalvingDate
      })
    } catch (error) {
      console.error('There was a problem fetching the halving info:', error)
      setNextReduction(null)
    }
  }

  // Update countdown timer
  function updateCountdown() {
    if (!nextReduction || !currentBlockReward) {
      console.log('No reduction or current reward data available.')
      setRewardText('Unable to retrieve reduction data.')
      return
    }

    const now = new Date()
    const dateParts = nextReduction.Date.split(' ')
    const dateComponents = dateParts[0].split('-')
    const timeComponents = dateParts[1].split(':')
    
    const targetDate = new Date(Date.UTC(
      parseInt(dateComponents[0], 10),
      parseInt(dateComponents[1], 10) - 1,
      parseInt(dateComponents[2], 10),
      parseInt(timeComponents[0], 10),
      parseInt(timeComponents[1], 10),
      parseInt(timeComponents[2], 10)
    ))

    const timeDiff = targetDate.getTime() - now.getTime()

    if (isNaN(timeDiff)) {
      console.error('Invalid date format:', nextReduction.Date)
      setRewardText('Error: Invalid date format.')
      return
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    setTimeRemaining({
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    })

    setRewardText(
      `from <strong>${currentBlockReward.toFixed(2)} KAS</strong> to <strong>${nextReduction['Rewards per Block'].toFixed(2)} KAS</strong>`
    )
  }

  // Initialize countdown
  async function initializeCountdown() {
    await Promise.all([fetchCurrentReward(), fetchNextReduction()])
    updateCountdown()
  }

  useEffect(() => {
    initializeCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [nextReduction, currentBlockReward])

  return (
    <div className="min-h-screen bg-[#333] text-white flex items-center justify-center p-4">
      <div className="bg-[#222] border-4 border-[#70C7BA] rounded-[25px] p-8 w-full max-w-2xl text-center shadow-[0_0_15px_rgba(112,199,186,0.9)]">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-[#f7931a] mb-8 font-bold">
          Kaspa Rewards Reduction Countdown
        </h1>

        {/* Countdown Display */}
        <div className="flex justify-around flex-wrap gap-4 mb-8">
          <div className="bg-black rounded-2xl text-[#70C7BA] p-4 flex-1 min-w-[80px]">
            <span className="block text-2xl md:text-3xl font-bold">{timeRemaining.days}</span>
            <span className="block text-xs uppercase tracking-wider mt-1 opacity-80">Days</span>
          </div>
          <div className="bg-black rounded-2xl text-[#70C7BA] p-4 flex-1 min-w-[80px]">
            <span className="block text-2xl md:text-3xl font-bold">{timeRemaining.hours}</span>
            <span className="block text-xs uppercase tracking-wider mt-1 opacity-80">Hours</span>
          </div>
          <div className="bg-black rounded-2xl text-[#70C7BA] p-4 flex-1 min-w-[80px]">
            <span className="block text-2xl md:text-3xl font-bold">{timeRemaining.minutes}</span>
            <span className="block text-xs uppercase tracking-wider mt-1 opacity-80">Minutes</span>
          </div>
          <div className="bg-black rounded-2xl text-[#70C7BA] p-4 flex-1 min-w-[80px]">
            <span className="block text-2xl md:text-3xl font-bold">{timeRemaining.seconds}</span>
            <span className="block text-xs uppercase tracking-wider mt-1 opacity-80">Seconds</span>
          </div>
        </div>

        {/* Estimated Time Remaining */}
        <div className="text-[#70C7BA] uppercase text-sm tracking-wider">
          Est. Time Remaining until the next reduction{' '}
          <span 
            className="font-bold"
            dangerouslySetInnerHTML={{ __html: rewardText }}
          />
        </div>
      </div>
    </div>
  )
}
