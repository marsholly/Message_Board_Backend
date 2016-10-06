const PORT = 8000;
const http = require('http');
const anyBody = require('body/any');

const Message = require('./models/Message');

const server = http.createServer((req, res) => {
  let { url, method } = req;

  switch (url) {
    case '/messages':
      switch (method) {
        case 'GET':
          Message.getAllMessages(res);
          break;
        case 'POST':
          anyBody(req, (err, body) => {
            Message.createNewMessages(body,res);
          })
          break;
      }
      break;
    case '/messages/:id':
      switch (method) {
        case 'GET':
          console.log('get one')
          break;
        case 'DELETE':
          console.log('delete')
          break;
        case 'PUT':
          console.log('update')
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
  }









});

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
