import Router from 'koa-router';
import ranking from './ranking/index.js';

const api = new Router();

api.use('/ranking', ranking.routes());

export default api;
