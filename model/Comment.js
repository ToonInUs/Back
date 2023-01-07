// //      "_id": "comment1",
// "creator": "638323486736f580bdaa3f7c",
// "webtoonid": "63832497c73d88db060679d1",
// "contnet": "comment test1",
// "createdAt": "?",
// "refComs": 0,
// "likes": 1,
// "isDeleted": false

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    requried: true,
  },
  webtoonid: {
    type: Schema.Types.ObjectId,
    requried: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date, //일단 임시로
  },
  refComs: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
