const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webtoonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  header_img: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("Webtoon", webtoonSchema);
// "_id": { "$oid": "63832497c73d88db060679d1" },
// "title": "액괴",
// "creator": "서강용",
// "description": "일진들에게 수모를 당하며\n황색망사점균을 먹게 된 교내 왕따 수와 진오.\n그로 인해 신체에 변이가 일어나고\n황색망사점균(블롭)의 특징과 힘을 가지게 된다.\n\n여전히 학교 내에선\n무시 받거나 괴롭힘 당하는 두 명의 아이들은\n힘의 정체를 숨긴 채\n차근차근 교내 먹이사슬을 장악해 가지만\n하나 둘 나타나는 액괴의 흔적이 사회의 이슈가 되고,\n변이된 블롭의 실험체를 만든\n김수혁의 등장으로 싸움은 점점 커져 간다.",
// "genre": "학원/판타지",
// "header_img": "https://kr-a.kakaopagecdn.com/P/C/2147/sharing/2x/4ba808fc-9a03-4aa8-bb16-14fb468018c8.jpg",
// "isDeleted": "false",
// "platform": "kakao",
// "url": "https://webtoon.kakao.com/content/%EC%95%A1%EA%B4%B4/2147"
