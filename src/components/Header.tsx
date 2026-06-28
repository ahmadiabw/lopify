import React from 'react';
import styles from './Header.module.css';lopify
import BackgroundMusic from '../audio/BackgroundMusic';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className="flex items-center gap-2.5">
          <img 
            src="https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/logoapps/Lopi%20vector.png" 
            alt="Lopi Vector Logo" 
            className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <span className={styles.logoText}>LOPIFY</span>
        </div>
      </div>

      <div className={styles.rightSide}>
        {/* Status Indicator */}
        <div className={styles.statusContainer}>
          <span className={styles.glowDot}></span>
          <span className={styles.statusText}>PORTAL ONLINE</span>
        </div>

        {/* Floating Compact Audio Controller */}
        <BackgroundMusic compact={true} />
      </div>
    </header>
  );
}
