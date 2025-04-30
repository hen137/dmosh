import express from 'express';

const router = express.Router();

import { getVideos, getVideo } from '../controllers/video.ts';

router.get('/', getVideos);

router.get('/:videoID', getVideo);

module.exports = router;