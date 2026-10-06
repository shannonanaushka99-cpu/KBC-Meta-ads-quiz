/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface KbcEmblemProps {
  size?: number;
  className?: string;
  subtle?: boolean;
}

export const KbcEmblem: React.FC<KbcEmblemProps> = ({ 
  size = 180, 
  className = '',
  subtle = false
}) => {
  return (
    <div 
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-transform duration-700 ${subtle ? 'opacity-35' : 'opacity-85'}`}
      >
        <defs>
          {/* Radial sapphire background */}
          <radialGradient id="kbcCenterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="65%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Golden metallic rims */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Silver neon glow */}
          <linearGradient id="silverRim" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Curved path for Top Text */}
          <path
            id="textPathTop"
            d="M 28,100 A 72,72 0 0,1 172,100"
            fill="none"
          />
          {/* Curved path for Bottom Text */}
          <path
            id="textPathBottom"
            d="M 172,100 A 72,72 0 0,1 28,100"
            fill="none"
          />
        </defs>

        {/* Outer ambient glow circle */}
        <circle cx="100" cy="100" r="96" fill="none" stroke="url(#goldRim)" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="92" fill="url(#kbcCenterGrad)" stroke="url(#goldRim)" strokeWidth="3" />

        {/* Radiating spoke wheel */}
        <g stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 78 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 78 * Math.sin((angle * Math.PI) / 180)}
              />
            );
          })}
        </g>

        {/* Inner concentric ring */}
        <circle cx="100" cy="100" r="74" fill="none" stroke="url(#silverRim)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="url(#goldRim)" strokeWidth="2" />

        {/* Decorative Rupee Symbols around circle */}
        <g fill="url(#goldRim)" fontSize="11" fontWeight="bold" fontFamily="Cinzel, serif" textAnchor="middle">
          <text x="100" y="38">₹</text>
          <text x="162" y="104">₹</text>
          <text x="100" y="170">₹</text>
          <text x="38" y="104">₹</text>
        </g>

        {/* Center Golden Indian Rupee Crest */}
        <circle cx="100" cy="100" r="34" fill="#0b1329" stroke="url(#goldRim)" strokeWidth="2.5" />
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="url(#goldRim)"
          fontSize="36"
          fontWeight="900"
          fontFamily="Cinzel, serif"
          className="filter drop-shadow-[0_0_8px_rgba(234,179,8,0.7)]"
        >
          ₹
        </text>

        {/* Arched Kaun Banega text */}
        <text fill="url(#goldRim)" fontSize="11" fontWeight="800" fontFamily="Cinzel, serif" letterSpacing="3">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            KAUN BANEGA
          </textPath>
        </text>

        {/* Arched Crorepati text */}
        <text fill="url(#goldRim)" fontSize="11" fontWeight="800" fontFamily="Cinzel, serif" letterSpacing="3">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            CROREPATI
          </textPath>
        </text>
      </svg>
    </div>
  );
};
