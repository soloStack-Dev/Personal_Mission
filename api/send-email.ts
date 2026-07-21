import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, title, subject, message, subscriberEmail } = req.body

  try {
    if (type === 'subscribe') {
      if (!subscriberEmail) {
        return res.status(400).json({ error: 'Email is required' })
      }

      await resend.emails.send({
        from: 'Portfolio Notifications <onboarding@resend.dev>',
        to: 'faleelmr4@gmail.com',
        subject: 'New Subscriber',
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${subscriberEmail}</p>
          <p>This person subscribed to your portfolio updates.</p>
        `,
      })

      return res.status(200).json({ success: true, message: 'Subscribed successfully' })
    }

    if (type === 'contact') {
      if (!title || !subject || !message) {
        return res.status(400).json({ error: 'Title, subject, and message are required' })
      }

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'faleelmr4@gmail.com',
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

    return res.status(400).json({ error: 'Invalid type. Use "contact" or "subscribe".' })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
