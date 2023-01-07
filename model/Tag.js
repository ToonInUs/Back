const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  //id
  //content
  content: {
    type: String,
  },
  //creator
  creator: {
    type: String,
    required: true,
  },
  //webtoons []
  webtoons: [{ type: Schema.Types.ObjectId, ref: "Webtoon" }],
  //isDeleted
  isDeleted: { type: Boolean },
});

module.exports = mongoose.model("Tag", tagSchema);
