define(['Sockets'],
function(sio) {
  var SocialNetSockets = function(eventDispatcher) {
    var accountId = null;

    var socket = null;

    var connectSocket = function(socketAccountId) {
      accountId = socketAccountId;
      socket = io.connect();

      socket
        .on('connect_failed', function(reason) {
          console.error('unable to connect', reason);
        })
        .on('connect', function() {
            //Do something on successful connection
        });
    };

    eventDispatcher.bind('app:loggedin', connectSocket);
  }

  return {
    initialize: function(eventDispatcher) {
      SocialNetSockets(eventDispatcher);
    }
  };
});
