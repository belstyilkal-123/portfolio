import express from 'express';
import { getGitHubOverview } from '../controllers/githubController';

const router = express.Router();

router.get('/overview', getGitHubOverview);

export default router;
