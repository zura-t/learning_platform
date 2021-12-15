// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import xoauth2 from 'xoauth2'

// @Injectable()
// export class MailService {
//   private transporter;
//   constructor() {
//     this.transporter = nodemailer.createTransport('SMTP', {
//       host: process.env.SMTP_HOST,
//       service: 'gmail',
//       secure: true,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
//   }

//   async sendActivationMail(to) {
//     const rand = Math.floor(Math.random() * 100 + 54);
//     const host = process.env.SMTP_HOST;
//     const link = 'http://' + host + '/verify?id=' + rand;
//     const mailOptions = {
//       to,
//       subject: 'Please confirm your Email account',
//       html:
//         'Hello,<br> Please Click on the link to verify your email.<br><a href=' +
//         link +
//         '>Click here to verify</a>',
//     };

//     this.transporter.sendMail(mailOptions, function (error, response) {
//       if (error) {
//         console.log(error);
//         response.end('error');
//       } else {
//         console.log('Message sent: ' + response.message);
//         response.end('sent');
//       }
//     });
//   }
// }