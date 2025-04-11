exports.contactUsConfirmation = (name) => {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Contact Form Submission Received</title>
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
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <a href="https://arena-electro.myshopify.com/"><img class="logo"
					src="https://res.cloudinary.com/dnam4lior/image/upload/v1743596489/electro_fw587i.png" alt="Electro Logo"></a>
              <div class="message">Thank You for Contacting Us!</div>
              <div class="body">
                  <p>Dear ${name},</p>
                  <p>We have received your message and our support team will get back to you as soon as possible.</p>
                  <p>We appreciate your patience and will get back to you shortly.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:electro.internship@gmail.com">electro.internship@gmail.com</a>. We are here to help!</div>
		</div>
              </div>
          </div>
      </body>
      </html>`;
};
