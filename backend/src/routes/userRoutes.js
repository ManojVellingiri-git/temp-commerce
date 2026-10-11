const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById);

module.exports = router;
