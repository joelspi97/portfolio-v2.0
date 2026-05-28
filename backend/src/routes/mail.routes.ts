import { Router, type Request, type Response } from 'express';

import type { IPostMailRequestDto, IPostMailErrorResponseDto } from '../models/postMail.dto.js';
import { sendContactEmail } from '../services/mail.service.js';
import { validatePostMailRequestBody } from '../validators/postMail.validator.js';

export const mailRouter: Router = Router();

mailRouter.post('/', (
  request: Request<{}, {}, IPostMailRequestDto>, 
  response: Response<IPostMailErrorResponseDto>
): void => {
  const errorMessages = validatePostMailRequestBody(request.body);

  if (errorMessages.length) {
    response.status(400).json({ errors: errorMessages });
    return;
  }

  sendContactEmail(request.body);
  response.sendStatus(204);
});
