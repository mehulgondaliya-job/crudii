const express = require('express');
// const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');
const crudRoutes = require('./crudRoutes');
const router = express.Router();

// router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
router.use('/crud', crudRoutes);

module.exports = router;
