define(['SocialNetView', 'text!templates/index.html'],
function(SocialNetView, indexTemplate, StatusView, Status) {
  var indexView = SocialNetView.extend({
    el: $('#content'),

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(indexTemplate);
    }
  });

  return indexView;
});
