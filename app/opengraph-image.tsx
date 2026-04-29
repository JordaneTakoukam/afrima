import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'AFRIMA — Authentic Africa, delivered';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1C1917 0%, #78350F 65%, #C2410C 100%)',
          color: '#FAF7F2',
          fontFamily: 'serif',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(234,179,8,0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(159,18,57,0.2) 0%, transparent 50%)",
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'monospace', fontSize: 22, letterSpacing: 4, color: '#FBBF24' }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="#1C1917"/>
            <circle cx="20" cy="20" r="13" fill="#C2410C"/>
            <g stroke="#FAF7F2" strokeWidth="1.6" strokeLinecap="round" fill="none">
              <path d="M20 8 v24 M8 20 h24"/>
              <path d="M11 11 l18 18 M11 29 l18 -18"/>
            </g>
            <circle cx="20" cy="20" r="3.2" fill="#EAB308"/>
          </svg>
          AFRIMA
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            fontSize: 110,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          <span>Authentic</span>
          <span style={{ fontStyle: 'italic', color: '#FBBF24' }}>Africa,</span>
          <span>delivered.</span>
        </div>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            gap: 36,
            fontFamily: 'monospace',
            fontSize: 18,
            textTransform: 'uppercase',
            letterSpacing: 4,
            color: 'rgba(250,247,242,0.7)',
          }}
        >
          <span>22 countries</span>
          <span>·</span>
          <span>250+ artisans</span>
          <span>·</span>
          <span>FCFA · WORLDWIDE</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
