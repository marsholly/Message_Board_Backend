const PORT = 8000;
const http = require('http');
const anyBody = require('body/any');

const Message = require('./models/Message');

const server = http.createServer((req, res) => {
  let { url, method } = req;
  // console.log('url:', url)  //  '/'
  // console.log('method:', method)  // GET

  switch (url) {
    case '/messages':
      switch (method) {
        case 'GET':
          Message.getAllMessages(res);
          break;
        case 'POST':
          console.log('create new one')
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






  // anyBody(req, (err, body) => {
  //   console.log('body:', body);
  //   res.end('ok');
  // })



});

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
