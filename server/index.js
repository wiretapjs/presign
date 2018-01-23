const commander = require('commander') // eslint-disable-line

commander
  .version('0.0.1')
  .option('-e, --env [value]', 'Set the environment the application is running in.')
  .parse(process.argv)

if (commander.env) {
  process.env.APP_ENVIRONMENT = commander.env
}

const logger = require('winston')
const app = require('./app')
const port = process.env.PORT || 3001

app.listen(port, (err) => {
  if (err) logger.error(err)
  logger.info(`Static file server listening on ${port}`)
})
