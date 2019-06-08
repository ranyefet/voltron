const fs = require('fs')
const path = require('path')
const convict = require('convict')

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 6000,
    env: 'PORT',
    arg: 'port'
  }
})

// Load environment dependent configuration
var env = config.get('env')
const configPath = path.resolve(__dirname, env + '.json');
if (fs.existsSync(configPath)) {
  config.loadFile(configPath)
}

config.validate({ allowed: 'strict' })

module.exports = config
