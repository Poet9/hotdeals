"use server";
import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";
// function to generate body for the email
export const generateEmailBody = async (
  product: EmailProductInfo,
  type: NotificationType | null
) => {
  if (!type) return;
  const THRESHOLD_PERCENTAGE = -40;
  let subject,
    body: string = "";
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;
  switch (type) {
    case "WELCOME":
      subject = `Welcome to hotdeals`;
      body = `
            <div>
              <h1>You are tracking ${product.title}</h1>
              <h2>Welcome to Hotdeals</h2>
              <p>You are now tracking ${product.title}.</p>
              <p>Here's an example of how you'll receive updates:</p>
              <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
                <h3>${product.title} is back in stock!</h3>
                <p>We're excited to let you know that ${product.title} is now back in stock.</p>
                <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
              </div>
              <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
            </div>
          `;
      break;

    case "CHANGE_OF_STOCK":
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
            <div>
              <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
              <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
          `;
      break;

    case "LOWEST_PRICE":
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
            <div>
              <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
              <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
            </div>
          `;
      break;

    case "THRESHOLD_MET":
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
            <div>
              <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
              <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
          `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }
  return { subject, body };
};

const transporter = nodemailer.createTransport({
    pool: true,
    service: "hotmail",
    port: 2525,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 1,
});

export const sendEmail = async (emailContent: EmailContent, users: string[] = []) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: users,
        html: emailContent.body,
        subject: emailContent.subject,
    };
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) return console.log({ error: err });
        console.log(`Email sent (check you spam) `);
    });
};
