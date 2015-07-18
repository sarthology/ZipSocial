Comments = new Mongo.Collection("comments");
if (Meteor.isClient) {
  Template.body.helpers({
    comments:function () {
      return Comments.find({}, {sort: {createdAt: -1}});
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
      email: "Yoda@starwars.com",
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

}

if (Meteor.isServer) {

}
