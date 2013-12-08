define(['views/index', 'views/register', 'views/login',
        'views/forgotpassword', 'views/profile', 'models/Account'],
function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView, Account) {
  var SocialRouter = Backbone.Router.extend({
    currentView: null,

    socketEvents: _.extend({}, Backbone.Events),

    routes: {
      'index': 'index',
      'login': 'login',
      'register': 'register',
      'forgotpassword': 'forgotpassword',
      'profile/:id': 'profile'
    },

    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    index: function() {
      this.changeView(new IndexView({
        socketEvents:this.socketEvents
      }));
    },

    login: function() {
      this.changeView(new LoginView({socketEvents:this.socketEvents}));
    },

    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },

    register: function() {
      this.changeView(new RegisterView());
    },

    profile: function(id) {
      var model = new Account({id:id});
      this.changeView(new ProfileView({model:model, socketEvents:this.socketEvents}));
      model.fetch();
    }
  });

  return new SocialRouter();
});

