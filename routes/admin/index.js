const express = require('express');
const authRoutes = require('./authRoutes');
const permissionRoutes = require('./permissionRoutes');
const testRoutes = require('./testRoutes');
const userRoutes = require('./userRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/permission', permissionRoutes);
router.use('/user', userRoutes);
router.use('/test', testRoutes);

module.exports = router;
