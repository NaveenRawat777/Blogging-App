export const recieveOtpTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#edf2ff;
    font-family:Arial,Helvetica,sans-serif;
    padding:30px 15px;
}

.container{
    width:100%;
    max-width:600px;
    margin:0 auto;
}

.card{
    background:#ffffff;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 20px 45px rgba(0,0,0,.08);
}

.header{
    background:linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed);
    padding:45px 30px;
    text-align:center;
    color:#ffffff;
}

.logo{
    width:70px;
    height:70px;
    margin:auto;
    border-radius:50%;
    background:rgba(255,255,255,.18);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:34px;
    margin-bottom:18px;
}

.header h1{
    font-size:32px;
    margin-bottom:10px;
}

.header p{
    font-size:15px;
    opacity:.9;
}

.content{
    padding:40px;
}

.content h2{
    color:#1f2937;
    margin-bottom:18px;
    font-size:28px;
}

.content p{
    color:#555;
    line-height:28px;
    font-size:16px;
}

.otp{
    margin:35px auto;
    background:#eef4ff;
    border:2px dashed #2563eb;
    border-radius:15px;
    text-align:center;
    padding:18px;
    font-size:40px;
    font-weight:bold;
    color:#2563eb;
    letter-spacing:12px;
}

.note{
    margin-top:30px;
    background:#f8fafc;
    border-left:5px solid #2563eb;
    padding:18px;
    border-radius:10px;
    color:#555;
    line-height:26px;
}

.warning{
    margin-top:20px;
    background:#fff8e6;
    border-left:5px solid #f59e0b;
    padding:18px;
    border-radius:10px;
    color:#8a5a00;
    line-height:26px;
}

.button{
    display:block;
    width:220px;
    margin:35px auto 0;
    text-align:center;
    background:#2563eb;
    color:#ffffff;
    text-decoration:none;
    padding:16px;
    border-radius:10px;
    font-weight:bold;
    font-size:16px;
}

.footer{
    background:#f8fafc;
    padding:30px;
    text-align:center;
    color:#777;
    font-size:14px;
    border-top:1px solid #eeeeee;
    line-height:24px;
}

.footer a{
    color:#2563eb;
    text-decoration:none;
}

@media screen and (max-width:600px){

.header{
    padding:35px 20px;
}

.header h1{
    font-size:26px;
}

.content{
    padding:25px;
}

.content h2{
    font-size:22px;
}

.content p{
    font-size:15px;
}

.otp{
    font-size:30px;
    letter-spacing:8px;
}

.button{
    width:100%;
}

.logo{
    width:60px;
    height:60px;
    font-size:28px;
}
}
</style>

</head>

<body>

<div class="container">

<div class="card">

<div class="header">

<div class="logo">
🔒
</div>

<h1>OTP Verification</h1>

<p>Secure Login Authentication</p>

</div>

<div class="content">

<h2>Hello,</h2>

<p>
We received a request to verify your account.
Please use the One-Time Password (OTP) below to complete your verification.
This code is valid for <strong>5 minutes</strong>.
</p>


<div class="otp">
123456
</div>

<p style="text-align:center;">
Replace <strong>123456</strong> with your dynamic OTP before sending the email.
</p>

<div class="note">
<strong>Security Notice</strong><br>
Never share your OTP with anyone. Our support team will never ask for your verification code.
</div>

<div class="warning">
<strong>Didn't request this?</strong><br>
If you did not request this verification, you can safely ignore this email. Your account remains secure.
</div>

<a href="#" class="button">Verify Account</a>

</div>

<div class="footer">

<strong>Your Company</strong><br><br>

This is an automated email. Please do not reply to this message.<br><br>

Need help? Contact <a href="#">support@yourcompany.com</a><br><br>

© 2026 Your Company. All Rights Reserved.

</div>

</div>

</div>

</body>
</html>`
// {OTP_CODE}


export const passwordResetTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset OTP</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#edf2ff;
    font-family:Arial,Helvetica,sans-serif;
    padding:30px 15px;
}

.container{
    width:100%;
    max-width:600px;
    margin:0 auto;
}

.card{
    background:#ffffff;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 20px 45px rgba(0,0,0,.08);
}

.header{
    background:linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed);
    padding:45px 30px;
    text-align:center;
    color:#ffffff;
}

.logo{
    width:70px;
    height:70px;
    margin:auto;
    border-radius:50%;
    background:rgba(255,255,255,.18);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:34px;
    margin-bottom:18px;
}

.header h1{
    font-size:32px;
    margin-bottom:10px;
}

.header p{
    font-size:15px;
    opacity:.9;
}

.content{
    padding:40px;
}

.content h2{
    color:#1f2937;
    margin-bottom:18px;
    font-size:28px;
}

.content p{
    color:#555;
    line-height:28px;
    font-size:16px;
}

.otp{
    margin:35px auto;
    background:#eef4ff;
    border:2px dashed #2563eb;
    border-radius:15px;
    text-align:center;
    padding:18px;
    font-size:40px;
    font-weight:bold;
    color:#2563eb;
    letter-spacing:12px;
}

.note{
    margin-top:30px;
    background:#f8fafc;
    border-left:5px solid #2563eb;
    padding:18px;
    border-radius:10px;
    color:#555;
    line-height:26px;
}

.warning{
    margin-top:20px;
    background:#fff8e6;
    border-left:5px solid #f59e0b;
    padding:18px;
    border-radius:10px;
    color:#8a5a00;
    line-height:26px;
}

.button{
    display:block;
    width:220px;
    margin:35px auto 0;
    text-align:center;
    background:#2563eb;
    color:#ffffff;
    text-decoration:none;
    padding:16px;
    border-radius:10px;
    font-weight:bold;
    font-size:16px;
}

.footer{
    background:#f8fafc;
    padding:30px;
    text-align:center;
    color:#777;
    font-size:14px;
    border-top:1px solid #eeeeee;
    line-height:24px;
}

.footer a{
    color:#2563eb;
    text-decoration:none;
}

@media screen and (max-width:600px){

.header{
    padding:35px 20px;
}

.header h1{
    font-size:26px;
}

.content{
    padding:25px;
}

.content h2{
    font-size:22px;
}

.content p{
    font-size:15px;
}

.otp{
    font-size:30px;
    letter-spacing:8px;
}

.button{
    width:100%;
}

.logo{
    width:70px;
    height:70px;
    font-size:28px;
}
}
</style>

</head>

<body>

<div class="container">

<div class="card">

<div class="header">

<div class="logo">
🔒
</div>

<h1>Password Reset</h1>

<p>Secure Password Recovery</p>

</div>

<div class="content">

<h2>Hello,</h2>

<p>
We received a request to reset the password for your account.
Please use the One-Time Password (OTP) below to verify your identity
and continue with the password reset process.
This code is valid for <strong>5 minutes</strong>.
</p>

<div class="otp">
123456
</div>

<p style="text-align:center;">
Use the OTP above to reset your account password.
</p>

<div class="note">
<strong>Security Notice</strong><br>
Never share this OTP with anyone. Our support team will never ask for your password reset verification code.
</div>

<div class="warning">
<strong>Didn't request a password reset?</strong><br>
If you did not request to reset your password, you can safely ignore this email.
Your password will remain unchanged and your account remains secure.
</div>

<a href="#" class="button">Reset Password</a>

</div>

<div class="footer">

<strong>Your Company</strong><br><br>

This is an automated email. Please do not reply to this message.<br><br>

Need help? Contact <a href="#">support@yourcompany.com</a><br><br>

© 2026 Your Company. All Rights Reserved.

</div>

</div>

</div>

</body>
</html>`
