
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

  Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }
    return user.username;
  });

  Template.registerHelper('imageFromId', function(userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return(user.profile.avatar_url);
    }
    //return user.username;
  });

  Template.registerHelper("timestampToTime", function (timestamp) {
      var date = new Date(timestamp);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
  });

  Template.discussion.events({
   "click .delete": function () {
     Comments.remove(this._id);
   }
 });
