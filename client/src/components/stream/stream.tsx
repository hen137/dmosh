// VideoPlayer.js
import { useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import './stream.css'

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer>(null);

  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    mute: true,
    sources: [{
      src: "localhost:3001/video/001",
      type: "video/mp4"
    },
    ]
  };

  const onReady = (player: VideoJsPlayer) => {
    player.on('ended', () => {
      console.log('Video Ended');
    });
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoRef.current.appendChild(videoElement); //ignore error - typescript & video.js dont play nice

      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      });

      // You can update the player in the `onReady` callback only
      // on component update, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    return () => {
      // Destroy player on unmount
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='stream'>
      <video ref={videoRef} className="" />
    </div>
  );
};

export default Stream;
