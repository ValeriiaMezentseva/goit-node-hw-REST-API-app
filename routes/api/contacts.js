const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares'); 
const { contactSchema } = require('../../schemas'); 
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema); 

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll)); 

router.get('/:contactId', ctrlWrapper(ctrl.getById)); 

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add)); 

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById)); 

router.delete('/:contactId', ctrlWrapper(ctrl.removeById)); 

module.exports = router; 
