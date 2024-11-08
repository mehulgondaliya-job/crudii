const express = require('express');
const router = express.Router();
// const adminRoutes = require('./admin/index');
const webRoutes = require('./web/index');

// router.use('/admin', adminRoutes);
router.use('/web', webRoutes);

module.exports = router;
