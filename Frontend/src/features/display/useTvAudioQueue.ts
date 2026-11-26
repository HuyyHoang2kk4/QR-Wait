import { useCallback, useRef, useState } from 'react';

export interface TvAnnouncementItem {
  id: string;
  ticketNumber: string;
  displayName: string;
  counterName: string;
  ttsEnabled: boolean;
}

/**
 * Chuyen ma ve "#A-025" thanh "A 0 2 5" de TTS doc ro tung ky tu thay vi doc gop so.
 */
function spellOutTicketNumber(ticketNumber: string): string {
  return ticketNumber
    .replace(/^#/, '')
    .replace(/-/g, ' ')
    .split('')
    .join(' ');
}

/**
 * Module M8: Hang doi am thanh tuan tu cho TV Display (Ding Dong -> TTS vi-VN Bat/Tat) (FR-036).
 */
export function useTvAudioQueue() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const queueRef = useRef<TvAnnouncementItem[]>([]);
  const isPlayingRef = useRef(false);

  const unlockAudio = useCallback(async () => {
    try {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      window.speechSynthesis?.cancel();
      setAudioUnlocked(true);
    } catch {
      setAudioUnlocked(true);
    }
  }, []);

  const playChime = (): Promise<void> =>
    new Promise((resolve) => {
      // TODO: Phat file /sounds/ding-dong.mp3 (kem fallback Web Audio API tone neu chua co file mp3)
      const audio = new Audio('/sounds/ding-dong.mp3');
      const timer = setTimeout(resolve, 1200);
      audio.onended = () => {
        clearTimeout(timer);
        resolve();
      };
      audio.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      audio.play().catch(() => {
        clearTimeout(timer);
        resolve();
      });
    });

  const speakVietnamese = (item: TvAnnouncementItem): Promise<void> =>
    new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }
      const text = `Xin mời khách hàng số ${spellOutTicketNumber(item.ticketNumber)}, ${item.displayName}, đến ${item.counterName}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;

      const safetyTimer = setTimeout(resolve, 8000);
      utterance.onend = () => {
        clearTimeout(safetyTimer);
        resolve();
      };
      utterance.onerror = () => {
        clearTimeout(safetyTimer);
        resolve();
      };
      window.speechSynthesis.speak(utterance);
    });

  const processNext = useCallback(async () => {
    if (isPlayingRef.current) return;
    const next = queueRef.current.shift();
    if (!next) return;

    isPlayingRef.current = true;
    await playChime();
    if (next.ttsEnabled) {
      await speakVietnamese(next);
    }
    isPlayingRef.current = false;
    void processNext();
  }, []);

  const enqueueAnnouncement = useCallback(
    (item: TvAnnouncementItem) => {
      queueRef.current.push(item);
      void processNext();
    },
    [processNext],
  );

  return { audioUnlocked, unlockAudio, enqueueAnnouncement };
}
