const passwordResetEmail = (name, resetLink) => {
  return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset Request</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }

        .highlight {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <a href="https://arena-electro.myshopify.com/"><img class="logo"
					src="https://res.cloudinary.com/dnam4lior/image/upload/v1743596489/electro_fw587i.png" alt="Electro Logo"></a>
        <div class="message">Reset Your Password</div>
        <div class="body">
            <p>Dear ${name},</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a class="cta" href= ${resetLink}>Reset Password</a>
            <p>This link is valid for only 15 minutes. If you did not request this, please ignore this email or contact support.</p>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:electro.internship@gmail.com">electro.internship@gmail.com</a>. We are here to help!</div>
          </div>
    </div>
</body>

</html>
  `;
};

module.exports = passwordResetEmail;
