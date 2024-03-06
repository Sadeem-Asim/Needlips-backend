import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  findPeople,
} from "../controllers/users.js";

import {
  acceptRequest,
  declineRequest,
  sendRequest,
  getAllFriendRequests,
} from "../controllers/friendRequest.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/findPeople/:username", findPeople);

router.get("/friendRequests", getAllFriendRequests);
router.post("/sendFriendRequest", sendRequest);
router.delete("/declineFriendRequest", declineRequest);
router.post("acceptRequest", acceptRequest);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
