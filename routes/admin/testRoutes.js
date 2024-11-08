const express = require('express');
const router = express.Router();
const testController = require('../../controllers/admin/testController');
const protect = require('../../middleware/protect');
const checkPermission = require('../../middleware/checkPermission');

router.post('/addQueue', protect, checkPermission, testController.addQueue).descriptor('admin.queue.add');

module.exports = router;
