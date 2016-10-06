const PORT = 8000;
const http = require('http');
const anyBody = require('body/any');

const Message = require('./models/Message');

const server = http.createServer((req, res) => {
  let { url, method } = req;
  let arr = url.split('/');
  let id = arr[2];
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
    case `/messages/${id}`:
      switch (method) {
        case 'GET':
          Message.getOneMessage(id, res);
          break;
        case 'DELETE':
          Message.removeOneMessage(id, res);
          break;
        case 'PUT':
          Message.updateOneMessage(id, res);
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
