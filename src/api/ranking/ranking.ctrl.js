import Ranking from '../../models/ranking.js';

export const list = async (ctx) => {
  try {
    const rankings = await Ranking.find().sort({ score: 1 }).exec();
    ctx.body = rankings;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const update = async (ctx) => {
  const { name, score, date } = ctx.request.body;
  try {
    const data = await Ranking.findByName(name);
    if (data && data.score > score) {
      data.score = score;
      data.date = date;
      await data.save();
      ctx.body = true;
    } else if (!data) {
      const newData = new Ranking({
        name,
        score,
        date,
      });
      await newData.save();
      ctx.body = false;
    } else {
      ctx.body = false;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
