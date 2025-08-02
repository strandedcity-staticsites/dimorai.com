/**
 * Cloudflare Worker for handling Dimorai contact form submissions
 * Sends email notifications via Resend API
 */

export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Allow': 'POST',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    try {
      // Parse form data
      const formData = await request.formData();
      
      // Extract form fields
      const data = {
        firstName: formData.get('firstName')?.trim() || '',
        lastName: formData.get('lastName')?.trim() || '',
        email: formData.get('email')?.trim() || '',
        company: formData.get('company')?.trim() || 'Not provided',
        unitsManaged: formData.get('unitsManaged') || 'Not specified',
        message: formData.get('message')?.trim() || 'No message provided',
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('User-Agent') || '',
        ip: request.headers.get('CF-Connecting-IP') || 'Unknown'
      };

      // Basic validation
      if (!data.firstName || !data.lastName || !data.email) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: firstName, lastName, email' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid email address' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Send email notification
      await sendEmailNotification(data, env);

      // Return success response
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (error) {
      console.error('Form processing error:', error);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

/**
 * Send email notification using Resend API
 */
async function sendEmailNotification(data, env) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Dimorai Contact Form Submission</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8b4513 0%, #654321 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #8b4513; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #8b4513; }
        .highlight { background: #fff5e9; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🎯 New ROI Analysis Request</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone wants to learn about Dimorai!</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <strong>📊 Lead Quality: ${getLeadQuality(data)}</strong>
            <br>
            <small>Based on company info and units managed</small>
          </div>
          
          <div class="field">
            <span class="label">👤 Contact Information</span>
            <div class="value">
              <strong>${data.firstName} ${data.lastName}</strong><br>
              📧 ${data.email}<br>
              🏢 ${data.company}
            </div>
          </div>
          
          <div class="field">
            <span class="label">🏗️ Portfolio Size</span>
            <div class="value">${data.unitsManaged}</div>
          </div>
          
          <div class="field">
            <span class="label">💬 Their Challenges</span>
            <div class="value">${data.message}</div>
          </div>
          
          <div class="field">
            <span class="label">🕐 Submitted</span>
            <div class="value">${new Date(data.timestamp).toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}</div>
          </div>
          
          <div class="field">
            <span class="label">🔍 Technical Details</span>
            <div class="value">
              IP: ${data.ip}<br>
              User Agent: ${data.userAgent}
            </div>
          </div>
          
          <div class="footer">
            <p>This email was generated automatically by your Dimorai contact form.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const emailText = `
New Dimorai Contact Form Submission

Contact: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
Units Managed: ${data.unitsManaged}

Message:
${data.message}

Submitted: ${new Date(data.timestamp).toLocaleString()}
IP: ${data.ip}
  `;

  const emailPayload = {
    from: 'Dimorai Contact Form <noreply@dimorai.com>',
    to: [env.NOTIFICATION_EMAIL || 'philrseaton@gmail.com'],
    subject: `🎯 New ROI Analysis Request from ${data.firstName} ${data.lastName} (${data.company})`,
    html: emailHtml,
    text: emailText,
    headers: {
      'X-Priority': data.unitsManaged.includes('1000+') ? '1' : '3'
    }
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Resend API error:', response.status, errorData);
    throw new Error(`Failed to send email: ${response.status}`);
  }

  const result = await response.json();
  console.log('Email sent successfully:', result.id);
  
  return result;
}

/**
 * Determine lead quality based on form data
 */
function getLeadQuality(data) {
  let score = 0;
  
  // Company name provided
  if (data.company !== 'Not provided') score += 1;
  
  // Units managed indicates serious prospect
  if (data.unitsManaged.includes('500+') || data.unitsManaged.includes('1000+')) {
    score += 3;
  } else if (data.unitsManaged.includes('201-500')) {
    score += 2;
  } else if (data.unitsManaged.includes('51-200')) {
    score += 1;
  }
  
  // Detailed message shows engagement
  if (data.message.length > 50) score += 1;
  
  // Professional email domain
  if (!data.email.includes('gmail.com') && !data.email.includes('yahoo.com') && !data.email.includes('hotmail.com')) {
    score += 1;
  }
  
  if (score >= 4) return '🔥 HIGH QUALITY';
  if (score >= 2) return '⭐ MEDIUM QUALITY';
  return '📝 BASIC INQUIRY';
}