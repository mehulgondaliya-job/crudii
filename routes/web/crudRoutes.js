const express = require('express');
const router = express.Router();
const crudController = require('../../controllers/web/crudController');

router.post('/create', crudController.createUser);

router.put('/update/:id', crudController.updateUser);

router.delete('/delete/:id', crudController.deleteUser);

router.get('/:id', crudController.getUser);

module.exports = router;
