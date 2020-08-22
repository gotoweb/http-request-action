const { execSync } = require('child_process');

module.exports = function (stdin) {
  try {
    return execSync(stdin).toString()
  } catch (error) {

  }
}
