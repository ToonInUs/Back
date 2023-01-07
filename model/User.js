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
  tasteTags: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Tag",
    },
  ],
  //tagedWebtoons(내가 태그 설정한 웹툰 목록)
  //웹툰-내가 설정한 태그 같이 저장 필요[ {webtoon_id :[tag_id…]} ]
  tagedWebtoons: [
    {
      webtoon_taged: { type: mongoose.Schema.Type.ObjectId, ref: "Webtoon" },
      tags: [{ type: mongoose.Schema.Type.ObjectId, ref: "Tag" }],
    },
  ],

  // likedWebtoons(관심 웹툰 목록): [
  //   {Object id (ref Webtoon)}  }
  likedWebtoons: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Webtoon",
    },
  ],

  // likedComments(좋아요 누른 댓 목록): [
  //   {Object id (ref Comments)}}
  likedComments: [
    {
      type: Array,
    },
  ],
  //merge test
  //{Object Id (ref Comments) }]
  myComments: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Comment",
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
