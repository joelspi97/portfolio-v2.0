import { Resend } from 'resend';
import { Router } from 'express';

export const mailRouter: Router = Router();

mailRouter.post('/', (_req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'joelspi97@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });

  res.json({
    status: 'ok'
  });
});
