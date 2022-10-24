let googleSheet = require('../spreadsheet');

const getRegisters = async (req, res) => {
  registers = await googleSheet.getRegisters();
  res.render('index', {registers});
}

const renderForm = (req, res) => {
  res.render('form', {});
}

const saveRegister = async (req, res) => {
  await googleSheet.saveRegister(req.body);
  res.redirect('/');
}

module.exports = {
  getRegisters: getRegisters,
  renderForm: renderForm,
  saveRegister: saveRegister
}