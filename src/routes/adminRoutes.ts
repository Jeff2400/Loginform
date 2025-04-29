import { Router } from 'express';
import { getAdminPage } from '../controllers/adminController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/admin', verifyToken, getAdminPage);

export default router;
