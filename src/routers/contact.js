import { Router } from 'express';

import * as contacsController from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contacsController.getContactsController));

contactsRouter.get(
  '/:id',
  ctrlWrapper(contacsController.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(contacsController.addContactController));

contactsRouter.patch(
  '/:id',
  ctrlWrapper(contacsController.patchContactController),
);

contactsRouter.delete(
  '/:id',
  ctrlWrapper(contacsController.deleteContactController),
);

export default contactsRouter;
