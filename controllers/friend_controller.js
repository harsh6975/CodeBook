const Friendship = require("../models/friendSchema");
const User = require("../models/userSchema");

module.exports.toggle = async function (req, res) {
  try {
    let friend = await Friendship.findOne({
      from_user: req.user.id,
      to_user: req.query.id,
    });
    if (friend) {
      //console.log("friend", friend);
      friend.remove();

      //finding user
      let toUser = await User.findById(friend.from_user);
      let fromUser = await User.findById(friend.to_user);
      //pulling out friends
      fromUser.friends.pull(friend.id);
      toUser.friends.pull(friend.id);

      fromUser.save();
      toUser.save();
      console.log("friend removed");
    } else {
      let newFriend = await Friendship.create({
        from_user: req.user.id,
        to_user: req.query.id,
      });
      //finding user
      let toUser = await User.findById(newFriend.to_user);
      let fromUser = await User.findById(newFriend.from_user);
      //pushing into friends
      fromUser.friends.push(newFriend.id);
      toUser.friends.push(newFriend.id);

      fromUser.save();
      toUser.save();
      console.log("Added Friend");
    }

    return res.redirect("back");
  } catch (err) {
    console.log("error in adding friend ", err);
    return;
  }
};
