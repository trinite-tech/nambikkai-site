import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nambikkai News <noreply@nambikkainews.com>',
      to: [email],
      subject: 'Your OTP Code - Nambikkai News',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Your OTP Code - Nambikkai News</h2>
          <p>Welcome to Nambikkai News! Use the following OTP code to verify your account:</p>
          
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #333; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          
          <p><strong>This OTP will expire in 10 minutes.</strong></p>
          <p>If you didn't request this code, please ignore this email.</p>
          
          <p>Best regards,<br>
          Nambikkai News Team</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}