let googleSheet = require('../spreadsheet');

const getRegisters = async (req, res, next) => {
  try {
    const registers = await googleSheet.getRegisters();
    res.render('index', {registers});
  } catch (error) {
    next(error);
  }
}

const renderForm = (req, res) => {
  res.render('form', {});
}

const saveRegister = async (req, res, next) => {
  try {
    await googleSheet.saveRegister(req.body);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRegisters: getRegisters,
  renderForm: renderForm,
  saveRegister: saveRegister
}
