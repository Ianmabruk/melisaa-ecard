import { useState, useEffect } from 'react'
import './App.css'

const pages = [
  { id: 'cover' },
  {
    id: 'dad',
    emoji: '👨‍💼',
    from: 'Dad',
    gradient: ['#667eea', '#764ba2'],
    accent: '#c4b5fd',
    message: `My dearest Melissa,

From the very first moment I held you, I knew my life had changed forever — for the better, in every possible way. Watching you grow into the kind, brilliant, and beautiful young woman you are today is the greatest privilege of my life.

You carry yourself with a grace that makes me proud every single day. Your laughter is my favourite sound in the world, and your smile — oh, your smile — it could light up the darkest room.

On this special day, I want you to know: you are loved beyond measure, beyond words, beyond anything I could ever express.

Happy Birthday, my princess. 🎂`,
    signature: '— With all my heart, Dad 💙',
  },
  {
    id: 'mum',
    emoji: '👩‍❤️‍💋‍👨',
    from: 'Mum',
    gradient: ['#f093fb', '#f5576c'],
    accent: '#fda4af',
    message: `My beautiful Melissa,

There are no words big enough to hold how much I love you. You came into this world and made it infinitely more beautiful. Every day with you is a gift I never take for granted.

I see so much strength in you — the way you face challenges with courage, the way you love with your whole heart, the way you make everyone around you feel seen and valued. That is rare. That is you.

You deserve every happiness this world has to offer, and I will always be your biggest cheerleader, your safe place, and your forever home.

Happy Birthday, my darling girl. 💝`,
    signature: '— Forever yours, Mum 🌸',
  },
  {
    id: 'auntie',
    emoji: '🌺',
    from: 'Auntie Sarah',
    gradient: ['#4facfe', '#00c6fb'],
    accent: '#bae6fd',
    message: `Dear Melissa,

Being your auntie is one of the greatest joys of my life. I have watched you blossom from a curious little girl into this incredible young woman, and every step of the way, you have amazed me.

You have a heart of pure gold. Your kindness, your warmth, your infectious energy — they make the world a better place just by existing. Never let anyone dim that light of yours.

May this birthday mark the beginning of your most beautiful chapter yet — full of laughter, love, and all the adventures your heart desires.

You are so very loved, my dear niece! 🎉`,
    signature: '— Big hugs always, Auntie Sarah 💙',
  },
  {
    id: 'ammy',
    emoji: '🌟',
    from: 'Ammy',
    gradient: ['#fa709a', '#fee140'],
    accent: '#fde68a',
    message: `Hey Melissa! 🎉

Happy Birthday to the most amazing cousin in the entire universe! I am not even exaggerating — you are genuinely one of the best people I know, and I feel so lucky every single day that I get to call you my cousin.

You make every moment more fun, every memory more special, and every day brighter just by being in it. I love how we can laugh about absolutely nothing for hours and it still feels like the best time ever.

I hope today is absolutely magical — full of your favourite things, your favourite people, and so much cake! 🎂

You deserve the whole world, Melissa! 💖`,
    signature: '— Love you to the moon, Ammy ✨',
  },
  {
    id: 'ian',
    emoji: '🎮',
    from: 'Cousin Ian',
    gradient: ['#43e97b', '#38f9d7'],
    accent: '#a7f3d0',
    message: `Yo Melissa! 🎉

Happy Birthday!! Okay so I am not the best at writing these things but I am going to try because you deserve it.

You are genuinely the coolest cousin I have. Like, no competition. You are funny, you are kind, you are smart, and somehow you manage to be all of those things at once which is honestly impressive.

I am really grateful to have you in my life. You always know how to make things better and you have always been there when it matters. That means a lot, more than I probably say.

Hope today is absolutely epic — you deserve the best day ever! 🎂🎉`,
    signature: '— Your cousin Ian 🤝💚',
  },
  { id: 'final' },
]

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {[...Array(14)].map((_, i) => (
        <span key={i} className={`petal petal-${i + 1}`} />
      ))}
    </div>
  )
}

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {[...Array(30)].map((_, i) => (
        <span key={i} className={`star star-${i + 1}`} />
      ))}
    </div>
  )
}

function CoverPage({ onNext }) {
  return (
    <div className="page page--cover">
      <div className="cover__deco cover__deco--tl">✦</div>
      <div className="cover__deco cover__deco--tr">✦</div>
      <div className="cover__deco cover__deco--bl">✦</div>
      <div className="cover__deco cover__deco--br">✦</div>
      <div className="cover__inner">
        <p className="cover__tag">✨ A Birthday Card With Love ✨</p>
        <div className="cover__flowers">🌸 🌺 🌸</div>
        <h1 className="cover__name">
          <span>Melissa</span>
          <span>Makori</span>
        </h1>
        <div className="cover__divider">
          <span />
          <span>🎂</span>
          <span />
        </div>
        <p className="cover__hb">Happy Birthday</p>
        <p className="cover__verse">
          May your day be as radiant as your smile,<br />
          as warm as your heart,<br />
          and as magical as you truly are.
        </p>
        <p className="cover__sub">From everyone who loves you dearly 💕</p>
        <button className="cover__btn" onClick={onNext}>
          <span>Open Your Card</span>
          <span className="btn__icon">📖</span>
        </button>
      </div>
      <div className="page__spine" />
    </div>
  )
}

function MessagePage({ page, pageNum, total, onNext, onPrev }) {
  const [c1, c2] = page.gradient
  return (
    <div className="page page--message" style={{ '--c1': c1, '--c2': c2, '--accent': page.accent }}>
      <div className="page__spine" />
      <div className="msg__inner">
        <div className="msg__header">
          <span className="msg__emoji">{page.emoji}</span>
          <div>
            <p className="msg__label">A message from</p>
            <h2 className="msg__from">{page.from}</h2>
          </div>
        </div>
        <div className="msg__body">
          {page.message.split('\n\n').map((para, i) => (
            <p key={i} className={i === 0 ? 'msg__para msg__para--first' : 'msg__para'}>
              {para}
            </p>
          ))}
        </div>
        <p className="msg__sig">{page.signature}</p>
      </div>
      <div className="page__nav">
        <button className="nav__btn nav__btn--prev" onClick={onPrev}>← Prev</button>
        <span className="page__num">{pageNum} / {total}</span>
        <button className="nav__btn nav__btn--next" onClick={onNext}>Next →</button>
      </div>
    </div>
  )
}

function FinalPage({ onPrev, onRestart }) {
  return (
    <div className="page page--final">
      <div className="page__spine" />
      <Stars />
      <div className="final__inner">
        <div className="final__hearts">
          {['💖', '💝', '💗', '💓', '💞'].map((h, i) => (
            <span key={i} className={`final__heart final__heart--${i + 1}`}>{h}</span>
          ))}
        </div>
        <p className="final__tag">✨ With all our love ✨</p>
        <h2 className="final__title">
          Keep shining,<br />
          <span>Melissa</span>
        </h2>
        <div className="final__message">
          <p>
            You are not just loved — you are <em>cherished</em>. Every single person who wrote in this card
            carries a piece of you in their heart, and that will never change.
          </p>
          <p>
            May this year bring you joy that overflows, dreams that come true, and moments so beautiful
            they take your breath away.
          </p>
          <p>
            You are kind. You are brilliant. You are enough — more than enough.
            The world is so much better with you in it. 🌍💕
          </p>
        </div>
        <div className="final__quote">
          <span>"</span>
          She believed she could, so she did.
          <span>"</span>
        </div>
        <p className="final__sign">Happy Birthday, beautiful. 🎂🎉🌸</p>
        <div className="final__btns">
          <button className="nav__btn nav__btn--prev" onClick={onPrev}>← Back</button>
          <button className="final__restart" onClick={onRestart}>Read Again 🔄</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState('next')
  const [animating, setAnimating] = useState(false)

  const total = pages.length

  const go = (dir) => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => (dir === 'next' ? c + 1 : c - 1))
      setAnimating(false)
    }, 420)
  }

  const goNext = () => { if (current < total - 1) go('next') }
  const goPrev = () => { if (current > 0) go('prev') }
  const restart = () => { setDirection('prev'); setCurrent(0) }

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, animating])

  const p = pages[current]

  return (
    <div className="scene">
      <Petals />
      <div
        className={`book-wrap ${animating ? (direction === 'next' ? 'flip-next' : 'flip-prev') : ''}`}
        key={current}
      >
        {p.id === 'cover' && <CoverPage onNext={goNext} />}
        {p.id !== 'cover' && p.id !== 'final' && (
          <MessagePage
            page={p}
            pageNum={current}
            total={total - 2}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
        {p.id === 'final' && <FinalPage onPrev={goPrev} onRestart={restart} />}
      </div>

      {/* Progress dots */}
      <div className="progress" aria-label="Page progress">
        {pages.map((_, i) => (
          <span key={i} className={`dot ${i === current ? 'dot--active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
