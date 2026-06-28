import { APLIKASI_LINKS } from './AplikasiLinks';

export interface AppConfig {
  id: string;
  name: string;
  logoUrl: string;
  fallbackIcon: string; // Lucide icon name fallback
  url: string;
  glowColor: string; // hex or tailwind color class
  borderColor: string;
  hoverBorderColor: string;
  accentColor: string;
  description: string;
  status: 'active' | 'coming-soon';
}

const DEFAULT_APPS_CONFIG: AppConfig[] = [
  {
    id: 'pickandgo',
    name: 'Pick & Go',
    logoUrl: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/logoapps/pick%20%26%20go%20(2).png',
    fallbackIcon: 'MapPin',
    url: APLIKASI_LINKS.pickAndGo,
    glowColor: 'rgba(59, 130, 246, 0.5)', // Blue
    borderColor: 'border-blue-500/30',
    hoverBorderColor: 'border-blue-400',
    accentColor: 'text-blue-400',
    description: 'Smart Navigation & Routing Solution',
    status: 'coming-soon'
  },
  {
    id: 'progen',
    name: 'PROgen',
    logoUrl: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/logoapps/pick%20%26%20go%20(2).png',
    fallbackIcon: 'Zap',
    url: APLIKASI_LINKS.proGen,
    glowColor: 'rgba(16, 185, 129, 0.5)', // Emerald
    borderColor: 'border-emerald-500/30',
    hoverBorderColor: 'border-emerald-400',
    accentColor: 'text-emerald-400',
    description: 'Advanced AI Prompt Generator',
    status: 'active'
  },
  {
    id: 'myics',
    name: 'MyICS',
    logoUrl: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/logoapps/MyICS%20(1).png',
    fallbackIcon: 'Calendar',
    url: APLIKASI_LINKS.myIcs,
    glowColor: 'rgba(236, 72, 153, 0.5)', // Pink/Magenta
    borderColor: 'border-pink-500/30',
    hoverBorderColor: 'border-pink-400',
    accentColor: 'text-pink-400',
    description: 'ICS Calendar Generator',
    status: 'active'
  },
  {
    id: 'myjstac',
    name: 'MyJSTac',
    logoUrl: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/asset/logoapps/MyJSTac%203.0.png',
    fallbackIcon: 'Cpu',
    url: APLIKASI_LINKS.myJsTac,
    glowColor: 'rgba(139, 92, 246, 0.5)', // Violet/Indigo
    borderColor: 'border-violet-500/30',
    hoverBorderColor: 'border-violet-400',
    accentColor: 'text-violet-400',
    description: 'Sistem Pengiraan Pintar Pentaksiran Berterusan',
    status: 'active'
  }
];

// Helper to get active configuration including any localStorage overrides
export function getAppsConfig(): AppConfig[] {
  if (typeof window === 'undefined') return DEFAULT_APPS_CONFIG;
  
  return DEFAULT_APPS_CONFIG.map(app => {
    const savedUrl = localStorage.getItem(`lopify_url_${app.id}`);
    const savedStatus = localStorage.getItem(`lopify_status_${app.id}`);
    return {
      ...app,
      url: savedUrl || app.url,
      status: savedStatus ? (savedStatus as 'active' | 'coming-soon') : app.status
    };
  });
}

// Helper to save live configuration changes
export function saveAppUrl(id: string, url: string, status?: 'active' | 'coming-soon') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`lopify_url_${id}`, url);
  if (status) {
    localStorage.setItem(`lopify_status_${id}`, status);
  }
}

// Reset overrides back to defaults
export function resetAppConfigs() {
  if (typeof window === 'undefined') return;
  DEFAULT_APPS_CONFIG.forEach(app => {
    localStorage.removeItem(`lopify_url_${app.id}`);
    localStorage.removeItem(`lopify_status_${app.id}`);
  });
}

export const APPS_CONFIG = DEFAULT_APPS_CONFIG; // For static reference when needed

export const GENERAL_CONFIG = {
  logo3d: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/logoapps/Logo%20Lopify-3d.png',
  bgMusicUrl: 'https://raw.githubusercontent.com/ahmadiabw/lopify/main/assets/3.%20Music/backround%20music-lopify.mp3',
  title: 'LOPIFY',
  tagline: 'Navigate Anything, Without Limits',
  copyright: '© 2026. Hak Cipta Terpelihara Dr. Ahmadi.'
};
