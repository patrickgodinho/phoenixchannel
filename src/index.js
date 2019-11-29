const socket = require('./socket');
const readline = require('readline');
const uuidv1 = require('uuid/v1');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = () => {
  rl.question('HI! Type command [NEW_TERMINAL|GET_TERMINAL]: \n', answer => {
    switch (answer) {
      case 'NEW_TERMINAL':
        rl.question('Type merchant: \n', merchant_id => {
          rl.question('Type logic number: \n', logic_number => {
            const obj = {
              terminal: {
                uuid: uuidv1(),
                merchant_id,
                logic_number
              }
            };
            socket.post(obj, callback);
          });
        });

        break;
      case 'GET_TERMINAL':
        rl.question('Type id \n', id => {
          socket.get(id, callback);
        });
        break;
      case 'JOIN':
        break;
      default:
        console.log('Invalid command');
        ask();
    }
  });
};

const callback = content => {
  console.log(content);
  ask();
};

if (!socket.isOnline()) {
  socket.init(callback);
}
