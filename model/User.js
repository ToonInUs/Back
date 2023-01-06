const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  //취향 추천용 태그(최대 5개) tasteTags: [ {Object id(ref Tag)}  ]
  tasteTags: {
    type: Array,
  },
  //tagedWebtoons(내가 태그 설정한 웹툰 목록)
  //웹툰-내가 설정한 태그 같이 저장 필요[ {webtoon_id :[tag_id…]} ]
  tagedWebtoons: {
    type: Array,
  },

  // likedWebtoons(관심 웹툰 목록): [
  //   {Object id (ref Webtoon)}  }
  likedWebtoons: {
    type: Array,
  },

  // likedComments(좋아요 누른 댓 목록): [
  //   {Object id (ref Comments)}}
  likedComments: {
    type: Array,
  },

  //{Object Id (ref Comments) }]
  myComments: {
    type: Array,
  },

  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
    //enum: ["User", "Editor", "Admin"],
  },

  refreshToken: {
    type: String,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
