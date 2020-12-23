import express from 'express';
import test from './test.route';
import webhook from './webhook.route';
import message from './messages.route';

const router = express.Router();

router.use('/test', test);
router.use('/webhook', webhook);
router.use('/messages', message);

export default router;
