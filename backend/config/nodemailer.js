import nodemailer from "nodemailer";

// Function to send an email
export const sendEmail = async (options) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com", // Yah host set karta hai jo ki Gmail ka SMTP server hai. SMTP (Simple Mail Transfer Protocol) email bhejne ke liye use hota hai.
      port: 465, // Yah port set karta hai jo ki 465 hai, jo secure email communication ke liye use hota hai.
      secure: true, // Yah specify karta hai ki secure connection (SSL/TLS) use hoga.
      auth: {
        type: "OAuth2", // Yah authentication ke type ko specify karta hai, jo ki OAuth2 hai. OAuth2 ek secure authorization method hai.
        user: process.env.SMTP_USER,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
      },
    });

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
