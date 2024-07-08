import nodemailer from 'nodemailer';
interface SendEmailProps {
  message: string;
  subject: string;
  to: string[];
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PW,
  },
});

export const SendEmail = async (props: SendEmailProps) => {
  try {
    const info = await transporter.sendMail({
      from: `Chat Dev ${process.env.SMTP_EMAIL}`,
      to: props.to,
      subject: props.subject,
      text: `${props.subject}`,
      html: props.message,
    });
    console.log('Message sent: %s', info.messageId);
    return info.messageId;
  } catch (error) {
    console.log('Node Mailer', error.message);
    throw new Error();
  }
};
