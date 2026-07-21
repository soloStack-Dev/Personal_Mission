import { useState } from 'react'
import { useStore } from '../store/useStore'

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useStore()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  if (!isContactModalOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !subject.trim() || !message.trim()) return

    setStatus('sending')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', title, subject, message }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setTitle('')
      setSubject('')
      setMessage('')
      setTimeout(() => {
        setStatus('idle')
        closeContactModal()
      }, 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#111111',
    border: '1px solid #222222',
    color: 'var(--text-primary)',
    padding: '14px 16px',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <div
      onClick={closeContactModal}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          width: '100%',
          maxWidth: '480px',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}>
            Send a Message
          </h2>
          <button
            onClick={closeContactModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 0',
          }}>
            <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
              Message Sent
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Thank you! I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Project Inquiry"
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#444')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#222')}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Collaboration Opportunity"
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#444')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#222')}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '120px',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#444')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#222')}
              />
            </div>

            {status === 'error' && (
              <p style={{ fontSize: '12px', color: '#ff4444' }}>
                Failed to send. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--text-primary)',
                color: 'var(--text-inverse)',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '1' }}
            >
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
