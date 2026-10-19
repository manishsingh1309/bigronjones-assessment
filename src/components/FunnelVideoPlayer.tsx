import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import type { FunnelVideoConfig } from "../lib/funnelVideos";

interface FunnelVideoPlayerProps {
  video: FunnelVideoConfig;
  heroMode?: boolean;
  className?: string;
  autoPlay?: boolean;
}

export default function FunnelVideoPlayer({
  video,
  heroMode = false,
  className = "",
  autoPlay = false,
}: FunnelVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  const sources = [video.streamUrl, video.fallbackUrl];

  useEffect(() => {
    // Reset state when video prop changes
    setIsPlaying(false);
    setHasStarted(false);
    setLoadError(false);
    setCurrentSrcIndex(0);
  }, [video.id]);

  const handlePlayToggle = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      try {
        // Ensure unmuted playback when user intentionally clicks play
        el.muted = false;
        setIsMuted(false);
        await el.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch (err: any) {
        console.warn("[FunnelVideoPlayer] Play interrupted or blocked:", err?.message);
        // Fallback: try muted play if browser blocked unmuted autoplay
        try {
          el.muted = true;
          setIsMuted(true);
          await el.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch (muteErr) {
          console.error("[FunnelVideoPlayer] Muted playback failed:", muteErr);
        }
      }
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    const videoEl = videoRef.current;
    if (!container && !videoEl) return;

    if (videoEl && (videoEl as any).webkitEnterFullscreen) {
      // iOS Safari native video fullscreen
      (videoEl as any).webkitEnterFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else if (container?.requestFullscreen) {
      container.requestFullscreen().catch(() => {});
    }
  };

  const handleVideoError = () => {
    console.warn(`[FunnelVideoPlayer] Error loading source ${currentSrcIndex}:`, sources[currentSrcIndex]);
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex(currentSrcIndex + 1);
    } else {
      setLoadError(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden transition-all duration-300 ${
        heroMode
          ? "bg-gradient-to-b from-slate-950 via-[#0A3161]/30 to-white rounded-3xl p-3 sm:p-6 border-2 border-[#0A3161]/40 shadow-2xl mb-8"
          : "bg-white rounded-3xl p-3 sm:p-5 border-2 border-slate-200 shadow-xl mb-8"
      } ${className}`}
    >
      {/* ── Badge & Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-3 sm:mb-4 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A3161]/10 border border-[#0A3161]/20 text-[#0A3161] text-[10px] sm:text-xs font-['DM_Mono'] font-bold uppercase tracking-[0.2em] mb-2 shadow-2xs">
          <Sparkles className="w-3 h-3 text-[#B31942]" />
          <span>{video.badge}</span>
        </div>

        <h3 className="font-['Bebas_Neue'] text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.03em] text-slate-900 leading-none mb-1">
          {video.title}
        </h3>

        {video.subtitle && (
          <p className="font-['DM_Sans'] text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {video.subtitle}
          </p>
        )}
      </div>

      {/* ── Video Player Screen ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner border border-slate-800 group">
        <video
          ref={videoRef}
          src={sources[currentSrcIndex]}
          poster={video.poster}
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          controls={hasStarted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={handleVideoError}
          className="w-full h-full object-cover select-none cursor-pointer"
          onClick={handlePlayToggle}
        />

        {/* ── Initial Play Overlay ─────────────────────────────────────── */}
        {!hasStarted && !loadError && (
          <div
            onClick={handlePlayToggle}
            className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 group-hover:bg-slate-950/50"
          >
            {/* Glowing Play Circle */}
            <div className="relative mb-3 sm:mb-4">
              <div className="absolute -inset-2 rounded-full bg-[#B31942]/40 blur-md animate-pulse" />
              <button
                type="button"
                aria-label={`Play ${video.title}`}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B31942] hover:bg-[#8e1032] active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-red-950 transition-all cursor-pointer border-2 border-white/80"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
              </button>
            </div>

            <div className="text-center space-y-1">
              <span className="font-['Bebas_Neue'] text-lg sm:text-2xl tracking-wider text-white uppercase block drop-shadow-md">
                WATCH COACH RON&apos;S BRIEFING
              </span>
              <span className="font-['DM_Mono'] text-[10px] sm:text-xs text-white/80 uppercase tracking-widest block font-medium">
                TAP TO PLAY WITH SOUND (1080P HD)
              </span>
            </div>
          </div>
        )}

        {/* ── Fallback Notice if Video Fails to Stream ─────────────────── */}
        {loadError && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center text-white">
            <ShieldCheck className="w-10 h-10 text-amber-400 mb-2" />
            <h4 className="font-['Bebas_Neue'] text-xl text-white tracking-wide uppercase mb-1">
              DIRECT CLOUD STREAM READY
            </h4>
            <p className="font-['DM_Sans'] text-xs text-slate-300 max-w-sm mb-4 leading-relaxed">
              If your browser blocks third-party video playback, you can view Coach Ron&apos;s briefing directly in high definition:
            </p>
            <a
              href={video.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A3161] hover:bg-[#08274d] text-white font-['DM_Mono'] text-xs uppercase tracking-wider font-bold transition-all shadow-lg"
            >
              <span>OPEN VIDEO IN HIGH DEFINITION</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* ── Sub-Player Footer Bar ────────────────────────────────────────── */}
      <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-slate-500 font-['DM_Mono'] text-[10px] sm:text-[11px] uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Official BigRonJones® Coaching Asset</span>
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="text-slate-400">Recorded by Big Ron Jones</span>
      </div>
    </div>
  );
}
