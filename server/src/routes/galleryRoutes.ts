import { Router } from 'express';
import {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from '../controllers/galleryController.js';

const router = Router();

router.get('/', getAllGalleryImages);
router.post('/', createGalleryImage);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;
