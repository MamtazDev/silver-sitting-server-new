const express = require("express");
const {
  registerUser,
  emailVirification,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  uploadDocuments,
  resendActivationLink,
  changePassword,
  changeParentSerch,
  resetPassword,
  forgotPassword,
  changeVolunteerStatus,
} = require("../controller/users.controller");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/resendEmail", resendActivationLink);
router.put("/changePassword", changePassword);
router.post("/resetPasswordEmail", resetPassword);
router.post("/forgotPassword", forgotPassword);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/upload/:id", uploadDocuments);
router.put("/searchStatus/:id", changeParentSerch);
router.put("/volunteerStatus/:id", changeVolunteerStatus);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);
router.get("/verify/:email", emailVirification);

module.exports = router;
