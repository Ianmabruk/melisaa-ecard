import { useState, useEffect, useRef } from 'react'
import './App.css'

const PAGES = [
  { id: 'cover' },
  {
    id: 'dad',
    emoji: '👨‍💼',
    from: 'Dad',
    role: 'Your Father',
    gradient: ['#1a1a2e', '#16213e', '#0f3460'],
    ink: '#93c5fd',
    seal: '💙',
    message: [
      'My dearest Melissa,',
      'From the very first moment I held you, I knew my life had changed forever — for the better, in every possible way. Watching you grow into the kind, brilliant, and beautiful young woman you are today is the greatest privilege of my life.',
      'You carry yourself with a grace that makes me proud every single day. Your laughter is my favourite sound in the world, and your smile — oh, your smile — it could light up the darkest room.',
      'On this special day, I want you to know: you are loved beyond measure, beyond words, beyond anything I could ever express. Keep reaching for the stars, my princess — they were made for you.',
    ],
    signature: 'With all my heart, always — Dad 💙',
  },
  {
    id: 'mum',
    emoji: '👩‍❤️‍💋‍👨',
    from: 'Mum',
    role: 'Your Mother',
    gradient: ['#2d0a1e', '#4a0e2e', '#6b1a3a'],
    ink: '#fda4af',
    seal: '💝',
    message: [
      'My beautiful Melissa,',
      'There are no words big enough to hold how much I love you. You came into this world and made it infinitely more beautiful. Every single day with you is a gift I never take for granted.',
      'I see so much strength in you — the way you face challenges with courage, the way you love with your whole heart, the way you make everyone around you feel seen and valued. That is rare. That is you.',
      'You deserve every happiness this world has to offer, and I will always be your biggest cheerleader, your safe place, and your forever home. Happy Birthday, my darling girl.',
    ],
    signature: 'Forever yours, with endless love — Mum 🌸',
  },
  {
    id: 'auntie',
    emoji: '🌺',
    from: 'Auntie Sarah',
    role: 'Your Auntie',
    gradient: ['#0a1628', '#0d2137', '#0a3352'],
    ink: '#7dd3fc',
    seal: '🌊',
    message: [
      'Dear Melissa,',
      'Being your auntie is one of the greatest joys of my life. I have watched you blossom from a curious little girl into this incredible young woman, and every step of the way, you have amazed me.',
      'You have a heart of pure gold. Your kindness, your warmth, your infectious energy — they make the world a better place just by existing. Never let anyone dim that light of yours.',
      'May this birthday mark the beginning of your most beautiful chapter yet — full of laughter, love, and all the adventures your heart desires. You are so very loved, my dear niece!',
    ],
    signature: 'Big hugs always, with so much love — Auntie Sarah 💙',
  },
  {
    id: 'ammy',
    emoji: '🌟',
    from: 'Ammy',
    role: 'Your Cousin',
    gradient: ['#1a0a00', '#2d1500', '#4a2000'],
    ink: '#fde68a',
    seal: '⭐',
    message: [
      'Hey Melissa! 🎉',
      'Happy Birthday to the most amazing cousin in the entire universe! I am not even exaggerating — you are genuinely one of the best people I know, and I feel so lucky every single day that I get to call you my cousin.',
      'You make every moment more fun, every memory more special, and every day brighter just by being in it. I love how we can laugh about absolutely nothing for hours and it still feels like the best time ever.',
      'I hope today is absolutely magical — full of your favourite things, your favourite people, and so much cake! You deserve the whole world, Melissa!',
    ],
    signature: 'Love you to the moon and back — Ammy ✨',
  },
  {
    id: 'ian',
    emoji: '🎮',
    from: 'Cousin Ian',
    role: 'Your Cousin',
    gradient: ['#001a0a', '#002d14', '#004a20'],
    ink: '#6ee7b7',
    seal: '🌿',
    message: [
      'Yo Melissa! 🎉',
      'Okay so I am not the best at writing these things but I am going to try because you deserve it. You are genuinely the coolest cousin I have. Like, no competition.',
      'You are funny, you are kind, you are smart, and somehow you manage to be all of those things at once which is honestly impressive. I am really grateful to have you in my life.',
      'You always know how to make things better and you have always been there when it matters. That means a lot, more than I probably say. Hope today is absolutely epic — you deserve the best day ever!',
    ],
    signature: 'Your cousin, always — Ian 🤝💚',
  },
  { id: 'final' },
]

function useConfetti(active) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const colors = ['#ff6b9d','#c44dff','#ffd166','#4facfe','#43e97b','#f093fb','#fda4af','#a5f3fc']
    const shapes = ['rect','circle','triangle']
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 8,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      wobble: Math.random() * Math.PI * 2,
    }))
    let id
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y += p.vy; p.x += p.vx + Math.sin(p.wobble) * 0.5
        p.rot += p.rotV; p.wobble += 0.05
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot * Math.PI / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.85
        if (p.shape === 'rect') ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.5)
        else if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill() }
        else { ctx.beginPath(); ctx.moveTo(0,-p.size/2); ctx.lineTo(p.size/2,p.size/2); ctx.lineTo(-p.size/2,p.size/2); ctx.closePath(); ctx.fill() }
        ctx.restore()
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    const t = setTimeout(() => { cancelAnimationFrame(id); ctx.clearRect(0,0,canvas.width,canvas.height) }, 6000)
    return () => { cancelAnimationFrame(id); clearTimeout(t) }
  }, [active])
  return canvasRef
}

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({length:16},(_,i)=><span key={i} className={`petal p${i+1}`}/>)}
    </div>
  )
}

function CoverPage({ onNext }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 100); return () => clearTimeout(t) }, [])
  return (
    <div className={`page cover-page ${ready ? 'ready' : ''}`}>
      <div className="cover-bg-glow" />
      <div className="cover-texture" />
      <div className="corner tl">✦</div>
      <div className="corner tr">✦</div>
      <div className="corner bl">✦</div>
      <div className="corner br">✦</div>
      <div className="cover-border" />
      <div className="cover-content">
        <div className="cover-top-ornament">
          <span className="orn-line" /><span className="orn-icon">🌸</span><span className="orn-line" />
        </div>
        <p className="cover-eyebrow">✨ A Birthday Card With Love ✨</p>
        <div className="cover-flowers">
          <span className="cf cf1">🌸</span>
          <span className="cf cf2">🌺</span>
          <span className="cf cf3">🌸</span>
        </div>
        <h1 className="cover-name">
          <span className="cn-first">Melissa</span>
          <span className="cn-last">Makori</span>
        </h1>
        <div className="cover-rule">
          <span /><span className="rule-cake">🎂</span><span />
        </div>
        <p className="cover-hb">Happy Birthday</p>
        <p className="cover-verse">
          May your day be as radiant as your smile,<br />
          as warm as your heart, and as magical<br />
          as you truly are. 🌸
        </p>
        <p className="cover-from">From everyone who loves you dearly 💕</p>
        <button className="cover-btn" onClick={onNext}>
          <span className="btn-label">Open Your Card</span>
          <span className="btn-book">📖</span>
          <span className="btn-shine" />
        </button>
        <p className="cover-hint">or press → to turn the page</p>
      </div>
      <div className="spine" />
    </div>
  )
}

function MessagePage({ page, idx, total, onNext, onPrev }) {
  const [c1, c2, c3] = page.gradient
  return (
    <div className="page msg-page" style={{'--c1':c1,'--c2':c2,'--c3':c3,'--ink':page.ink}}>
      <div className="page-texture" />
      <div className="spine" />
      <div className="msg-content">
        <div className="msg-header">
          <div className="msg-avatar">
            <span className="avatar-emoji">{page.emoji}</span>
            <span className="avatar-glow" />
          </div>
          <div className="msg-meta">
            <span className="msg-role">{page.role}</span>
            <h2 className="msg-from">{page.from}</h2>
          </div>
          <span className="msg-seal">{page.seal}</span>
        </div>
        <div className="msg-letter">
          <div className="letter-lines" aria-hidden="true">
            {Array.from({length:12},(_,i)=><div key={i} className="letter-line"/>)}
          </div>
          <div className="letter-text">
            {page.message.map((para, i) => (
              <p key={i} className={`letter-para ${i===0?'letter-salutation':''}`}>{para}</p>
            ))}
          </div>
        </div>
        <div className="msg-footer">
          <p className="msg-sig">{page.signature}</p>
          <div className="msg-wax">
            <span>{page.seal}</span>
          </div>
        </div>
      </div>
      <div className="page-nav">
        <button className="nav-btn prev-btn" onClick={onPrev} aria-label="Previous page">
          <span className="nav-arrow">‹</span>
          <span className="nav-label">Prev</span>
        </button>
        <div className="page-indicator">
          <span className="pi-current">{idx}</span>
          <span className="pi-sep">/</span>
          <span className="pi-total">{total}</span>
        </div>
        <button className="nav-btn next-btn" onClick={onNext} aria-label="Next page">
          <span className="nav-label">Next</span>
          <span className="nav-arrow">›</span>
        </button>
      </div>
    </div>
  )
}

function FinalPage({ onPrev, onRestart }) {
  const confettiRef = useConfetti(true)
  return (
    <div className="page final-page">
      <canvas ref={confettiRef} className="confetti-canvas" />
      <div className="final-stars" aria-hidden="true">
        {Array.from({length:35},(_,i)=><span key={i} className={`fstar fs${i+1}`}/>)}
      </div>
      <div className="spine" />
      <div className="final-content">
        <div className="final-hearts" aria-hidden="true">
          {['💖','💝','💗','💓','💞','💕','🌸'].map((h,i)=>(
            <span key={i} className={`fh fh${i+1}`}>{h}</span>
          ))}
        </div>
        <p className="final-eyebrow">✨ With All Our Love ✨</p>
        <h2 className="final-title">
          <span className="ft-keep">Keep shining,</span>
          <span className="ft-name">Melissa</span>
        </h2>
        <div className="final-divider">
          <span/><span>🌸</span><span/>
        </div>
        <div className="final-message">
          <p>You are not just loved — you are <em>cherished</em>. Every single person who wrote in this card carries a piece of you in their heart, and that will never change.</p>
          <p>May this year bring you joy that overflows, dreams that come true, and moments so beautiful they take your breath away.</p>
          <p>You are kind. You are brilliant. You are enough — more than enough. The world is so much better with you in it. 🌍💕</p>
        </div>
        <blockquote className="final-quote">
          <span className="quote-mark open">"</span>
          She believed she could, so she did.
          <span className="quote-mark close">"</span>
        </blockquote>
        <p className="final-sign">Happy Birthday, beautiful. 🎂🎉🌸</p>
        <div className="final-actions">
          <button className="nav-btn prev-btn" onClick={onPrev}>‹ Back</button>
          <button className="restart-btn" onClick={onRestart}>
            <span>Read Again</span>
            <span>🔄</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState('next')
  const [flipping, setFlipping] = useState(false)
  const [key, setKey] = useState(0)
  const total = PAGES.length

  const go = (direction) => {
    if (flipping) return
    setDir(direction)
    setFlipping(true)
    setTimeout(() => {
      setCur(c => direction === 'next' ? Math.min(c+1, total-1) : Math.max(c-1, 0))
      setKey(k => k+1)
      setFlipping(false)
    }, 500)
  }

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') go('next')
      if (e.key === 'ArrowLeft') go('prev')
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [flipping])

  const p = PAGES[cur]

  return (
    <div className="scene">
      <Petals />
      <div className={`book-stage ${flipping ? `flip-${dir}` : ''}`} key={key}>
        {p.id === 'cover' && <CoverPage onNext={() => go('next')} />}
        {p.id !== 'cover' && p.id !== 'final' && (
          <MessagePage page={p} idx={cur} total={total-2} onNext={() => go('next')} onPrev={() => go('prev')} />
        )}
        {p.id === 'final' && <FinalPage onPrev={() => go('prev')} onRestart={() => { setDir('prev'); setCur(0); setKey(k=>k+1) }} />}
      </div>
      <nav className="dots" aria-label="Page navigation">
        {PAGES.map((pg, i) => (
          <button
            key={i}
            className={`dot ${i===cur?'dot-active':''} ${i<cur?'dot-visited':''}`}
            onClick={() => { if(!flipping){ setDir(i>cur?'next':'prev'); setFlipping(true); setTimeout(()=>{ setCur(i); setKey(k=>k+1); setFlipping(false) },500) } }}
            aria-label={`Go to page ${i+1}`}
            aria-current={i===cur}
          />
        ))}
      </nav>
    </div>
  )
}
