const fs = require('fs');
const path = require('path');
const dataMsgPath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');
const uuid = require('uuid');

const Message = {
  getAllMessages: function(res) {
    let result = '';
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
          result += `${message.name} @ ${moment(message.timestamp).format('lll')} say: ${message.content} \n`;
        })
      }
      res.write(result);
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
  getOneMessage: function(id, res) {
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }

      let message = messages.filter(msg => {
        return msg.id === id;
      })
      let result = `${message[0].name} @ ${moment(message[0].timestamp).format('lll')} say: ${message[0].content}`;
      res.write(result);
      res.end();
    });
  },
  removeOneMessage: function(id, res) {
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }
      let newMessages = messages.filter(msg => {
        return msg.id !== id;
      })

      fs.writeFile(dataMsgPath, JSON.stringify(newMessages), err => {
        if(err) console.error;
      });

      let result = '';
      newMessages.map(message =>{
        result += `${message.name} @ ${moment(message.timestamp).format('lll')} say: ${message.content} \n`;
      })
      res.write(result);
      res.end();
    });
  },
  updateOneMessage: function(id, body, res) {
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }
      let index = messages.findIndex(msg => {
        return msg.id === id;
      })
      let updateMessage = {
        id,
        name: body.name,
        content: body.content,
        timestamp: Date.now()
      }
      messages[index] = updateMessage;

      fs.writeFile(dataMsgPath, JSON.stringify(messages), err => {
        if(err) console.error;
      });

      let result = '';
      messages.map(message =>{
        result += `${message.name} @ ${moment(message.timestamp).format('lll')} say: ${message.content} \n`;
      })
      res.write(result);
      res.end();
    });
  }

};

module.exports = Message;
