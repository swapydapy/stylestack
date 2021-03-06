module.exports = function(app, models) {
  var io = require('socket.io');
  var utils = require('connect').utils;
  var cookie = require('cookie');
  var Session = require('connect').middleware.session.Session;

  var sio = io.listen(app.server)

  sio.configure(function() {
    app.isAccountOnline = function(accountId) {
      var clients = sio.sockets.clients(accountId);
      return (clients.length > 0);
    };

    sio.set('authorization', function( data, accept) {
      var signedCookies = cookie.parse(data.headers.cookie);
      var cookies = utils.parseSignedCookies(signedCookies,app.sessionSecret);
      data.sessionID = cookies['express.sid'];
      data.sessionStore = app.sessionStore;
      data.sessionStore.get(data.sessionID, function(err, session) {
        if ( err || !session ) {
          return accept('Invalid session', false);
        } else {
          data.session = new Session(data, session);
          accept(null, true);
        }
      });
    });

    sio.sockets.on('connection', function(socket) {
      var session = socket.handshake.session;
      var accountId = session.accountId;
      var sAccount = null;
      socket.join(accountId);

      app.triggerEvent('event:' + accountId, {
        from: accountId,
        action: 'login'
      });

      socket.on('disconnect', function() {
        app.triggerEvent('event:' + accountId, {
          from: accountId,
          action: 'logout'
        });
      });
    });
  });
}