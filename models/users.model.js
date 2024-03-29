const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["childcarer", "parents", "admin"],
    },
    image: {
      type: String,
      required: false,
      default: "https://i.ibb.co/R4xHYJy/menIcon.png",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    residance: {
      type: String,
      required: false,
    },
    streetOrHouseNumber: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
      default: "fkljsklfklsfkljsf",
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"],
    },
    availability: {
      type: [String],
      required: false,
    },
    offerProvide: {
      type: [String],
      required: false,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    parentSearch: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: Number,
      default: 0,
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
    documentStatus: {
      type: String,
      enum: ["not-uploaded", "uploaded", "accepted", "rejected"],
      default: "not-uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
