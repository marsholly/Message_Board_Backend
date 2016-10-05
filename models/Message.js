const fs = require('fs');
const path = require('path');
const dataMsgPath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');

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
          result = `${message.name} @ ${moment(message.timestamp).format('lll')}: ${message.content}. \n`;
        })
      }
      res.write(result)
      res.end();
    })
  }
};

module.exports = Message;
