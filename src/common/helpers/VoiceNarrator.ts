const narrateStory = (story: string) =>  {
    const synth = window.speechSynthesis;
    synth.cancel();

    const speech = new SpeechSynthesisUtterance(story);

    
    const karenVoice = synth.getVoices().find(voice => voice.voiceURI === "Karen");

    speech.voice = karenVoice && synth.getVoices().find(voice => voice.voiceURI === "Karen") || synth.getVoices()[67];
    speech.rate = 0.9 ;
    window.speechSynthesis.speak(speech);
  }

  export const stopNarration = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  }

  export default narrateStory;