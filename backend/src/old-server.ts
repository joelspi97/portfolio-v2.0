// import cors from 'cors';
// import dotenv from 'dotenv';
// import express, { type NextFunction, type Response, type Request } from 'express';
// import nodemailer from 'nodemailer';

// if (process.env.NODE_ENV !== 'production') dotenv.config();

// const REQUIRED_ENV_VARS = ['PORT', 'ALLOWED_ORIGIN', 'EMAIL', 'PASS'] as const;
// type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];
// type Env = Record<RequiredEnvVar, string>;

// type ContactRequest = {
//   userName: string;
//   userSubject: string;
//   userEmail: string;
//   userMessage: string;
// };

// const VALIDATION_ERROR_MESSAGE =
//   'Some of the required information is either missing or malformatted. Please, correct your data and try again.';

// const SERVER_ERROR_MESSAGE =
//   'A server error has occurred. Please, try again later.';

// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// function getEnv(): Env {
//   const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

//   if (missing.length > 0) {
//     throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
//   }

//   return REQUIRED_ENV_VARS.reduce<Env>((env, name) => {
//     env[name] = process.env[name] as string;
//     return env;
//   }, {} as Env);
// }

// function getPort(port: string): number {
//   const parsedPort = Number.parseInt(port, 10);

//   if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
//     throw new Error('PORT must be a number between 1 and 65535');
//   }

//   return parsedPort;
// }

// function isNonEmptyString(value: unknown): value is string {
//   return typeof value === 'string' && value.trim().length > 0;
// }

// function parseContactRequest(body: unknown): ContactRequest | null {
//   if (body === null || typeof body !== 'object') {
//     return null;
//   }

//   const candidate = body as Record<string, unknown>;
//   const { userName, userSubject, userEmail, userMessage } = candidate;

//   if (
//     !isNonEmptyString(userName) ||
//     !isNonEmptyString(userSubject) ||
//     !isNonEmptyString(userEmail) ||
//     !isNonEmptyString(userMessage) ||
//     !EMAIL_REGEX.test(userEmail)
//   ) {
//     return null;
//   }

//   return {
//     userName: userName.trim(),
//     userSubject: userSubject.trim(),
//     userEmail: userEmail.trim(),
//     userMessage: userMessage.trim(),
//   };
// }

// const env = getEnv();
// const port = getPort(env.PORT);
// const app = express();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: env.EMAIL,
//     pass: env.PASS,
//   },
// });

// app.use(cors({ origin: env.ALLOWED_ORIGIN }));
// app.use(express.json({ limit: '25kb' }));

// app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
//   if (error instanceof SyntaxError) {
//     res.status(400).json({ errorMessage: VALIDATION_ERROR_MESSAGE });
//     return;
//   }

//   next(error);
// });

// app.post('/', async (req: Request, res: Response) => {
//   const contactRequest = parseContactRequest(req.body);

//   if (contactRequest === null) {
//     res.status(400).json({ errorMessage: VALIDATION_ERROR_MESSAGE });
//     return;
//   }

//   try {
//     await transporter.sendMail({
//       to: env.EMAIL,
//       subject: `Message from ${contactRequest.userName}: ${contactRequest.userSubject}`,
//       text: `
// Sender's email: ${contactRequest.userEmail}
// Message: ${contactRequest.userMessage}
// `,
//     });

//     res.status(200).json({});
    
//   } catch (error) {
//     console.error('Failed to send contact email', error);
//     res.status(500).json({ errorMessage: SERVER_ERROR_MESSAGE });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
