import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

/**
 * Serverless email handler (Vercel function at /api/send-email).
 *
 * The client sends one of two payload types:
 *   { type: 'subscribe', subscriberEmail: string }  → newsletter signup
 *   { type: 'contact',   title, subject, message }  → contact form
 *
 * Both are forwarded to the site owner's inbox via the Resend API.
 * The API key lives in .env on the server only — never in the client.
 */
const resend = new Resend(process.env.RESEND_EMAIL_API_KEY)

/** Address every notification is delivered to. */
const OWNER_EMAIL = 'faleelmr4@gmail.com'

/** Shared "from" address used by the free Resend dev tier. */
const FROM_EMAIL = 'Portfolio Notifications <onboarding@resend.dev>'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers — allow the SPA origin to call this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Answer preflight requests immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only POST is allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, title, subject, message, subscriberEmail } = req.body

  try {
    // ---- Newsletter subscription ----
    if (type === 'subscribe') {
      if (!subscriberEmail) {
        return res.status(400).json({ error: 'Email is required' })
      }

      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: 'New Subscriber',
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${subscriberEmail}</p>
          <p>This person subscribed to your portfolio updates.</p>
        `,
      })

      return res.status(200).json({ success: true, message: 'Subscribed successfully' })
    }

    // ---- Contact form message ----
    if (type === 'contact') {
      if (!title || !subject || !message) {
        return res.status(400).json({ error: 'Title, subject, and message are required' })
      }

      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `[Portfolio] ${subject}`,
        html: `
          <h2>New Message from Portfolio</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      })

      return res.status(200).json({ success: true, message: 'Message sent successfully' })
    }

    // Unknown request type
    return res.status(400).json({ error: 'Invalid type. Use "contact" or "subscribe".' })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
