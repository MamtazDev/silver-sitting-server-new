const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    pdf: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const PdfModel = mongoose.model("Pdf", pdfSchema);

module.exports = PdfModel;
