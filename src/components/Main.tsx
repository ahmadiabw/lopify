import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import { getAppsConfig, GENERAL_CONFIG, AppConfig } from '../config/apps';
import * as Icons from 'lucide-react';

export default function Main() {
  const [apps, setApps] = useState<AppConfig[]>([]);
  const [hoveredApp, setHoveredApp] = useState<AppConfig | null>(null);
  const [errorAppId, setErrorAppId] = useState<string | null>(null);
  const [imgLoadErrors, setImgLoadErrors] = useState<Record<string, boolean>>({});

  // Fetch configs including overrides
  useEffect(() => {
    setApps(getAppsConfig());
  }, []);

  // Triggered when an app node is hovered
  const handleMouseEnter = (app: AppConfig) => {
    setHoveredApp(app);
  };

  // Triggered when mouse leaves an app node
  const handleMouseLeave = () => {
    setHoveredApp(null);
  };

  // Helper to get fallback icons from Lucide
  const renderFallbackIcon = (iconName: string, className: string = "w-6 h-6 text-blue-400") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  // Image load error handler
  const handleImageError = (id: string) => {
    setImgLoadErrors(prev => ({ ...prev, [id]: true }));
  };

  // Handle clicking an application node
  const handleAppClick = (app: AppConfig) => {
    // If the link is '#' or empty
    const hasNoLink = !app.url || app.url === '#' || app.url.trim() === '';
    
    if (!hasNoLink) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    } else {
      // Play premium error shake and message
      setErrorAppId(app.id);
      setTimeout(() => {
        setErrorAppId(null);
      }, 2000);
    }
  };

  // Map float classes to index
  const getFloatClass = (index: number) => {
    const floatClasses = [styles.floatA, styles.floatB, styles.floatC, styles.floatD];
    return floatClasses[index % floatClasses.length];
  };

  // Dynamically calculate coordinates on the orbit path
  const getCoordinatesForIndex = (index: number, total: number) => {
    if (total === 0) return { x: 50, y: 50 };
    
    // Start at 225 degrees (top-left) to align standard nodes perfectly with original corners
    const startAngle = (5 * Math.PI) / 4;
    const angle = startAngle + (index * 2 * Math.PI) / total;
    const radius = 45; // Match with the middle/outer rings radius
    
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <main className={styles.mainWrapper}>
      {/* Background radial glow */}
      <div className={styles.ambientBg}></div>

      {/* Decorative stars / particles */}
      <div className={styles.starsContainer}>
        <div className={`${styles.star} ${styles.star1}`}></div>
        <div className={`${styles.star} ${styles.star2}`}></div>
        <div className={`${styles.star} ${styles.star3}`}></div>
        <div className={`${styles.star} ${styles.star4}`}></div>
        <div className={`${styles.star} ${styles.star5}`}></div>
        <div className={`${styles.star} ${styles.star6}`}></div>
      </div>

      {/* ORBIT SYSTEM CONTAINER */}
      <div className={styles.orbitSystem}>
        {/* Ring Concentrics */}
        <div className={`${styles.ring} ${styles.ringOuter}`}></div>
        <div className={`${styles.ring} ${styles.ringMiddle}`}></div>
        <div className={`${styles.ring} ${styles.ringInner}`}></div>

        {/* SVG Connecting Lines with glowing active transitions */}
        <svg className={styles.neonSvg}>
          {apps.map((app, index) => {
            const isCurrentHovered = hoveredApp?.id === app.id;
            const { x, y } = getCoordinatesForIndex(index, apps.length);

            return (
              <line
                key={app.id}
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                className={`${styles.neonLine} ${isCurrentHovered ? styles.neonLineActive : ''}`}
                style={{
                  color: isCurrentHovered ? app.glowColor : 'rgba(59, 130, 246, 0.18)'
                }}
              />
            );
          })}
        </svg>

        {/* CENTRAL HUB: Displays main logo by default, or interactive details on hover */}
        <div className={`${styles.centerHub} ${hoveredApp ? styles.centerHubActive : ''}`}>
          <div className={styles.centerGlow}></div>

          {!hoveredApp ? (
            <div className="flex flex-col items-center justify-center p-4 animate-fade-in pointer-events-none">
              <img
                src={GENERAL_CONFIG.logo3d}
                alt="LOPIFY 3D"
                className={styles.logoImg}
                onError={(e) => {
                  // Fallback logo if GitHub link fails or is slow
                  e.currentTarget.src = 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/aset/logoapps/Logo%20Lopify-3d.png';
                }}
              />
              <h2 className={styles.tagline}>
                All-In-One Tools For<br />
                <span className="font-extrabold text-blue-400">Prompts</span>,{' '}
                <span className="font-extrabold text-emerald-400">Calculation</span>,<br />
                <span className="font-extrabold text-indigo-400">Calendar</span> & More.
              </h2>
            </div>
          ) : (
            <div className={styles.detailContent}>
              {/* Large Logo for Hovered App */}
              <div 
                className="flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300"
                style={{
                  filter: `drop-shadow(0 0 25px ${hoveredApp.glowColor})`
                }}
              >
                {!imgLoadErrors[hoveredApp.id] ? (
                  <img
                    src={hoveredApp.logoUrl}
                    alt={hoveredApp.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain hover:scale-105 transition-transform duration-300 select-none"
                    onError={() => handleImageError(hoveredApp.id)}
                  />
                ) : (
                  <div 
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border backdrop-blur-md"
                    style={{
                      borderColor: hoveredApp.hoverBorderColor.replace('border-', ''),
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    }}
                  >
                    {renderFallbackIcon(hoveredApp.fallbackIcon, `w-12 h-12 sm:w-16 sm:h-16 ${hoveredApp.accentColor}`)}
                  </div>
                )}
              </div>
              
              <p className={`${styles.detailDesc} px-2 sm:px-4 text-center text-slate-300 font-medium`}>
                {hoveredApp.description}
              </p>

              <div className={styles.detailStatus}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${hoveredApp.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`}></span>
                <span className={hoveredApp.status === 'active' ? 'text-emerald-400' : 'text-amber-400'}>
                  {hoveredApp.status === 'active' ? 'Sedia Digunakan' : 'Segera Hadir'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* SATELLITE APPS NODES                       */}
        {/* ========================================== */}
        {apps.map((app, index) => {
          const isErrored = errorAppId === app.id;
          const isCurrentHovered = hoveredApp?.id === app.id;
          const { x, y } = getCoordinatesForIndex(index, apps.length);

          return (
            <div
              key={app.id}
              className={`${styles.nodeWrapper} ${isErrored ? styles.errorVibrate : ''}`}
              onMouseEnter={() => handleMouseEnter(app)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleAppClick(app)}
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                '--glow-color': app.glowColor,
                '--border-color-hover': app.glowColor.replace('0.5', '0.8'),
                '--text-color-hover': app.glowColor.replace('rgba', 'rgb').replace(', 0.5', '')
              } as React.CSSProperties}
            >
              <div className={`${getFloatClass(index)} flex flex-col items-center`}>
                {/* Node Button with Glassmorphism */}
                <button
                  className={`${styles.nodeButton} ${isErrored ? styles.errorButton : ''}`}
                  style={{
                    boxShadow: isCurrentHovered ? `0 0 35px ${app.glowColor}` : undefined,
                    borderColor: isCurrentHovered ? app.glowColor.replace('0.5', '0.8') : undefined
                  }}
                  aria-label={`Buka aplikasi ${app.name}`}
                >
                  {!imgLoadErrors[app.id] ? (
                    <img
                      src={app.logoUrl}
                      alt={app.name}
                      className={styles.nodeIcon}
                      onError={() => handleImageError(app.id)}
                    />
                  ) : (
                    renderFallbackIcon(app.fallbackIcon, `w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${app.accentColor}`)
                  )}
                </button>

                {/* Animated label below node */}
                <span className={`${styles.nodeLabel} ${isErrored ? styles.errorLabel : ''}`}>
                  {isErrored ? 'Tiada Pautan!' : app.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
