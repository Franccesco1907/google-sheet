const {GoogleSpreadsheet} = require ('google-spreadsheet');

const credentials = require('./json/credenciales.json');

let googleId = "1n4TQ7_kLOhM0sVOH1C-GlX2VyCGnqktU16sGjMt38R4";

async function getRegisters() {
  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];

  const record = await sheet.getRows();
  return record;
}

async function saveRegister(record) {
  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();
  const sheet = document.sheetsByIndex[0];
  await sheet.addRow(record);
  console.log(record)
}

module.exports = {
  getRegisters: getRegisters,
  saveRegister: saveRegister
}