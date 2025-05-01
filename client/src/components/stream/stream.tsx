// VideoPlayer.js
import { useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css'
import './stream.css'

// const options = {
//   autoplay: true,
//   controls: false,
//   fluid: false,
//   mute: true,
//   sources: [
//     {
//       src: "http://localhost:3001/video",
//       type: "video/mp4"
//     }
//   ]
// };

const Stream = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement); //ignore error - typescript & video.js dont play nice

      playerRef.current = videojs(videoElement, {
        autoplay: true,
        loop: true,
        muted: true,
        controls: false,
        disablePictureInPicture: true,
        // fluid: true,
        sources: [
          {
            src: "http://localhost:3001/video",
            type: "video/mp4"
          }
        ]
      });
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef])

  return (
    <div className='stream'>
      <div ref={videoRef} className="" />
    </div>
    // <div ref={videoRef} className='stream' />
  );
};

export default Stream;
