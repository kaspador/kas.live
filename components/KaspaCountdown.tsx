'use client';

import { useState, useEffect } from 'react';
import styles from './KaspaCountdown.module.css';

const KaspaCountdown = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const comingSoonMessages = [
    "The future of Kaspa is being built... 🚀",
    "Smart contracts are coming to revolutionize $KAS! ⚡",
    "Get ready for the next evolution of blockchain! 🌟",
    "Kasplex is preparing something amazing! 💎",
    "The fastest blockchain is getting even better! 🔥",
    "Decentralized innovation is on the horizon! 🌅",
    "Building the future, one block at a time! 🏗️",
    "Smart contracts + Kaspa speed = Game changer! 🎮",
    "The wait will be worth it! 💪",
    "Revolutionary technology in development! 🔬",
    "Kaspa's smart contract era begins soon! 🎯",
    "Preparing to unlock infinite possibilities! 🔓"
  ];

  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Rotate messages every 4 seconds for engagement
  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % comingSoonMessages.length);
    }, 4000);

    return () => clearInterval(messageTimer);
  }, []);

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

        {/* Coming Soon Display */}
        <div className={styles.countdownDisplay}>
          {isLoading ? (
            <div className={styles.loadingMessage}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading...</p>
            </div>
          ) : (
            <div className={styles.comingSoonMessage}>
              <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
              <p className={styles.comingSoonSubtitle}>
                Smart contracts are being developed and will be available soon
              </p>
              <div className={styles.comingSoonIcon}>🚀</div>
            </div>
          )}
        </div>

        {/* Rotating Messages */}
        {!isLoading && (
          <div className={styles.funFacts}>
            <p className={styles.funFact}>
              {comingSoonMessages[currentFactIndex]}
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
