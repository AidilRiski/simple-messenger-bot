import express from 'express';
import { deleteById, get, getAll } from '../controllers/messages.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', get);
router.delete('/:id', deleteById);

export default router;
