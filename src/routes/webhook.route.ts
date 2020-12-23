import express from 'express';
import { get, post } from '../controllers/webhook.controller';

const router = express.Router();

router.get('/', get);
router.post('/', post);

export default router;
