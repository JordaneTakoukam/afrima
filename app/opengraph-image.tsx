import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'AFRIMA — Authentic African culture, craft & flavour, delivered across Africa';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1a1714',
          color: '#fbfaf8',
          fontFamily: 'sans-serif',
          padding: '70px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 86% 14%, rgba(226,81,14,0.4) 0%, transparent 55%), radial-gradient(circle at 10% 96%, rgba(245,158,11,0.22) 0%, transparent 50%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: '#e2510e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 40 40">
              <path
                d="M10.5 16 H29.5 L28 30.2 A2.7 2.7 0 0 1 25.3 32.6 H14.7 A2.7 2.7 0 0 1 12 30.2 Z"
                fill="#fbfaf8"
              />
              <path
                d="M15.2 16.4 V13.7 A4.8 4.8 0 0 1 24.8 13.7 V16.4"
                stroke="#fbbf24"
                strokeWidth="2.7"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
            AFRIMA
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          <span>The best of Africa,</span>
          <span style={{ color: '#f59e0b' }}>authentic &amp; hand-made.</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            fontSize: 21,
            color: 'rgba(251,250,248,0.72)',
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          <span>Delivered across Africa</span>
          <span style={{ color: '#e2510e' }}>•</span>
          <span>MTN MoMo · Orange Money · Visa · PayPal</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
