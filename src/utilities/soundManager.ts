// SoundManager.ts
import Sound from 'react-native-sound';

// Sound.setCategory('Playback');

class SoundManager {
    private static instance: SoundManager;
    private sounds: Sound | undefined;
    private volume: number = 1.0;



    public static getInstance() {
        if (!SoundManager.instance) {
            Sound.setCategory('Playback');
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    async playSound(filePath: string) {
        this.sounds?.release();
        this.sounds = new Sound(filePath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error(`Failed to load file: ${filePath}`, error);
            }
            this.sounds?.setVolume(this.volume);
            this.sounds?.play((success) => {
                if (!success) {
                    console.error(`Failed to play file`);
                }
            });
        });
    }
    pauseSound() {
        this.sounds?.pause();
    }
    resumeSound() {
        this.sounds?.play();
    }
    releaseSound() {
        this.sounds?.release();
    }


    // public setVolume(volume: number): void {
    //     this.volume = volume;
    //     Object.values(this.sounds).forEach((sound) => sound.setVolume(volume));
    // }



}

export default SoundManager.getInstance();
