export class AudioService {
    private sounds: { [key: string]: HTMLAudioElement } = {};

    constructor() {
        // Preload audio files
        this.sounds.flip = new Audio('/src/assets/sounds/flip.mp3');
        this.sounds.shuffle = new Audio('/src/assets/sounds/shuffle.mp3');
        this.sounds.win = new Audio('/src/assets/sounds/win.mp3');
        this.sounds.correct = new Audio('/src/assets/sounds/correct.mp3');
        this.sounds.click = new Audio('/src/assets/sounds/click.mp3');
    }

    playSound(soundName: string, startTime: number = 0, duration: number = 1.5): void {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = startTime; // Set the start time
            sound.play().catch((error) => {
                console.error(`Failed to play sound: ${soundName}`, error);
            });

            // Stop the audio after `duration` seconds
            sound.addEventListener('timeupdate', () => {
                if (sound.currentTime >= startTime + duration) {
                    sound.pause();
                }
            });
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }
}

export const audioService = new AudioService();