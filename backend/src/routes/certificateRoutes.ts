import express from 'express';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate, reorderCertificates } from '../controllers/certificateController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getCertificates)
  .post(protect, admin, createCertificate);

router.route('/reorder')
  .put(protect, admin, reorderCertificates);

router.route('/:id')
  .put(protect, admin, updateCertificate)
  .delete(protect, admin, deleteCertificate);

export default router;
