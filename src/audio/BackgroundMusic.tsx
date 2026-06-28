import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { GENERAL_CONFIG } from '../config/apps';

interface BackgroundMusicProps {
  compact?: boolean;
}

export default function BackgroundMusic({ compact = false }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState(GENERAL_CONFIG.bgMusicUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Set up audio instance
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4; // 40% volume is comfortable and ambient
    audioRef.current = audio;

    // Handle play state on tab visibility change or audio events
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    
    return () => {
      audio.pause();
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err: any) {
        console.warn("Autoplay was prevented by browser security rules.", err);
        setError("Sila klik untuk memainkan muzik.");
        // Try again with user-triggered action
        setIsPlaying(false);
      }
    }
  };

  if (compact) {
    return (
      <button
        id="btn-toggle-muzik"
        onClick={togglePlayback}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group w-12 h-12 rounded-full border border-blue-500/20 bg-slate-950/70 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:scale-115 transition-all duration-300"
        aria-label="Mainkan Muzik Latar"
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Pulsing visualizer background */}
            <span className="absolute -inset-1 rounded-full bg-blue-500/20 animate-ping duration-1000"></span>
            <Volume2 className="w-5 h-5 text-blue-400 relative z-10" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
        )}
        
        {/* Visual equalizer waves when playing */}
        {isPlaying && (
          <div className="absolute -bottom-1 flex gap-[2px] h-3 items-end">
            <span className="w-[2px] bg-blue-400 animate-pulse h-1" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }}></span>
            <span className="w-[2px] bg-blue-400 animate-pulse h-3" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}></span>
            <span className="w-[2px] bg-blue-400 animate-pulse h-2" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }}></span>
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-blue-500/30 text-[10px] text-blue-300 px-2.5 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none animate-fade-in">
            {isPlaying ? 'Senyapkan Muzik' : 'Mainkan Muzik Latar'}
          </div>
        )}
      </button>
    );
  }

  // Large/Interactive music controller card
  return (
    <div 
      id="muzik-panel-card"
      className="p-3.5 rounded-2xl border border-blue-500/20 bg-slate-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-500 w-[240px]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isPlaying ? 'bg-blue-900/40 border border-blue-500/40 text-blue-400 animate-spin-slow' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
            <Music className="w-4 h-4" />
          </div>
          <div className="flex flex-col overflow-hidden text-left">
            <span className="text-xs font-semibold text-slate-200 tracking-wider truncate">Lopify Ambient</span>
            <span className="text-[9px] text-slate-400 truncate">Background Music</span>
          </div>
        </div>

        <button
          onClick={togglePlayback}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-blue-500 text-slate-950 hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      </div>

      {/* Simulated equalizer bars */}
      {isPlaying ? (
        <div className="flex gap-[3px] h-6 items-end justify-center mt-3 px-2">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = [10, 24, 14, 20, 8, 16, 22, 12, 18, 6, 14, 20, 10, 24, 14, 18, 8, 16, 22, 12, 20, 8, 14, 10][i % 24];
            const dur = (0.5 + Math.random() * 0.8).toFixed(1) + 's';
            const del = (Math.random() * 0.5).toFixed(1) + 's';
            return (
              <span
                key={i}
                className="w-[3px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-full transition-all duration-300"
                style={{
                  height: `${h}px`,
                  animation: `bounceHeight ${dur} ease-in-out infinite alternate`,
                  animationDelay: del
                }}
              ></span>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-[3px] h-6 items-center justify-center mt-3 px-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-[3px] h-[3px] bg-slate-800 rounded-full"></span>
          ))}
        </div>
      )}

      {error && (
        <p className="text-[9px] text-amber-400 mt-2 text-center animate-pulse">{error}</p>
      )}
    </div>
  );
}
