import { createClient } from '@/lib/supabase/client';

// Main OTP sending function that works with EmailJS
export const sendOTP = async (email) => {
  try {
    console.log('Starting OTP send for:', email);
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);
    
    // Import and initialize EmailJS
    const emailjs = (await import('@emailjs/browser')).default;
    emailjs.init('SSiDe-gmzX0d5aZDw');
    console.log('EmailJS initialized');
    
    // Template parameters that work
    const templateParams = {
      user_email: email,
      reply_to: email,
      otp_code: otp,
      user_name: email.split('@')[0],
      from_name: 'Nambikkai News',
      message: `Your OTP verification code for Nambikkai News is: ${otp}. This code will expire in 10 minutes.`
    };
    
    console.log('Sending email with params:', templateParams);
    
    // Send email first
    const result = await emailjs.send(
      'service_32jvcge',
      'template_mbnhozi',
      templateParams,
      'SSiDe-gmzX0d5aZDw'
    );
    
    console.log('EmailJS send result:', result);
    
    // Store OTP in database after successful email send
    const supabase = createClient();
    const { error } = await supabase
      .from('otp_verifications')
      .insert({
        email: email,
        otp_code: otp,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      });
    
    if (error) {
      console.error('Database error:', error);
      // Don't throw error - email was sent successfully
    }
    
    console.log('OTP process completed successfully');
    return { success: true, message: 'OTP sent successfully' };
    
  } catch (error) {
    console.error('Complete error details:', error);
    return { success: false, error: error.message || error.text, details: error };
  }
};

// Verify OTP function
export const verifyOTP = async (email, otp) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('verify_otp', {
      email_input: email,
      otp_input: otp
    });

    if (error) throw error;
    return { success: data, verified: data };
  } catch (error) {
    console.error('OTP verification error:', error);
    return { success: false, error: error.message };
  }
};