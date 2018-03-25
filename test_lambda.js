const lambda = require('./lambda/hello')
const event = {}
const context = {}
const callback = (err, res) => {
  console.info('res', res);
}
lambda.handler(event, context, callback)
