type AudioContextCtor = new () => AudioContext;

let audioContext: AudioContext | null = null;
let audioUnavailable = false;

function getAudioContextCtor(): AudioContextCtor | null {
  const win = window as unknown as { AudioContext?: AudioContextCtor; webkitAudioContext?: AudioContextCtor };
  return win.AudioContext ?? win.webkitAudioContext ?? null;
}

export function unlockAudio(): void {
  if (audioUnavailable) return;
  try {
    if (!audioContext) {
      const Ctor = getAudioContextCtor();
      if (!Ctor) {
        audioUnavailable = true;
        return;
      }
      audioContext = new Ctor();
    }
    if (audioContext.state === "suspended") void audioContext.resume();
  } catch {
    audioUnavailable = true;
    audioContext = null;
  }
}

export function playChime(notes = 2): boolean {
  if (!audioContext || audioContext.state !== "running") return false;
  try {
    const start = audioContext.currentTime;
    for (let i = 0; i < notes; i++) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = i === 0 ? 880 : 1174;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      const at = start + i * 0.26;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.25, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.2);
      osc.start(at);
      osc.stop(at + 0.22);
    }
    return true;
  } catch {
    return false;
  }
}

export function vibrate(ms = 220): void {
  try {
    if (typeof window.navigator.vibrate === "function") window.navigator.vibrate(ms);
  } catch {
    /* no-op */
  }
}

export function disposeAudio(): void {
  if (audioContext) {
    audioContext.close().catch(() => {});
    audioContext = null;
  }
  audioUnavailable = false;
}
