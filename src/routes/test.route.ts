import express from 'express';
import { get } from '../controllers/test.controller';

const router = express.Router();

router.get('/', get);

export default router;
