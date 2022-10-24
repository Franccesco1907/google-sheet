const {Router} = require('express');
const router = Router();

const {
  getRegisters,
  renderForm,
  saveRegister
} = require('../controllers/google.controller');

router.get('/', getRegisters);
router.get('/form', renderForm);
router.post('/form', saveRegister);

module.exports = router;