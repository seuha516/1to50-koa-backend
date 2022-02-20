import mongoose from 'mongoose';

const { Schema } = mongoose;

const RankingSchema = new Schema({
  name: String,
  score: Number,
  date: String,
});

RankingSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};

const Ranking = mongoose.model('Ranking', RankingSchema);
export default Ranking;
