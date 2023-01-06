const router = require('express').Router();
const {
  updateUser,
  getMe,
} = require('../controllers/users');
const {
  bodyMe,
} = require('../validators/user');

router.patch('/me', bodyMe, updateUser);
router.get('/me', getMe);

module.exports = router;
