import { useState } from 'react'
import { useStore } from '../store/useStore'

/**
 * Form status — the modal shows a different UI for each phase:
 *  idle    → the empty form
 *  sending → submit button disabled ("SENDING...")
 *  success → confirmation screen before auto-closing
 *  error   → inline error message
 */
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

/** Shared input/textarea look (monochrome, minimal). */
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

/** Turn the input border lighter on focus, back to normal on blur. */
const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = '#444'),
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = '#222'),
}

/** Form field label (small uppercase caption). */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: '8px',
      }}
    >
      {children}
    </label>
  )
}

/**
 * ContactModal — global overlay form that emails the site owner.
 *
 * Flow: user fills Title / Subject / Message → POST /api/send-email →
 * on success show a thank-you screen and auto-close after 2s.
 */
export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useStore()

  // Form state
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  // Render nothing at all until the modal is opened from the store
  if (!isContactModalOpen) return null

  /** Validate + send the message to the serverless email endpoint. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation: every field must be filled
    if (!title.trim() || !subject.trim() || !message.trim()) return

    setStatus('sending')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', title, subject, message }),
      })
      if (!res.ok) throw new Error('Request failed')

      // Success: show the thank-you screen, then close the modal
      setStatus('success')
      setTitle('')
      setSubject('')
      setMessage('')
      setTimeout(() => {
        setStatus('idle')
        closeContactModal()
      }, 2000)
    } catch {
      // Failure: show an inline error, allow retrying after 3s
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    /* Backdrop — clicking outside the card closes the modal */
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
      {/* Card — stop clicks so the backdrop handler does not fire */}
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
        {/* Header: title + close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' }}>Send a Message</h2>
          <button
            onClick={closeContactModal}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
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
          >
            ✕
          </button>
        </div>

        {/* After a successful send, show a thank-you instead of the form */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Message Sent</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Thank you! I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label>Title</Label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Project Inquiry"
                required
                style={inputStyle}
                {...focusHandlers}
              />
            </div>

            <div>
              <Label>Subject</Label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Collaboration Opportunity"
                required
                style={inputStyle}
                {...focusHandlers}
              />
            </div>

            <div>
              <Label>Message</Label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                {...focusHandlers}
              />
            </div>

            {/* Inline error message on failure */}
            {status === 'error' && (
              <p style={{ fontSize: '12px', color: '#ff4444' }}>Failed to send. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              onMouseEnter={(e) => {
                if (status !== 'sending') e.currentTarget.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                if (status !== 'sending') e.currentTarget.style.opacity = '1'
              }}
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
            >
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
