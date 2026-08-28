import { Router } from 'express';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllEvents);
router.post('/', requireAdminAuth, createEvent);
router.put('/:id', requireAdminAuth, updateEvent);
router.delete('/:id', requireAdminAuth, deleteEvent);

export default router;
