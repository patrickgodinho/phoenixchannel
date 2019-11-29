const { Socket } = require('phoenix-channels');
let socket = new Socket('ws://1a9f4f69.ngrok.io/socket');
let channel;

module.exports = {
  isOnline: () => {
    return socket.isConnected();
  },
  init: callback => {
    socket.connect();

    channel = socket.channel('terminals:lobby', {});
    channel
      .join()
      .receive('ok', resp => {
        callback(
          '\n ------  Joined in Terminal Manager socket channel  ------\n'
        );
      })
      .receive('error', resp => {
        // console.log('Unable to join', resp);
      });
  },
  post: (data, callback) => {
    channel
      .push('terminal:post', data)
      .receive('ok', resp =>
        callback(`SUCCESS! Terminal created:\n ${JSON.stringify(resp)}`)
      );
  },
  get: (id, callback) => {
    channel
      .push('terminal:get', { terminal_id: id })
      .receive('ok', resp => callback(resp));
  }
};
