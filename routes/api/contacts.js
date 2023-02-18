const express = require('express');

const { validation, ctrlWrapper, isValidId, authenticate} = require('../../middlewares'); 
const { addSchema, updateSchema, updateFavoriteSchema } = require('../../models'); 
const { contacts: ctrl } = require('../../controllers');


const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.getAll)); 

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById)); 

router.post('/', authenticate, validation(addSchema), ctrlWrapper(ctrl.add)); 

router.put('/:contactId', isValidId, validation(updateSchema), ctrlWrapper(ctrl.updateById)); 

router.patch('/:contactId/favorite', isValidId, validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite)); 

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById)); 

module.exports = router; 
