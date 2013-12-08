define([], function() {
  var Account = Backbone.Model.extend({
    urlRoot: '/accounts',

    initialize: function() {
    }
  });

  return Account;
});
