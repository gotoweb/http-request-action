const core = require("@actions/core");
const { request, METHOD_POST } = require('./httpClient');
const { GithubActions } = require('./githubActions');
const stdout = require('../src/stdout');

let auth = undefined
let customHeaders = {}

if (!!core.getInput('customHeaders')) {
  try {
    customHeaders = JSON.parse(core.getInput('customHeaders'));
  } catch (error) {
    core.error('Could not parse customHeaders string value')
  }
}

const headers = { 'Content-Type': core.getInput('contentType') || 'application/json' }

if (!!core.getInput('username') || !!core.getInput('password')) {
  core.debug('Add BasicHTTP Auth config')

  auth = {
    username: core.getInput('username'),
    password: core.getInput('password')
  }
}

if (!!core.getInput('bearerToken')) {
  headers['Authorization'] = `Bearer ${core.getInput('bearerToken')}`;
}

const instanceConfig = {
  baseURL: core.getInput('url', { required: true }),
  timeout: parseInt(core.getInput('timeout') || 5000, 10),
  headers: { ...headers, ...customHeaders }
}

core.debug('Instance Configuration: ' + JSON.stringify(instanceConfig))

let data = '{}'
if (core.getInput('data')) {
  data = core.getInput('data')
}
else if (core.getInput('execOutput')) {
  data = stdout(core.getInput('execOutput'))
}
const method = core.getInput('method') || METHOD_POST;
const preventFailureOnNoResponse = core.getInput('preventFailureOnNoResponse') === 'true';

request({ data, method, instanceConfig, auth, preventFailureOnNoResponse, actions: new GithubActions() })
