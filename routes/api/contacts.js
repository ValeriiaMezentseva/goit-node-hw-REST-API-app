const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares'); 
const { contactSchema, updateSchema } = require('../../schemas'); 
const { contacts: ctrl } = require('../../controllers');


const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll)); 

router.get('/:contactId', ctrlWrapper(ctrl.getById)); 

router.post('/', validation(contactSchema), ctrlWrapper(ctrl.add)); 

router.put('/:contactId', validation(updateSchema), ctrlWrapper(ctrl.updateById)); 

router.delete('/:contactId', ctrlWrapper(ctrl.removeById)); 

module.exports = router; 
