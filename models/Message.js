const fs = require('fs');
const path = require('path');
const dataMsgPath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');
const uuid = require('uuid');

const Message = {
  getAllMessages: function(res) {
    let result = 'No messages...';
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }
      if(messages){
        messages.map(message =>{
          result = `${message.name} @ ${moment(message.timestamp).format('lll')} say: ${message.content}. \n`;
        })
      }
      res.write(result)
      res.end();
    })
  },
  createNewMessages: function(body, res) {
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }

      let messageObj = {
        id: uuid(),
        name: body.name,
        content: body.content,
        timestamp: Date.now()
      }

      messages.push(messageObj);

      fs.writeFile(dataMsgPath, JSON.stringify(messages), err => {
        if(err) console.error;
        res.end();
      });
    });
  },


};

module.exports = Message;
