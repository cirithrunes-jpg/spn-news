'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { brandLogoDataUri } from '@/lib/brand-logo';

const sessionKey = 'spn-running-logo-seen';

function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(sessionKey) !== '1';
  } catch {
    return true;
  }
}

function subscribe(listener: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', listener);
  return () => preference.removeEventListener('change', listener);
}

function serverSnapshot() { return false; }

export function RunningLogo() {
  const play = useSyncExternalStore(subscribe, shouldPlay, serverSnapshot);
  const [finished, setFinished] = useState(false);
  const finish = useCallback(() => {
    try { sessionStorage.setItem(sessionKey, '1'); } catch { /* Animation also works without storage. */ }
    setFinished(true);
  }, []);

  useEffect(() => {
    if (!play || finished) return;
    // Remove the decoration even if the browser misses animationend.
    const timer = window.setTimeout(finish, 3800);
    return () => window.clearTimeout(timer);
  }, [play, finished, finish]);

  if (!play || finished) return null;

  return <div className="spn-running-intro" aria-hidden="true"
    onAnimationEnd={event => { if (event.target === event.currentTarget) finish(); }}>
    <div className="spn-runner">
      <div className="spn-runner-bubble spn-runner-late">ATRASADO PRO PLAY!</div>
      <div className="spn-runner-bubble spn-runner-arrived">CHEGUEI!</div>
      <svg className="spn-runner-art" viewBox="0 0 280 260" fill="none" focusable="false">
        <defs><clipPath id="spn-runner-logo-clip"><rect x="76" y="48" width="128" height="128" rx="22"/></clipPath></defs>
        <ellipse cx="144" cy="239" rx="68" ry="5" fill="#191919" opacity=".15"/>
        <g className="spn-runner-dust" fill="#fffdf6" stroke="#191919" strokeWidth="2.5">
          <circle cx="47" cy="222" r="14"/><circle cx="64" cy="212" r="18"/><circle cx="85" cy="225" r="13"/>
        </g>
        <g className="spn-runner-leg spn-runner-leg-back" stroke="#191919" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M156 170 L159 196 L177 218"/><path d="M169 220 Q182 209 197 225 Q202 232 190 233 L167 231Z" fill="#ff681e" strokeWidth="4"/>
          <path d="M175 230 L193 231" stroke="white" strokeWidth="3"/>
        </g>
        <g className="spn-runner-leg spn-runner-leg-front" stroke="#191919" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M125 170 L113 197 L126 218"/><path d="M120 220 Q132 209 146 225 Q151 232 141 233 L117 231Z" fill="#ffda40" strokeWidth="4"/>
          <path d="M124 230 L144 231" stroke="white" strokeWidth="3"/>
        </g>
        <g className="spn-runner-arm spn-runner-arm-back" stroke="#191919" strokeWidth="7" strokeLinecap="round">
          <path d="M83 116 L57 139 L43 120"/><ellipse cx="41" cy="116" rx="11" ry="10" fill="white" strokeWidth="3"/>
        </g>
        <g className="spn-runner-body">
          <rect x="76" y="48" width="128" height="128" rx="22" fill="#ffcc05" stroke="white" strokeWidth="10"/>
          <image href={brandLogoDataUri} x="76" y="48" width="128" height="128" clipPath="url(#spn-runner-logo-clip)"/>
          <rect x="76" y="48" width="128" height="128" rx="22" stroke="#191919" strokeWidth="3"/>
        </g>
        <g className="spn-runner-arm spn-runner-arm-front" stroke="#191919" strokeWidth="7" strokeLinecap="round">
          <path d="M201 118 L223 140 L239 115"/><ellipse cx="242" cy="109" rx="11" ry="10" fill="white" strokeWidth="3"/>
        </g>
        <g className="spn-runner-speed" stroke="#ffda40" strokeWidth="5" strokeLinecap="round">
          <path d="M23 71 H53 M9 87 H43 M27 103 H53"/>
        </g>
      </svg>
    </div>
  </div>;
}
