const stdout = require('../src/stdout');

test('test', () => {
  expect(stdout(`echo hello $PATH`)).toContain('/usr');
});

test('test 2', () => {
  expect(stdout(`cat test/index.test.js`)).toContain('const stdout');
})

