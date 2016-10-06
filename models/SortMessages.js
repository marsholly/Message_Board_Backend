const fs = require('fs');
const path = require('path');
const dataMsgPath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');

const SortMessages = {
  sortByName: function(res) {
    fs.readFile(dataMsgPath, (err, data) => {
      if (err) console.error;
      let messages;
      try {
        messages = JSON.parse(data);
      } catch(e) {
        messages = [];
      }

      let newMessages = messages.sort((cur, next) => {
        return ( cur.name > next.name) ? 1 : ((next.name > cur.name) ? -1 : 0) ;
      });

      let result = '';
      newMessages.map(message =>{
        result += `${message.name} @ ${moment(message.timestamp).format('lll')} say: ${message.content} \n`;
      })
      res.write(result);
      res.end();

    });
  }
}
module.exports = SortMessages;
