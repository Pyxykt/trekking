import { useEffect, useRef, useState } from "react";
import { C } from "../../constants/colors";

const MUSIC_SRC =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.45);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div style={containerStyle}>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" autoPlay loop />
      <button type="button" onClick={togglePlay} style={buttonStyle}>
        {isPlaying ? "Pause music" : "Play music"}
      </button>
      <label style={labelStyle}>
        Volume
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          style={sliderStyle}
        />
      </label>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: "fixed",
  right: 16,
  bottom: 16,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
  borderRadius: 12,
  background: "rgba(12, 24, 19, 0.92)",
  border: `1px solid ${C.borderHi}`,
  boxShadow: "0 18px 50px rgba(0, 0, 0, 0.25)",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 999,
  border: "none",
  background: C.gold,
  color: C.bg,
  fontWeight: 700,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  color: C.parchment,
  fontSize: 13,
};

const sliderStyle: React.CSSProperties = {
  width: 130,
  accentColor: C.gold,
};
