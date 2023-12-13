const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  pdf: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const PdfModel = mongoose.model('Pdf', pdfSchema);

module.exports = PdfModel;
