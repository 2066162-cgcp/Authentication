export const EMAIL_VERIFY_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f2f2; font-family:Arial, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color:#4a3f94; padding:20px; text-align:center; color:#fff;">
        <h1 style="margin:0; font-size:24px;">Verify Your Email</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px; text-align:center;">
        <h2 style="font-weight:bold; color:#4a3f94;">Hi {{email}},</h2>
        <p style="font-size:16px; color:#333;">
          Thank you for signing up! Please use the code below to verify your email address:
        </p>
        <p style="font-size:32px; font-weight:bold; color:#4a3f94; margin:20px 0;">
          {{otp}}
        </p>
        <p style="font-size:14px; color:#666;">
          This code will expire in 24 hours. If you did not request this, please ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px; text-align:center; font-size:12px; color:#999;">
        &copy; 2025 Your Company. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`


export const RESET_PASSWORD_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="padding: 20px; background: linear-gradient(to right, #0f1739, rgb(39, 9, 70)); text-align: center; color: #ffffff;">
        <h2>Password Reset OTP</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; color: #333333;">
        <p>Hi <strong>{{email}}</strong>,</p>
        <p>You have requested to reset your password. Please use the OTP below to proceed:</p>
        <p style="font-size: 24px; font-weight: bold; text-align: center; color: #0f1739; background-color: #f1f1f1; padding: 10px; border-radius: 4px;">
          {{otp}}
        </p>
        <p>This OTP is valid for the next <strong>15 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email or contact support.</p>
        <br/>
        <p style="font-size: 12px; color: #999999;">Thank you,<br/>Your App Team</p>
      </td>
    </tr>
  </table>
</body>
</html>
`