module.exports = function(app, models) {
    
  app.get('/accounts/:id', function(req, res) {
    var accountId = req.params.id == 'me'
                       ? req.session.accountId
                       : req.params.id;
    models.Account.findById(accountId, function(account) {
      res.send(account);
    });
  });
}