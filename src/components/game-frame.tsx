"use client";

import { useRef } from "react";
import { Maximize2 } from "lucide-react";

export default function GameFrame({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  async function enterFullscreen() {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (frame.requestFullscreen) {
        await frame.requestFullscreen();
      }
    } catch (error) {
      console.error("Could not enter fullscreen:", error);
    }
  }

  return (
    <div className="game-frame-wrap">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        className="game-frame"
        allow="fullscreen; gamepad"
        allowFullScreen
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <button
        className="frame-fullscreen"
        type="button"
        onClick={enterFullscreen}
        aria-label="Enter fullscreen"
        title="Fullscreen"
      >
        <Maximize2 size={17} />
      </button>
    </div>
  );
}
