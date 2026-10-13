const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function main() {
  let failure;
  const rows = [{ name: 'Test' }];
  const context = { module: { exports: {} }, require: () => ({
    getRegisters: async () => { if (failure) throw failure; return rows; },
    saveRegister: async () => { if (failure) throw failure; }
  }) };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/controllers/google.controller.js'), 'utf8'), context);
  const controller = context.module.exports;
  let rendered;
  await controller.getRegisters({}, { render: (view, data) => { rendered = { view, data }; } }, () => assert.fail());
  assert.equal(rendered.view, 'index');
  assert.equal(rendered.data.registers, rows);
  assert(!Object.hasOwn(context, 'registers'), 'rows must not leak into global state');
  let redirect;
  await controller.saveRegister({ body: {} }, { redirect: url => { redirect = url; } }, () => assert.fail());
  assert.equal(redirect, '/');
  failure = new Error('Google API unavailable');
  for (const action of ['getRegisters', 'saveRegister']) {
    let received;
    await controller[action]({ body: {} }, { render: () => assert.fail(), redirect: () => assert.fail() }, error => { received = error; });
    assert.equal(received, failure);
  }
  console.log('PASS: rendering, saving, request-local rows and API errors passed to Express');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
