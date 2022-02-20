import Router from 'koa-router';
import * as rankingCtrl from './ranking.ctrl.js';

const ranking = new Router();

ranking.get('/', rankingCtrl.list);
ranking.post('/', rankingCtrl.update);

export default ranking;
