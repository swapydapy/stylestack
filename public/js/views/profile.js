define(['SocialNetView', 'text!templates/profile.html'],
function(SocialNetView,  profileTemplate,
         statusTemplate, Status, StatusView)
{
  var profileView = SocialNetView.extend({
    el: $('#content'),

    initialize: function (options) {
      this.socketEvents = options.socketEvents;
      this.model.bind('change', this.render, this);
    },

    render: function() {
      var that = this;
      this.$el.html(
        _.template(profileTemplate,this.model.toJSON())
      );
    }
  });

  return profileView;
});
