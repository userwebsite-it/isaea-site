'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const songs = [
  {
    name: 'sweettooth',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/track/4VfxSZpCqJBf1hbl9aStay',
    scannable: 'https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:track:4VfxSZpCqJBf1hbl9aStay',
    delay: '-0s',
    soundcloud: 'https://soundcloud.com/luvisaea/sweettooth'
  },
  {
    name: 'passion',
    art: 'https://i.scdn.co/image/ab67616d0000b27344a5b27a3699fd055f54dfe1',
    link: 'https://open.spotify.com/album/4Lk4E6CJxCka7hVweTXl13',
    scannable: 'https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:album:4Lk4E6CJxCka7hVweTXl13',
    delay: '-1.2s',
    soundcloud: 'https://soundcloud.com/luvisaea/passion'
  },
  {
    name: 'insomnia',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP',
    scannable: 'https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:album:5noUTCWdwbvlP5ybkVBMwP',
    delay: '-2.4s',
    soundcloud: 'https://soundcloud.com/luvisaea/insomnia'
  }
];

const discography = [
  {
    title: 'misa',
    type: 'Album',
    year: '2025',
    art: 'https://i.scdn.co/image/ab67616d0000b27382fd407b34a2bc1c49479ba3',
    link: 'https://open.spotify.com/album/5gexUjbI0Ucq0MXMRTu8A0',
    songs: ['sweettooth', 'teeth', 'Angel', 'passion', 'insomnia']
  },
  {
    title: 'sweettooth',
    type: 'Single',
    year: '2026',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/track/4VfxSZpCqJBf1hbl9aStay',
    songs: ['sweettooth']
  },
  {
    title: 'teeth',
    type: 'Single',
    year: '2025',
    art: 'https://i.scdn.co/image/ab67616d0000b27382fd407b34a2bc1c49479ba3',
    link: 'https://open.spotify.com/album/24Ufjk9c26f06iGSUkom7v',
    songs: ['teeth']
  },
  {
    title: 'passion',
    type: 'Single',
    year: '2026',
    art: 'https://i.scdn.co/image/ab67616d0000b27344a5b27a3699fd055f54dfe1',
    link: 'https://open.spotify.com/album/4Lk4E6CJxCka7hVweTXl13',
    songs: ['passion']
  },
  {
    title: 'insomnia',
    type: 'Single',
    year: '2026',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP',
    songs: ['insomnia']
  },
  {
    title: 'troublemaker',
    type: 'Single',
    year: '2026',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP',
    songs: ['troublemaker']
  },
  {
    title: 'Angel',
    type: 'Single',
    year: '2025',
    art: 'https://i.scdn.co/image/ab67616d0000b2739a7c3a0e77be12a0cf9e3cc7',
    link: 'https://open.spotify.com/album/450ZSg2ugu3jm396J0dBO9',
    songs: ['Angel']
  },
  {
    title: 'Roses',
    type: 'Single',
    year: '2025',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP',
    songs: ['Roses']
  },
  {
    title: 'molly',
    type: 'Single',
    year: '2025',
    art: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db',
    link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP',
    songs: ['molly']
  }
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const petalCount = 25;
    const colors = ['#ffb7c5', '#f0ece4'];

    interface Petal {
      x: number;
      y: number;
      baseX: number;
      width: number;
      height: number;
      angle: number;
      rotationSpeed: number;
      speed: number;
      driftAmplitude: number;
      driftSpeed: number;
      driftPhase: number;
      color: string;
    }

    const createPetal = (): Petal => {
      const width = 4 + Math.random() * 6;
      const baseX = Math.random() * canvas.width;
      return {
        x: baseX,
        y: Math.random() * canvas.height,
        baseX,
        width,
        height: width * 0.6,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speed: 0.3 + Math.random() * 0.5,
        driftAmplitude: 10 + Math.random() * 30,
        driftSpeed: 0.001 + Math.random() * 0.002,
        driftPhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal());
    }

    let animationId: number;
    let time = 0;

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.width / 2, petal.height / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = petal.color;
      ctx.globalAlpha = 0.4;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      petals.forEach((petal) => {
        petal.y += petal.speed;
        petal.angle += petal.rotationSpeed;
        petal.x = petal.baseX + Math.sin(time * petal.driftSpeed + petal.driftPhase) * petal.driftAmplitude;

        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.baseX = Math.random() * canvas.width;
          petal.x = petal.baseX;
          petal.width = 4 + Math.random() * 6;
          petal.height = petal.width * 0.6;
          petal.angle = Math.random() * Math.PI * 2;
          petal.color = colors[Math.floor(Math.random() * colors.length)];
        }

        drawPetal(petal);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

const BOWL_ORBS = [
  { src: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db', name: 'sweettooth', link: 'https://open.spotify.com/track/4VfxSZpCqJBf1hbl9aStay' },
  { src: 'https://i.scdn.co/image/ab67616d0000b27344a5b27a3699fd055f54dfe1', name: 'passion',    link: 'https://open.spotify.com/album/4Lk4E6CJxCka7hVweTXl13' },
  { src: 'https://i.scdn.co/image/ab67616d0000b27382fd407b34a2bc1c49479ba3', name: 'teeth',      link: 'https://open.spotify.com/album/24Ufjk9c26f06iGSUkom7v' },
  { src: 'https://i.scdn.co/image/ab67616d0000b2739a7c3a0e77be12a0cf9e3cc7', name: 'Angel',      link: 'https://open.spotify.com/album/450ZSg2ugu3jm396J0dBO9' },
  { src: 'https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db', name: 'insomnia',   link: 'https://open.spotify.com/album/5noUTCWdwbvlP5ybkVBMwP' },
  { src: 'https://i.scdn.co/image/ab67616d0000b27382fd407b34a2bc1c49479ba3', name: 'misa',       link: 'https://open.spotify.com/album/24Ufjk9c26f06iGSUkom7v' },
];

// Bowl geometry constants (px, matches SVG viewBox 220×300)
const BOWL_CX    = 110;   // center x of bowl circle
const BOWL_CY    = 115;   // center y of bowl circle
const BOWL_R     = 95;    // radius of bowl interior
const ORB_R      = 11;    // orb radius (22px diameter)
const WATER_TOP  = 40;    // y-coordinate of water surface line (bowl open above this)

function FishbowlCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // orb state — spread evenly across bowl interior using angle distribution
  const orbsRef = useRef(
    BOWL_ORBS.map((_, i) => {
      const angle = (i / BOWL_ORBS.length) * Math.PI * 2;
      const r = (BOWL_R - ORB_R - 8) * (0.45 + Math.random() * 0.5);
      return {
        x: BOWL_CX + Math.cos(angle) * r,
        y: BOWL_CY + Math.sin(angle) * r * 0.85,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      };
    })
  );

  // Fish state
  const fishRef = useRef({
    x: BOWL_CX,
    y: BOWL_CY + 30,
    vx: 0.24,
    vy: 0,
    facingRight: true,
  });
  // Ripple effects: array of { x, y, r, alpha }
  const ripplesRef = useRef<{ x: number; y: number; r: number; alpha: number }[]>([]);

  // Load images once
  const imagesRef = useRef<(HTMLImageElement | null)[]>(BOWL_ORBS.map(() => null));
  useEffect(() => {
    BOWL_ORBS.forEach((orb, i) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = orb.src;
      img.onload = () => { imagesRef.current[i] = img; };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Scale canvas for device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = 220 * dpr;
    canvas.height = 300 * dpr;
    ctx.scale(dpr, dpr);

    let animId: number;
    let frame = 0;

    const drawFish = (x: number, y: number, facingRight: boolean, tailPhase: number) => {
      ctx.save();
      if (!facingRight) {
        ctx.translate(x, y);
        ctx.scale(-1, 1);
        ctx.translate(-x, -y);
      }
      // Body gradient
      const grad = ctx.createRadialGradient(x + 4, y - 3, 2, x, y, 15);
      grad.addColorStop(0, '#ffd060');
      grad.addColorStop(1, '#cc5500');
      // Body oval
      ctx.beginPath();
      ctx.ellipse(x, y, 15, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // Fan tail — oscillates with tailPhase
      const tailWag = Math.sin(tailPhase) * 3;
      ctx.beginPath();
      ctx.moveTo(x - 13, y);
      ctx.lineTo(x - 22, y - 9 + tailWag);
      ctx.lineTo(x - 22, y + 9 - tailWag);
      ctx.closePath();
      ctx.fillStyle = '#e06000';
      ctx.fill();
      // Dorsal fin
      ctx.beginPath();
      ctx.moveTo(x - 4, y - 8);
      ctx.quadraticCurveTo(x + 2, y - 16, x + 8, y - 8);
      ctx.closePath();
      ctx.fillStyle = '#ff9900';
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;
      // Pectoral fin
      ctx.beginPath();
      ctx.ellipse(x + 2, y + 4, 6, 3, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,180,50,0.7)';
      ctx.fill();
      // Eye white
      ctx.beginPath();
      ctx.arc(x + 9, y - 2, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      // Eye pupil
      ctx.beginPath();
      ctx.arc(x + 10, y - 2, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = '#111';
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, 220, 300);
      frame++;

      const maxDist = BOWL_R - ORB_R;
      const orbs = orbsRef.current;

      // Update orb physics
      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;

        // Bounce off curved bowl wall
        const dx = o.x - BOWL_CX;
        const dy = o.y - BOWL_CY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          const dot = o.vx * nx + o.vy * ny;
          o.vx -= 2 * dot * nx;
          o.vy -= 2 * dot * ny;
          o.x = BOWL_CX + nx * maxDist;
          o.y = BOWL_CY + ny * maxDist;
        }

        // Constrain below water line
        if (o.y - ORB_R < WATER_TOP) {
          o.y = WATER_TOP + ORB_R;
          if (o.vy < 0) o.vy = -o.vy;
        }

        // Friction — gradually returns blasted orbs to gentle float speed
        o.vx *= 0.985;
        o.vy *= 0.985;
        // Random drift
        o.vx += (Math.random() - 0.5) * 0.02;
        o.vy += (Math.random() - 0.5) * 0.02;
        // Allow up to 3.0 for post-collision blast, clamp there; min nudge
        const speed = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
        if (speed > 3.0) { o.vx = (o.vx / speed) * 3.0; o.vy = (o.vy / speed) * 3.0; }
        if (speed < 0.1) { o.vx *= 1.05; o.vy *= 1.05; }
      });

      // Orb-orb collision detection
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i]; const b = orbs[j];
          const cdx = b.x - a.x; const cdy = b.y - a.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const minDist = ORB_R * 2;
          if (cdist < minDist && cdist > 0) {
            const nx = cdx / cdist; const ny = cdy / cdist;
            // Separate
            const overlap = (minDist - cdist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            b.x += nx * overlap; b.y += ny * overlap;
            // Swap velocity along collision normal
            const dvx = a.vx - b.vx; const dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot > 0) {
              a.vx -= dot * nx; a.vy -= dot * ny;
              b.vx += dot * nx; b.vy += dot * ny;
            }
          }
        }
      }

      // ── Update fish ──
      const fish = fishRef.current;
      const fishHalfLen = 15; // half body length
      fish.x += fish.vx;
      fish.y += fish.vy;
      // Gentle vertical bob
      fish.y += Math.sin(frame * 0.04) * 0.18;
      fish.facingRight = fish.vx >= 0;

      // Fish bounces off bowl wall (use slightly smaller radius for fish)
      const fishMaxDist = BOWL_R - fishHalfLen - 4;
      {
        const fdx = fish.x - BOWL_CX;
        const fdy = fish.y - BOWL_CY;
        const fdist = Math.sqrt(fdx * fdx + fdy * fdy);
        if (fdist > fishMaxDist) {
          const nx = fdx / fdist; const ny = fdy / fdist;
          const dot = fish.vx * nx + fish.vy * ny;
          fish.vx -= 2 * dot * nx;
          fish.vy -= 2 * dot * ny;
          fish.x = BOWL_CX + nx * fishMaxDist;
          fish.y = BOWL_CY + ny * fishMaxDist;
        }
      }
      // Fish stays below water line
      if (fish.y - 10 < WATER_TOP) {
        fish.y = WATER_TOP + 10;
        if (fish.vy < 0) fish.vy = -fish.vy;
      }

      // Fish vs orb collision
      orbs.forEach((o) => {
        const cdx = fish.x - o.x; const cdy = fish.y - o.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < fishHalfLen + ORB_R + 4 && cdist > 0) {
          // Reverse fish
          fish.vx = -fish.vx;
          fish.vy += (Math.random() - 0.5) * 0.3;
          fish.x += (cdx / cdist) * 4;
          fish.y += (cdy / cdist) * 4;
          // Blast orb away from fish at 3× strength
          const blastSpeed = 2.4;
          o.vx = -(cdx / cdist) * blastSpeed;
          o.vy = -(cdy / cdist) * blastSpeed;
          // Spawn ripple
          ripplesRef.current.push({ x: (fish.x + o.x) / 2, y: (fish.y + o.y) / 2, r: 4, alpha: 0.8 });
        }
      });

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter((rip) => rip.alpha > 0.02);
      ripplesRef.current.forEach((rip) => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,220,255,${rip.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        rip.r += 1.2;
        rip.alpha *= 0.88;
      });

      // Draw fish
      drawFish(fish.x, fish.y, fish.facingRight, frame * 0.07);

      // Draw orbs
      orbsRef.current.forEach((o, i) => {
        const img = imagesRef.current[i];
        ctx.save();
        // Glow
        ctx.shadowColor = 'rgba(100,150,255,0.35)';
        ctx.shadowBlur = 12;
        // Clip to circle
        ctx.beginPath();
        ctx.arc(o.x, o.y, ORB_R, 0, Math.PI * 2);
        ctx.clip();
        if (img) {
          ctx.drawImage(img, o.x - ORB_R, o.y - ORB_R, ORB_R * 2, ORB_R * 2);
        } else {
          ctx.fillStyle = 'rgba(100,120,180,0.5)';
          ctx.fill();
        }
        ctx.restore();
        // Border ring
        ctx.beginPath();
        ctx.arc(o.x, o.y, ORB_R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(240,236,228,0.55)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse hit-test for hover (overlay divs handle click; canvas just for animation)
  const getHoveredOrb = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    // The container is 220px wide, 300px tall at CSS size
    const scaleX = 220 / rect.width;
    const scaleY = 300 / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;
    for (let i = 0; i < orbsRef.current.length; i++) {
      const o = orbsRef.current[i];
      const dx = mx - o.x;
      const dy = my - o.y;
      if (dx * dx + dy * dy <= (ORB_R + 4) * (ORB_R + 4)) return i;
    }
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute z-20"
      style={{ left: '3%', top: '50%', transform: 'translateY(-50%)', width: '220px', height: '300px' }}
      onMouseMove={(e) => setHoveredOrb(getHoveredOrb(e))}
      onMouseLeave={() => setHoveredOrb(null)}
    >
      {/* SVG fishbowl shell — pointer-events none so clicks pass through to orb links */}
      <svg
        width="220" height="300" viewBox="0 0 220 300"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          {/* Clip the water fill to the lower portion of the bowl */}
          <clipPath id="waterClip">
            <rect x="10" y="40" width="200" height="300" />
          </clipPath>
          <radialGradient id="waterFill" cx="50%" cy="60%" r="55%">
            <stop offset="0%"   stopColor="rgba(15,80,180,0.70)" />
            <stop offset="100%" stopColor="rgba(5,25,90,0.80)" />
          </radialGradient>
          <filter id="bowlGlow" x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(100,180,255,0.18)" />
          </filter>
        </defs>
        {/* Water fill — clipped below water line */}
        <circle cx="110" cy="115" r="97" fill="url(#waterFill)" clipPath="url(#waterClip)" />
        {/* Open bowl — lower curved glass arc from left rim to right rim, open at top */}
        <path
          d="M18,115 A92,92 0 0,0 202,115"
          fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5"
          filter="url(#bowlGlow)"
        />
        {/* Left side wall up to water line */}
        <line x1="18" y1="115" x2="26" y2="40" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
        {/* Right side wall up to water line */}
        <line x1="202" y1="115" x2="194" y2="40" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
        {/* Glass shine highlight */}
        <path d="M68,60 Q75,45 95,42" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Water surface line */}
        <path d="M26,40 Q68,34 110,37 Q152,34 194,40" fill="none" stroke="rgba(140,200,255,0.55)" strokeWidth="1.2" />
        {/* Neck */}
        <path d="M74,208 Q68,222 65,238 L155,238 Q152,222 146,208 Z" fill="rgba(10,20,40,0.5)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        {/* Base */}
        <rect x="50" y="238" width="120" height="16" rx="3" fill="rgba(15,10,5,0.75)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {/* Bubbles — animated via CSS */}
        <circle className="bubble1" cx="90"  cy="195" r="4.5" fill="rgba(180,210,255,0.40)" />
        <circle className="bubble2" cx="112" cy="200" r="3.5" fill="rgba(180,210,255,0.40)" />
        <circle className="bubble3" cx="130" cy="192" r="4"   fill="rgba(180,210,255,0.40)" />
      </svg>

      {/* Canvas for animated orbs — pointer-events none */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '220px', height: '300px', zIndex: 2 }}
      />

      {/* Invisible click targets for each orb */}
      {BOWL_ORBS.map((orb, i) => (
        <a
          key={orb.name + i}
          href={orb.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute rounded-full flex items-center justify-center transition-transform duration-150"
          style={{
            width: `${ORB_R * 2}px`,
            height: `${ORB_R * 2}px`,
            zIndex: 3,
            transform: hoveredOrb === i ? 'scale(1.18)' : 'scale(1)',
            background: 'transparent',
            // position updated by JS each frame — start at center
            left: `${orbsRef.current[i].x - ORB_R}px`,
            top:  `${orbsRef.current[i].y  - ORB_R}px`,
          }}
        >
          {hoveredOrb === i && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#c1121f" style={{ filter: 'drop-shadow(0 0 3px #000)' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}

export default function IsaeaPage() {
  const [hoveredDisc, setHoveredDisc] = useState<string | null>(null);
  const [pulsedDisc, setPulsedDisc] = useState<string | null>(null);
  const [expandedSong, setExpandedSong] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterCursor, setTypewriterCursor] = useState(true);

  useEffect(() => {
    const phrases = [
      'music for the late nights.',
      'music for the heartbroken.',
      'music for the ones who feel too much.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
      } else {
        charIndex--;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 40 : 70);
    };

    timeout = setTimeout(tick, 1200);
    const cursorInterval = setInterval(() => setTypewriterCursor((v) => !v), 530);
    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleDiscClick = (songName: string, link: string) => {
    setPulsedDisc(songName);
    setTimeout(() => {
      window.open(link, '_blank');
      setPulsedDisc(null);
    }, 200);
  };

  const handlePlayClick = (songName: string, soundcloudUrl: string | null, link: string) => {
    if (soundcloudUrl) {
      setExpandedSong(expandedSong === songName ? null : songName);
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0a0a0a', color: '#f0ece4' }}>
      <svg 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row md:items-center md:justify-center items-center justify-center relative overflow-hidden pb-16 md:pb-0" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Full-width petal canvas */}
        <ParticleCanvas />

        {/* Fishbowl with floating album cover orbs */}
        <FishbowlCanvas />

        {/* Deep red radial spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 35% 55%, rgba(193, 18, 31, 0.30) 0%, rgba(193, 18, 31, 0.08) 50%, transparent 80%)'
          }}
        />

        {/* Listener stats card bottom-right */}
        <div
          className="absolute bottom-8 right-8 z-20 flex flex-col items-end pointer-events-none"
          style={{
            background: 'rgba(10,10,10,0.65)',
            border: '1px solid #c1121f',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '10px',
            padding: '12px 18px'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#f0ece4', fontWeight: 'bold' }}>3,633</span>
          </div>
          <span style={{ fontSize: '10px', color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>monthly listeners</span>
        </div>

        {/* Centered text content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1
            className="font-serif font-bold leading-none mb-3"
            style={{ fontSize: 'clamp(4rem, 15vw, 16rem)', fontFamily: 'Georgia, serif', color: '#f0ece4' }}
          >
            isaea
          </h1>
          <div className="h-px mb-5 mx-auto" style={{ backgroundColor: '#c1121f', width: 'clamp(60px, 8vw, 120px)', animation: 'drawLine 1.5s ease-out forwards 0.5s' }} />
          <p className="text-sm tracking-[0.3em] mb-2" style={{ color: '#666' }}>
            ( eye-ZAY-uh )
          </p>
          <p className="text-sm italic mb-4" style={{ fontFamily: 'Georgia, serif', color: '#f0ece4', opacity: 0.7 }}>
            alternative / midwest emo
          </p>
          <p className="text-sm italic mb-8 h-5" style={{ fontFamily: 'Georgia, serif', color: '#f0ece4', opacity: 0.5 }}>
            {typewriterText}<span style={{ color: '#c1121f', opacity: typewriterCursor ? 1 : 0 }}>|</span>
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://open.spotify.com/artist/5AEyf6RIal4GRXB6paYfoZ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <span style={{ color: '#444', fontSize: '12px' }}>•</span>
            <a
              href="https://music.apple.com/us/artist/isaea/1849698047"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
            </a>
            <span style={{ color: '#444', fontSize: '12px' }}>•</span>
            <a
              href="https://instagram.com/luv4isaea"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Wanted Poster — centered below text on mobile, absolute right on desktop */}
        <div className="poster-wrapper z-20">
        <div
          className="poster-inner mx-auto md:mx-0"
          onMouseEnter={(e) => {
            const isMd = window.innerWidth >= 768;
            (e.currentTarget as HTMLDivElement).style.transform = isMd ? 'translateY(-50%) rotate(4deg)' : 'rotate(2deg)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.8)';
          }}
          onMouseLeave={(e) => {
            const isMd = window.innerWidth >= 768;
            (e.currentTarget as HTMLDivElement).style.transform = isMd ? 'translateY(-50%) rotate(8deg)' : 'rotate(4deg)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          }}
        >
          {/* Push pin */}
          <div className="absolute left-1/2 -top-4 z-30" style={{ transform: 'translateX(-50%)' }}>
            <svg width="22" height="28" viewBox="0 0 22 28">
              <circle cx="11" cy="9" r="8" fill="#c1121f" stroke="#7a0a10" strokeWidth="1.5"/>
              <circle cx="11" cy="9" r="4" fill="#e8394a" opacity="0.7"/>
              <rect x="9.5" y="16" width="3" height="12" rx="1.5" fill="#5a3a1a"/>
            </svg>
          </div>

          {/* Poster body */}
          <div
            style={{
              background: '#f5e6c8',
              border: '5px solid #3d1f0a',
              outline: '2px solid #1a0d04',
              padding: '14px 12px 12px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.18)'
            }}
          >
            {/* Aged edge darkening */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(30,10,0,0.35) 100%)',
                zIndex: 1
              }}
            />

            {/* OUT NOW stamp */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '80px',
                right: '-10px',
                zIndex: 10,
                opacity: 0.72,
                transform: 'rotate(-15deg)'
              }}
            >
              <svg width="90" height="90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="40" fill="none" stroke="#c1121f" strokeWidth="3.5"/>
                <circle cx="45" cy="45" r="35" fill="none" stroke="#c1121f" strokeWidth="1.2"/>
                <text x="45" y="40" textAnchor="middle" fill="#c1121f" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">OUT</text>
                <text x="45" y="57" textAnchor="middle" fill="#c1121f" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">NOW</text>
              </svg>
            </div>

            {/* Poster content */}
            <div className="relative" style={{ zIndex: 2 }}>
              <p className="poster-warning" style={{ textAlign: 'center', fontSize: '9px', fontWeight: 900, letterSpacing: '0.25em', color: '#1a0d04', marginBottom: '3px', fontFamily: 'Arial Black, sans-serif' }}>
                ⚠ WARNING ⚠
              </p>
              <p className="poster-title" style={{ textAlign: 'center', fontSize: '28px', fontWeight: 900, lineHeight: 1, letterSpacing: '0.04em', color: '#1a0d04', marginBottom: '8px', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                NEW DROP
              </p>

              {/* Album art */}
              <div style={{ border: '2px solid #1a0d04', marginBottom: '8px', lineHeight: 0 }}>
                <Image
                  src="https://i.scdn.co/image/ab67616d0000b273e5efcf8936ab6a66aff5b2db"
                  alt="sweettooth album art"
                  width={256}
                  height={256}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <p className="poster-artist" style={{ textAlign: 'center', fontSize: '22px', fontWeight: 900, color: '#1a0d04', marginBottom: '2px', fontFamily: 'Georgia, serif' }}>
                isaea
              </p>
              <p className="poster-song" style={{ textAlign: 'center', fontSize: '14px', fontStyle: 'italic', fontWeight: 700, color: '#1a0d04', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
                sweettooth
              </p>

              <div style={{ borderTop: '1.5px solid #3d1f0a', marginBottom: '7px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '7px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#5a3a1a', fontWeight: 700, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', marginBottom: '1px' }}>Plays</p>
                  <p className="poster-stat" style={{ fontSize: '13px', fontWeight: 900, color: '#1a0d04', fontFamily: 'Georgia, serif' }}>49,562</p>
                </div>
                <div style={{ width: '1px', background: '#3d1f0a', opacity: 0.4 }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#5a3a1a', fontWeight: 700, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', marginBottom: '1px' }}>Released</p>
                  <p className="poster-stat" style={{ fontSize: '13px', fontWeight: 900, color: '#1a0d04', fontFamily: 'Georgia, serif' }}>2026</p>
                </div>
              </div>

              <div style={{ borderTop: '1.5px solid #3d1f0a', marginBottom: '8px' }} />

              {/* SoundCloud embed */}
              <iframe
                className="poster-sc"
                width="100%"
                height="80"
                style={{ border: 'none', marginBottom: '8px', display: 'block' }}
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/luvisaea/sweettooth&color=%23c1121f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
                allow="autoplay"
              />

              <p className="poster-footer" style={{ textAlign: 'center', fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: '#1a0d04', fontFamily: 'Arial Black, sans-serif', textTransform: 'uppercase' }}>
                LISTEN OR ELSE.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div 
        className="w-full overflow-hidden py-3"
        style={{ 
          backgroundColor: '#0a0a0a', 
          borderTop: '1px solid #c1121f', 
          borderBottom: '1px solid #c1121f' 
        }}
      >
        <div 
          className="whitespace-nowrap flex"
          style={{ 
            animation: 'marquee 30s linear infinite',
            width: 'fit-content'
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] px-4" style={{ color: '#f0ece4' }}>
            alternative · midwest emo · brownsville brooklyn · p66 · isaea · alternative · midwest emo · brownsville brooklyn · p66 · isaea ·
          </span>
          <span className="text-xs uppercase tracking-[0.3em] px-4" style={{ color: '#f0ece4' }}>
            alternative · midwest emo · brownsville brooklyn · p66 · isaea · alternative · midwest emo · brownsville brooklyn · p66 · isaea ·
          </span>
        </div>
      </div>

      {/* Streaming Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 text-center">
        <div className="flex items-center justify-center gap-12 flex-wrap">
          <a 
            href="https://open.spotify.com/artist/5AEyf6RIal4GRXB6paYfoZ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            style={{ color: '#f0ece4' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-sm relative">
              Spotify
              <span className="absolute bottom-0 left-0 h-px bg-[#c1121f] transition-all duration-300 group-hover:w-full" style={{ width: '0%' }} />
            </span>
          </a>
          <a 
            href="https://music.apple.com/us/artist/isaea/1849698047" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            style={{ color: '#f0ece4' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
            <span className="text-sm relative">
              Apple Music
              <span className="absolute bottom-0 left-0 h-px bg-[#c1121f] transition-all duration-300 group-hover:w-full" style={{ width: '0%' }} />
            </span>
          </a>
          <a 
            href="https://soundcloud.com/luvisaea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            style={{ color: '#f0ece4' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-1.175 2.5l-.217 1.905.217 1.875c.015.054.055.094.105.094.05 0 .09-.04.099-.094l.255-1.875-.255-1.905c-.009-.054-.049-.094-.099-.094-.05 0 .09.04-.105.094zm2.25-3.75c-.06 0-.105.045-.12.105l-.21 2.55.21 2.46c.015.06.06.105.12.105.06 0 .105-.045.12-.105l.24-2.46-.24-2.55c-.015-.06-.06-.105-.12-.105zm2.25-3.75c-.075 0-.135.06-.15.135l-.195 3.615.195 3.555c.015.075.075.135.15.135.075 0 .135-.06.15-.135l.225-3.555-.225-3.615c-.015-.075-.075-.135-.15-.135zm2.25 1.5c-.09 0-.15.06-.165.15l-.18 3.285.18 3.255c.015.09.075.15.165.15.09 0 .15-.06.165-.15l.21-3.255-.21-3.285c-.015-.09-.075-.15-.165-.15zm2.25-1.5c-.105 0-.18.075-.195.18l-.165 3.105.165 3.09c.015.105.09.18.195.18.105 0 .18-.075.195-.18l.195-3.09-.195-3.105c-.015-.105-.09-.18-.195-.18zm2.25 0c-.12 0-.21.09-.225.21l-.15 3.075.15 3.06c.015.12.105.21.225.21.12 0 .21-.09.225-.21l.18-3.06-.18-3.075c-.015-.12-.105-.21-.225-.21zm2.25 1.5c-.135 0-.24.105-.255.24l-.135 2.925.135 2.91c.015.135.12.24.255.24.135 0 .24-.105.255-.24l.15-2.91-.15-2.925c-.015-.135-.12-.24-.255-.24zm2.25-2.25c-.15 0-.27.12-.285.27l-.12 3.195.12 3.18c.015.15.135.27.285.27.15 0 .27-.12.285-.27l.135-3.18-.135-3.195c-.015-.15-.135-.27-.285-.27zm2.25 0c-.165 0-.3.135-.315.3l-.105 3.195.105 3.18c.015.165.15.3.315.3.165 0 .3-.135.315-.3l.12-3.18-.12-3.195c-.015-.165-.15-.3-.315-.3zm2.25 1.5c-.18 0-.33.15-.345.33l-.09 2.895.09 2.88c.015.18.165.33.345.33.18 0 .33-.15.345-.33l.105-2.88-.105-2.895c-.015-.18-.165-.33-.345-.33zm2.25-3c-.195 0-.36.165-.375.36l-.075 3.495.075 3.48c.015.195.18.36.375.36.195 0 .36-.165.375-.36l.09-3.48-.09-3.495c-.015-.195-.18-.36-.375-.36zm2.25 0c-.21 0-.39.18-.405.405l-.06 3.495.06 3.48c.015.225.195.405.405.405.21 0 .39-.18.405-.405l.075-3.48-.075-3.495c-.015-.225-.195-.405-.405-.405z"/>
            </svg>
            <span className="text-sm relative">
              SoundCloud
              <span className="absolute bottom-0 left-0 h-px bg-[#c1121f] transition-all duration-300 group-hover:w-full" style={{ width: '0%' }} />
            </span>
          </a>
        </div>
      </section>

      {/* Lyrics Section */}
      <section className="relative w-full py-24 md:py-40 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#000' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p 
            className="italic font-serif whitespace-nowrap"
            style={{ 
              fontSize: '8vw', 
              fontFamily: 'Georgia, serif', 
              color: '#f0ece4', 
              opacity: 0.08 
            }}
          >
            i just want someone to love
          </p>
        </div>
        <div className="relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#f0ece4' }}>
            from the music of isaea
          </span>
          <span className="block text-[#c1121f] text-lg mt-2">*</span>
        </div>
      </section>

      <div className="relative h-px" style={{ backgroundColor: '#c1121f' }}>
        <svg 
          className="absolute inset-0 w-full h-8 pointer-events-none"
          style={{ top: '-14px' }}
          viewBox="0 0 1200 16"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="8" x2="1200" y2="8" stroke="#c1121f" strokeWidth="0.5" opacity="0.5" />
          <circle cx="100" cy="8" r="2" fill="#c1121f" opacity="0.3" />
          <circle cx="300" cy="8" r="1.5" fill="#f0ece4" opacity="0.2" />
          <circle cx="500" cy="8" r="2" fill="#c1121f" opacity="0.3" />
          <circle cx="700" cy="8" r="1.5" fill="#f0ece4" opacity="0.2" />
          <circle cx="900" cy="8" r="2" fill="#c1121f" opacity="0.3" />
          <circle cx="1100" cy="8" r="1.5" fill="#f0ece4" opacity="0.2" />
          <path d="M150,8 Q160,4 170,8" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M350,8 Q360,12 370,8" fill="none" stroke="#f0ece4" strokeWidth="0.5" opacity="0.2" />
          <path d="M550,8 Q560,4 570,8" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M750,8 Q760,12 770,8" fill="none" stroke="#f0ece4" strokeWidth="0.5" opacity="0.2" />
          <path d="M950,8 Q960,4 970,8" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Songs Section */}
      <section className="py-40 px-8 md:px-16 lg:px-24 relative" style={{ backgroundColor: '#050505' }} data-animate="songs">
        <svg 
          className="absolute left-0 top-0 h-full w-24 pointer-events-none"
          style={{ opacity: 0.3 }}
          viewBox="0 0 100 800"
        >
          <path d="M50,800 Q40,700 45,600 T55,400 T50,200 T45,50" fill="none" stroke="#c1121f" strokeWidth="1" />
          <path d="M45,600 Q30,580 35,560" fill="none" stroke="#f0ece4" strokeWidth="0.8" />
          <path d="M55,400 Q70,380 65,360" fill="none" stroke="#c1121f" strokeWidth="0.8" />
          <path d="M50,200 Q35,180 40,160" fill="none" stroke="#f0ece4" strokeWidth="0.8" />
          <ellipse cx="40" cy="580" rx="12" ry="6" fill="#c1121f" opacity="0.5" transform="rotate(-30 40 580)" />
          <ellipse cx="60" cy="380" rx="10" ry="5" fill="#f0ece4" opacity="0.4" transform="rotate(-45 60 380)" />
          <ellipse cx="45" cy="180" rx="8" ry="4" fill="#c1121f" opacity="0.5" transform="rotate(-60 45 180)" />
          <circle cx="50" cy="700" r="4" fill="#f0ece4" opacity="0.3" />
          <circle cx="55" cy="500" r="3" fill="#c1121f" opacity="0.4" />
          <circle cx="48" cy="300" r="3" fill="#f0ece4" opacity="0.3" />
          <circle cx="52" cy="100" r="2" fill="#c1121f" opacity="0.4" />
        </svg>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 
              className="font-serif font-bold"
              style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', fontFamily: 'Georgia, serif' }}
            >
              listen.
            </h2>
          </div>
          <div className="lg:w-2/3 flex flex-col gap-4">
            {songs.map((song, index) => (
              <div key={song.name}>
                <div className="flex items-center gap-4">
                  <div 
                    className="relative flex-shrink-0"
                    style={{
                      width: '80px',
                      height: '80px',
                      animationName: 'spin',
                      animationDuration: hoveredDisc === song.name ? '2s' : '6s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite',
                      animationDelay: song.delay,
                      transform: pulsedDisc === song.name ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.1s ease-out'
                    }}
                    onClick={() => handleDiscClick(song.name, song.link)}
                  >
                    <div 
                      className="w-full h-full rounded-full overflow-hidden"
                      style={{
                        boxShadow: pulsedDisc === song.name ? '0 0 20px rgba(193, 18, 31, 0.5)' : 'none'
                      }}
                    >
                      <Image
                        src={song.art}
                        alt={song.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#c1121f' }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span 
                      className="text-lg font-serif relative inline-block group"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {song.name}
                      <span 
                        className="absolute bottom-0 left-0 h-px bg-[#c1121f] transition-all duration-300 group-hover:w-full"
                        style={{ width: '0%' }}
                      />
                    </span>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>
                      {song.name === 'sweettooth' && '49,562 plays'}
                      {song.name === 'passion' && '10,167 plays'}
                      {song.name === 'insomnia' && '3,313 plays'}
                    </p>
                  </div>
                  {song.soundcloud ? (
                    <button 
                      className="p-2 hover:opacity-70 transition-opacity"
                      style={{ color: '#c1121f' }}
                      title='Play'
                      onClick={() => handlePlayClick(song.name, song.soundcloud, song.link)}
                    >
                      {expandedSong === song.name ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  ) : (
                    <div className="flex flex-col items-center">
                      <a 
                        href={song.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </a>
                      <span className="text-xs opacity-40 mt-1">on Spotify</span>
                    </div>
                  )}
                </div>
                {expandedSong === song.name && song.soundcloud && (
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expandedSong === song.name ? '200px' : '0px' }}>
                    <iframe
                      width='100%'
                      height='166'
                      scrolling='no'
                      frameBorder='no'
                      allow='autoplay'
                      src={`https://w.soundcloud.com/player/?url=${song.soundcloud}&color=%23c1121f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&start_time=0&end_time=30&single_active=true`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px" style={{ backgroundColor: '#c1121f' }} />

      {/* Discography Section */}
      <section className="py-40 px-8 md:px-16 lg:px-24" data-animate="discography">
        <h2 
          className="font-serif font-bold mb-12"
          style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', fontFamily: 'Georgia, serif' }}
        >
          discography.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discography.map((release) => (
            <a
              key={release.title}
              href={release.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-4 border transition-all relative group overflow-hidden hover:shadow-[0_0_20px_rgba(193,18,31,0.3)]"
              style={{ borderColor: '#1a1a1a' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#c1121f'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 discography-bg pointer-events-none"
                style={{ 
                  backgroundImage: `url(${release.art})`,
                  opacity: 0,
                  transition: 'opacity 0.5s, transform 0.5s'
                }}
              />
              <svg 
                className="absolute top-2 right-2 w-8 h-8 pointer-events-none opacity-20"
                viewBox="0 0 50 50"
              >
                <path d="M25,50 Q20,40 22,30 T28,15 T25,5" fill="none" stroke="#c1121f" strokeWidth="1" />
                <ellipse cx="22" cy="28" rx="5" ry="3" fill="#c1121f" transform="rotate(-30 22 28)" />
                <ellipse cx="28" cy="14" rx="4" ry="2" fill="#f0ece4" transform="rotate(-45 28 14)" />
                <circle cx="25" cy="6" r="2" fill="#c1121f" />
              </svg>
              <Image
                src={release.art}
                alt={release.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  {release.title}
                </h3>
                <p className="text-sm opacity-60">
                  {release.type} • {release.year}
                </p>
                <p className="text-xs opacity-40 mt-1">
                  {release.songs.join(', ')}
                </p>
                <span 
                  className="text-xs mt-2 transition-colors"
                  style={{ color: '#c1121f' }}
                >
                  listen →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="h-px" style={{ backgroundColor: '#c1121f' }} />

      {/* About Section */}
      <section className="py-40 px-8 md:px-16 lg:px-24 text-center relative" data-animate="about">
        <svg 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-64 pointer-events-none hidden md:block"
          style={{ opacity: 0.5 }}
          viewBox="0 0 150 200"
        >
          <path d="M75,200 Q60,180 70,150 T80,100 T70,50 T75,20" fill="none" stroke="#c1121f" strokeWidth="1.5" />
          <path d="M70,150 Q50,130 55,110" fill="none" stroke="#f0ece4" strokeWidth="1" />
          <path d="M80,100 Q100,80 95,60" fill="none" stroke="#c1121f" strokeWidth="1" />
          <ellipse cx="55" cy="130" rx="20" ry="10" fill="#c1121f" opacity="0.6" transform="rotate(-25 55 130)" />
          <ellipse cx="95" cy="70" rx="18" ry="9" fill="#f0ece4" opacity="0.4" transform="rotate(-40 95 70)" />
          <ellipse cx="70" cy="80" rx="15" ry="8" fill="#c1121f" opacity="0.5" transform="rotate(-30 70 80)" />
          <ellipse cx="80" cy="40" rx="12" ry="6" fill="#f0ece4" opacity="0.4" transform="rotate(-50 80 40)" />
          <circle cx="75" cy="25" r="8" fill="#c1121f" opacity="0.6" />
          <path d="M60,140 Q50,120 55,100" fill="none" stroke="#c1121f" strokeWidth="0.8" opacity="0.5" />
          <path d="M90,90 Q100,70 95,50" fill="none" stroke="#f0ece4" strokeWidth="0.8" opacity="0.4" />
          <circle cx="65" cy="120" r="5" fill="#f0ece4" opacity="0.4" />
          <circle cx="85" cy="55" r="4" fill="#c1121f" opacity="0.5" />
        </svg>
        <svg 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-64 pointer-events-none hidden md:block"
          style={{ opacity: 0.5, transform: 'scaleX(-1)' }}
          viewBox="0 0 150 200"
        >
          <path d="M75,200 Q60,180 70,150 T80,100 T70,50 T75,20" fill="none" stroke="#c1121f" strokeWidth="1.5" />
          <path d="M70,150 Q50,130 55,110" fill="none" stroke="#f0ece4" strokeWidth="1" />
          <path d="M80,100 Q100,80 95,60" fill="none" stroke="#c1121f" strokeWidth="1" />
          <ellipse cx="55" cy="130" rx="20" ry="10" fill="#c1121f" opacity="0.6" transform="rotate(-25 55 130)" />
          <ellipse cx="95" cy="70" rx="18" ry="9" fill="#f0ece4" opacity="0.4" transform="rotate(-40 95 70)" />
          <ellipse cx="70" cy="80" rx="15" ry="8" fill="#c1121f" opacity="0.5" transform="rotate(-30 70 80)" />
          <ellipse cx="80" cy="40" rx="12" ry="6" fill="#f0ece4" opacity="0.4" transform="rotate(-50 80 40)" />
          <circle cx="75" cy="25" r="8" fill="#c1121f" opacity="0.6" />
          <path d="M60,140 Q50,120 55,100" fill="none" stroke="#c1121f" strokeWidth="0.8" opacity="0.5" />
          <path d="M90,90 Q100,70 95,50" fill="none" stroke="#f0ece4" strokeWidth="0.8" opacity="0.4" />
          <circle cx="65" cy="120" r="5" fill="#f0ece4" opacity="0.4" />
          <circle cx="85" cy="55" r="4" fill="#c1121f" opacity="0.5" />
        </svg>
        <div className="max-w-2xl mx-auto px-4">
          <p 
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: 'Georgia, serif', color: '#c1121f' }}
          >
            "
          </p>
          <p 
            className="text-xl md:text-2xl italic mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            if this bio is full i probably sold out
          </p>
          <p 
            className="text-sm md:text-base leading-relaxed mb-6"
            style={{ color: '#f0ece4', opacity: 0.8 }}
          >
            isaea (eye-ZAY-uh) is an independent artist from Brownsville, Brooklyn, New York. Making alternative and midwest emo music that blurs the lines between raw emotion and intimate production — most of it built alone, late at night.
          </p>
          <p 
            className="text-sm md:text-base leading-relaxed"
            style={{ color: '#f0ece4', opacity: 0.8 }}
          >
            Influenced by Pinegrove, sundots, and Dear Maryanne. Currently releasing music under P66. His goal is simple: make this a career and take care of the people he loves.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-40 px-8 md:px-16 lg:px-24 text-center" style={{ backgroundColor: '#050505' }}>
        <h2 
          className="font-serif font-bold mb-6"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontFamily: 'Georgia, serif' }}
        >
          reach out.
        </h2>
        <p className="text-sm mb-8" style={{ color: '#666' }}>
          for bookings, collabs, or just to connect
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://instagram.com/luvisaea"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full border transition-colors hover:border-[#c1121f]"
            style={{ borderColor: '#1a1a1a', color: '#f0ece4' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-sm">@luv4isaea</span>
          </a>
          <span 
            className="px-5 py-3 rounded-full border text-sm"
            style={{ borderColor: '#1a1a1a', color: '#666' }}
          >
            contact via instagram
          </span>
        </div>
      </section>

      <div className="h-px" style={{ backgroundColor: '#c1121f' }} />

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between border-t relative gap-6" style={{ borderColor: '#1a1a1a' }}>
        <svg 
          className="absolute top-0 left-0 w-full h-12 pointer-events-none"
          style={{ top: '-24px' }}
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="12" x2="1200" y2="12" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M100,12 Q110,8 120,12" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M300,12 Q310,16 320,12" fill="none" stroke="#f0ece4" strokeWidth="0.5" opacity="0.2" />
          <path d="M500,12 Q510,8 520,12" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M700,12 Q710,16 720,12" fill="none" stroke="#f0ece4" strokeWidth="0.5" opacity="0.2" />
          <path d="M900,12 Q910,8 920,12" fill="none" stroke="#c1121f" strokeWidth="0.5" opacity="0.3" />
          <path d="M1100,12 Q1110,16 1120,12" fill="none" stroke="#f0ece4" strokeWidth="0.5" opacity="0.2" />
          <ellipse cx="110" cy="10" rx="4" ry="2" fill="#c1121f" opacity="0.2" transform="rotate(-30 110 10)" />
          <ellipse cx="310" cy="14" rx="3" ry="1.5" fill="#f0ece4" opacity="0.15" transform="rotate(-45 310 14)" />
          <ellipse cx="510" cy="10" rx="4" ry="2" fill="#c1121f" opacity="0.2" transform="rotate(-30 510 10)" />
          <ellipse cx="710" cy="14" rx="3" ry="1.5" fill="#f0ece4" opacity="0.15" transform="rotate(-45 710 14)" />
          <ellipse cx="910" cy="10" rx="4" ry="2" fill="#c1121f" opacity="0.2" transform="rotate(-30 910 10)" />
          <ellipse cx="1110" cy="14" rx="3" ry="1.5" fill="#f0ece4" opacity="0.15" transform="rotate(-45 1110 14)" />
        </svg>
        <span className="text-sm">isaea</span>
        <div className="flex items-center gap-6">
          <a 
            href="https://open.spotify.com/artist/5AEyf6RIal4GRXB6paYfoZ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
          <a 
            href="https://music.apple.com/us/artist/isaea/1849698047" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
          </a>
          <a 
            href="https://soundcloud.com/luvisaea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-1.175 2.5l-.217 1.905.217 1.875c.015.054.055.094.105.094.05 0 .09-.04.099-.094l.255-1.875-.255-1.905c-.009-.054-.049-.094-.099-.094-.05 0-.09.04-.105.094zm2.25-3.75c-.06 0-.105.045-.12.105l-.21 2.55.21 2.46c.015.06.06.105.12.105.06 0 .105-.045.12-.105l.24-2.46-.24-2.55c-.015-.06-.06-.105-.12-.105zm2.25-3.75c-.075 0-.135.06-.15.135l-.195 3.615.195 3.555c.015.075.075.135.15.135.075 0 .135-.06.15-.135l.225-3.555-.225-3.615c-.015-.075-.075-.135-.15-.135zm2.25 1.5c-.09 0-.15.06-.165.15l-.18 3.285.18 3.255c.015.09.075.15.165.15.09 0 .15-.06.165-.15l.21-3.255-.21-3.285c-.015-.09-.075-.15-.165-.15zm2.25-1.5c-.105 0-.18.075-.195.18l-.165 3.105.165 3.09c.015.105.09.18.195.18.105 0 .18-.075.195-.18l.195-3.09-.195-3.105c-.015-.105-.09-.18-.195-.18zm2.25 0c-.12 0-.21.09-.225.21l-.15 3.075.15 3.06c.015.12.105.21.225.21.12 0 .21-.09.225-.21l.18-3.06-.18-3.075c-.015-.12-.105-.21-.225-.21zm2.25 1.5c-.135 0-.24.105-.255.24l-.135 2.925.135 2.91c.015.135.12.24.255.24.135 0 .24-.105.255-.24l.15-2.91-.15-2.925c-.015-.135-.12-.24-.255-.24zm2.25-2.25c-.15 0-.27.12-.285.27l-.12 3.195.12 3.18c.015.15.135.27.285.27.15 0 .27-.12.285-.27l.135-3.18-.135-3.195c-.015-.15-.135-.27-.285-.27zm2.25 0c-.165 0-.3.135-.315.3l-.105 3.195.105 3.18c.015.165.15.3.315.3.165 0 .3-.135.315-.3l.12-3.18-.12-3.195c-.015-.165-.15-.3-.315-.3zm2.25 1.5c-.18 0-.33.15-.345.33l-.09 2.895.09 2.88c.015.18.165.33.345.33.18 0 .33-.15.345-.33l.105-2.88-.105-2.895c-.015-.18-.165-.33-.345-.33zm2.25-3c-.195 0-.36.165-.375.36l-.075 3.495.075 3.48c.015.195.18.36.375.36.195 0 .36-.165.375-.36l.09-3.48-.09-3.495c-.015-.195-.18-.36-.375-.36zm2.25 0c-.21 0-.39.18-.405.405l-.06 3.495.06 3.48c.015.225.195.405.405.405.21 0 .39-.18.405-.405l.075-3.48-.075-3.495c-.015-.225-.195-.405-.405-.405z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com/luv4isaea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
