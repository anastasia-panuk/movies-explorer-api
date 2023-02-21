const router = require('express').Router();
const {
  updateUser,
  getMe,
} = require('../controllers/users');
const {
  bodyMe,
} = require('../validators/user');

router.get('/me', getMe);
router.patch('/me', bodyMe, updateUser);

module.exports = router;
