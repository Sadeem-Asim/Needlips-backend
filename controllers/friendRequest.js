import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const sendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    if (!id || !friendId) {
      res.status(200).json({
        message: "Plz send id and friend id",
      });
    } else {
      const request = await FriendRequest.create({
        user: id,
        sentTo: friendId,
      });
      res.status(200).json({
        type: "success",
        message: "Friend request sent successfully",
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllFriendRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await FriendRequest.find({
      sentTo: id,
    });
    res.status(200).json({
      type: "success",
      requests,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const request = await FriendRequest.find({
      id: friendId,
      sentTo: id,
    });
    if (!request) {
      res.status(200).json({
        message: "No Friend Request Exist Before",
      });
    } else {
      const user = await User.findById(id);
      const friend = await User.findById(friendId);

      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );
      await FriendRequest.findByIdAndDelete(request._id);
      res.status(200).json(formattedFriends);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const declineRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const friend = await FriendRequest.findOneAndDelete({
      id: friendId,
      sentTo: id,
    });
    res.status(200).json({
      type: "success",
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
