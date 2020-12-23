import express from 'express';
import test from './test.route';
import webhook from './webhook.route';

const router = express.Router();

router.use('/test', test);
router.use('/webhook', webhook);

export default router;
