export function genrateOTP(){
    return Math.floor(100000+Math.random()*900000).toString();
}

export function getOtpHtml(otp) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:#4f46e5; padding:24px 32px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">Lume</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="color:#111827; font-size:20px; margin:0 0 12px 0;">Verify Your Email</h2>
                <p style="color:#4b5563; font-size:15px; line-height:1.6;">
                  Use the OTP below to complete your verification. Valid for <strong>10 minutes</strong>.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:16px 0;">
                      <div style="display:inline-block; background-color:#f3f4f6; border:1px dashed #4f46e5; border-radius:8px; padding:16px 40px;">
                        <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#4f46e5;">${otp}</span>
                      </div>
                    </td>
                  </tr>
                </table>
                <p style="color:#6b7280; font-size:13px; margin-top:24px;">
                 If you did not request this, please ignore this email. Do not share this OTP with anyone.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}