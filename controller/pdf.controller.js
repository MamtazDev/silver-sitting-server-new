const PdfModel = require("../models/pdf.model");
const User = require("../models/users.model");

const changePdfStatus = async (req, res) => {
  try {
    const { userId, pdfId, status } = req.body;

    const documentStatus = status ? "accepted" : "rejected";

    const pdf = await PdfModel.updateOne(
      { _id: pdfId },
      {
        $set: {
          status: documentStatus,
        },
      }
    );
    const user = await User.updateOne(
      { _id: userId },
      { $set: { documentStatus: documentStatus } }
    );
    res.status(200).send({
      message: "Status updated successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  changePdfStatus,
};
