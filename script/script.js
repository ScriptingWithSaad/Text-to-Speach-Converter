let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector('select');
let playButton = document.querySelector('.row button');
let textInput = document.querySelector('textarea');

// Force voice loading
window.speechSynthesis.getVoices();

// Initialize voices immediately
function initVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear select

    // Create and add voice options
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = voice.name;
        option.value = index;
        voiceSelect.appendChild(option);
    });

    // Set default voice
    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.selectedIndex = 0;
    }
}

// Try loading voices multiple times to ensure they load
let attempts = 0;
function tryLoadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        initVoices();
    } else if (attempts < 10) {
        attempts++;
        setTimeout(tryLoadVoices, 500);
    }
}

// First attempt to load voices
tryLoadVoices();

// Also listen for voices changed event
speechSynthesis.onvoiceschanged = function() {
    initVoices();
};

// Voice selection event
voiceSelect.addEventListener('change', function() {
    speech.voice = voices[this.value];
});

// Play button event
playButton.addEventListener('click', function() {
    if (textInput.value !== '') {
        speech.text = textInput.value;
        speechSynthesis.cancel();
        speechSynthesis.speak(speech);
    }
});