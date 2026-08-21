/**
 * Browser-native Web Speech Synthesis utility with female voice prioritization.
 * Zero external dependencies, zero latency.
 */

let isVoiceMuted = false;

export function setVoiceMuted(muted: boolean) {
  isVoiceMuted = muted;
  if (muted && typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function getVoiceMuted(): boolean {
  return isVoiceMuted;
}

export function speakFemaleVoice(text: string, force = false) {
  if (typeof window === "undefined" || (!force && isVoiceMuted) || !("speechSynthesis" in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown, bullet points, asterisks, URLs, and emojis for crystal-clear pronunciation
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold **
    .replace(/\*(.*?)\*/g, "$1") // remove italic *
    .replace(/•/g, " ") // remove bullets
    .replace(/https?:\/\/\S+/g, "") // remove urls
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "") // remove emojis
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0; // natural conversational pace
  utterance.pitch = 1.12; // slightly elevated pitch for natural female tone

  const selectAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();

    // Priority list for pleasant English female voices across operating systems & browsers
    const femaleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("female") ||
            v.name.includes("Samantha") ||
            v.name.includes("Victoria") ||
            v.name.includes("Karen") ||
            v.name.includes("Zira") ||
            v.name.includes("Jenny") ||
            v.name.includes("Aria") ||
            v.name.includes("Google UK English Female") ||
            v.name.includes("Google US English") ||
            v.name.includes("Natural"))
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Voices may load asynchronously on Chrome/Safari
  if (window.speechSynthesis.getVoices().length > 0) {
    selectAndSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      selectAndSpeak();
    };
  }
}
