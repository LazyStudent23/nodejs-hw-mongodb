import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';

import * as contacsController from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { contactAddSchema, contactUpdateSchema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contacsController.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contacsController.getContactByIdController),
);

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(contacsController.addContactController));

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contacsController.patchContactController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contacsController.deleteContactController),
);

export default contactsRouter;
