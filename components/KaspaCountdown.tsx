'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import styles from './KaspaCountdown.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const KaspaCountdown = () => {
  // Set target date - you can adjust this to your desired deployment date
  const targetDate = new Date('2025-08-31T23:59:59Z').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [hasReachedZero, setHasReachedZero] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const funFacts = [
    (time: TimeLeft) => `${time.days} nights of dreams until smart contracts arrive! 🌙`,
    (time: TimeLeft) => `${time.days * 3} meals until $KAS smart contracts! 🍽️`,
    (time: TimeLeft) => `${Math.floor(time.days * 5 / 7)} work days remaining! 💼`,
    (time: TimeLeft) => `${time.days * 4} coffee breaks until the future begins! ☕`,
    (time: TimeLeft) => `${time.days} sunrises left to witness! 🌅`,
    (time: TimeLeft) => `${time.days * 24 + time.hours} hours of anticipation building! ⚡`,
    (time: TimeLeft) => `${Math.floor(time.days / 7)} weeks until Kaspa evolves! 🚀`,
    (time: TimeLeft) => `${time.days} more calendar pages to flip! 📅`,
    (time: TimeLeft) => `${Math.floor(time.days / 7)} weekends left to enjoy before launch! 🎉`,
    (time: TimeLeft) => `${Math.floor(time.days / 2)} movies you could watch before smart contracts! 🎬`,
    (time: TimeLeft) => `${Math.floor(time.days / 30)} months until blockchain revolution! 🌍`,
    (time: TimeLeft) => `${(time.days * 1440 + time.hours * 60 + time.minutes).toLocaleString()} minutes of excitement! ⏰`,
    (time: TimeLeft) => `${Math.floor(time.days / 7)} weekend parties before the big day! 🥳`,
    (time: TimeLeft) => `${time.days} sleeps until $KAS gets superpowers! 💪`,
    (time: TimeLeft) => `${Math.floor(time.days * 0.7)} gym sessions until smart contracts! 🏋️`,
    (time: TimeLeft) => `Time to hodl for ${time.days} more days! 💎🙌`
  ];

  const playSuccessSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBT2X2fDGciQELH/M7t2QQAoUXrTp66hUFApcr+ftyFYQBUCa3MZhHQQrjdf03HQlBiiMzfHdjzMGGoS8rXUmBSmIyOXakiyAcyiDyOXBjC0FNGnN9N0QRAWB0vLM3k8OF1+x5tVgZHRTYDw-mU');
    audio.play().catch(() => {
      // Fallback if sound fails to play
      console.log('Sound play failed');
    });
  };

  const triggerConfetti = () => {
    // Multiple confetti bursts for dramatic effect
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#70C7BA', '#49EACB', '#B6B6B6']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#70C7BA', '#49EACB', '#B6B6B6']
      });
    }, 250);

    // Additional balloon-like effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#70C7BA', '#49EACB', '#B6B6B6', '#231F20']
      });
    }, 500);
  };

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasReachedZero) {
          setHasReachedZero(true);
          triggerConfetti();
          playSuccessSound();
        }
      }
      
      if (isLoading) {
        setIsLoading(false);
      }
    };

    // Calculate immediately on mount
    calculateTime();
    
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasReachedZero, isLoading]);

  // Rotate fun facts every 3 seconds for more engagement
  useEffect(() => {
    const factTimer = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(factTimer);
  }, []);

  const isZero = !isLoading && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>
            $KAS Smart Contracts
          </h1>
          <p className={styles.subtitle}>
            Deployed by <a 
              href="https://x.com/kasplex" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.kasplexHighlight}
            >
              @Kasplex
            </a>
          </p>
        </div>

        {/* Countdown Display */}
        <div className={styles.countdownDisplay}>
          {isLoading ? (
            <div className={styles.loadingMessage}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading countdown...</p>
            </div>
          ) : isZero ? (
            <div className={styles.celebrationMessage}>
              <h2 className={styles.celebrationTitle}>🎉 Smart Contracts Are Live! 🎉</h2>
              <p className={styles.celebrationSubtitle}>The future of Kaspa has arrived!</p>
            </div>
          ) : (
            <div className={styles.timerGrid}>
              <div className={styles.timeUnit}>
                <div className={styles.timeNumber}>{timeLeft.days}</div>
                <div className={styles.timeLabel}>Days</div>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeUnit}>
                <div className={styles.timeNumber}>{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className={styles.timeLabel}>Hours</div>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeUnit}>
                <div className={styles.timeNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className={styles.timeLabel}>Minutes</div>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeUnit}>
                <div className={styles.timeNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className={styles.timeLabel}>Seconds</div>
              </div>
            </div>
          )}
        </div>

        {/* Fun Facts */}
        {!isZero && (
          <div className={styles.funFacts}>
            <p className={styles.funFact}>
              {funFacts[currentFactIndex](timeLeft)}
            </p>
          </div>
        )}

        {/* Kaspa Branding */}
        <div className={styles.branding}>
          <div className={styles.kaspaLogo}>KASPA</div>
          <p className={styles.tagline}>The fastest, most scalable proof-of-work blockchain</p>
        </div>
      </div>
    </div>
  );
};

export default KaspaCountdown;
