import express from 'express';

const router = express.Router();

import { getLocal } from '../controllers/video.ts';

router.get('/', getLocal);

// router.get('/:videoID', getVideo);

export default router;