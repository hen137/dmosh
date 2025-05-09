import express from 'express';

const router = express.Router();

import { getLocal, getRemote } from '../controllers/video.ts';

router.get('/', getRemote);

// router.get('/:videoID', getVideo);

export default router;