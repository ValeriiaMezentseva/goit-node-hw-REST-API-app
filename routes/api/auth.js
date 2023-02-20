const express = require('express');

const { validation, authenticate, ctrlWrapper } = require('../../middlewares'); 
const { auth: ctrl } = require('../../controllers');
const { authSchema, updateSubscriptionSchema } = require('../../models');

const router = express.Router(); 

router.post('/register', validation(authSchema), ctrlWrapper(ctrl.register)); 

router.post('/login', validation(authSchema), ctrlWrapper(ctrl.login)); 

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent)); 

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout)); 

router.patch('/', authenticate, validation(updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router; 