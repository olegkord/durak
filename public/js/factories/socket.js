'use strict';

function Socket($rootScope) {

  let socket = io.connect(process.env.PORT || 'https://localhost:3000')
  return {
    on: function(eventName, callback) {
      socket.on(eventName, () => {
        //this is questionable.
        let args = arguments;
        $rootScope.$apply( () => {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, () => {
      let args = arguments;
      $rootScope.$apply( () => {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    });
  }
}

module.exports = Socket;
