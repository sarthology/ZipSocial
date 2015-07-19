
  Template.discussion.helpers({
    comments:function () {
      return Comments.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.loggedOut.events({
    "click #login":function(e,tmpl){
      Meteor.loginWithGithub({
        requestPermissions:['user','public_repo']
      },function(err){
        if (err) {

        } else {

        }
      });
    }
  });
  Template.loggedIn.events({
    "click #logout":function(e,tmpl) {
      Meteor.logout(function(err){
        if (err) {

        } else {

        }
      });
    }
  });
  Template.body.events({
    "submit .new-comment": function (event) {
    event.preventDefault();

    // Get value from form element
    var comment = event.target.comment.value;

    // Insert a comment
    Comments.insert({
      comment: comment,
      username: Meteor.userId(),
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.comment.value = "";
    return false;
  }
  });

  Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
  });

  Template.discussion.events({
   "click .delete": function () {
     Comments.remove(this._id);
   }
 });
