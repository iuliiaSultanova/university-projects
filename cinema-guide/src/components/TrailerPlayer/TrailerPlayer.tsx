import { useState } from "react";
import styles from "./TrailerPlayer.module.scss";
import ReactPlayer from "react-player";

type PlayerProps = {
  videoUrl: string;
  videoTitle: string;
  setPlayTrailer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TrailerPlayer = ({
  videoUrl,
  videoTitle,
  setPlayTrailer,
}: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const handleClose = () => {
    setPlayTrailer(false);
  };

  return (
    <div className={styles.player_overlay}>
      <div
        className={styles.player}
        //onClick={() => setIsPlaying(!isPlaying)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <span className={styles.close_btn} onClick={handleClose}>
          {" "}
          &#10005;
        </span>
        {/* Custom Play/Pause Controls */}
        <div
          className={`${styles.controls} ${
            showControls ? styles.show : styles.hide
          }`}
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={styles.control_btn}
          >
            {isPlaying ? (
              <img src="/logos/pause_icon.svg" />
            ) : (
              <img src="/logos/play_icon.svg" />
            )}
          </button>
        </div>

        {!isPlaying && <div className={styles.video_title}>{videoTitle}</div>}

        <ReactPlayer
          url={videoUrl}
          width={"100%"}
          height={"100%"}
          playing={isPlaying}
          className={styles.player}
          controls={false}
        />
      </div>
    </div>
  );
};
