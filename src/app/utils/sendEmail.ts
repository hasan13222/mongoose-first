import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'Production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'jamil8305@gmail.com',
      pass: 'fivl wbsa bisk madv',
    },
  });

  await transporter.sendMail({
    from: 'jamil8305@gmail.com', // sender address
    to: 'marzia8305@gmail.com', // list of receivers
    subject: 'Password Change Email', // Subject line
    text: 'Password change text', // plain text body
    html: `<p>Password Change link ${resetLink}</p>`, // html body
  });
};
