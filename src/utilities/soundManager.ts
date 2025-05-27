// SoundManager.ts
import Sound from 'react-native-sound';

// Sound.setCategory('Playback');

class SoundManager {
    private static instance: SoundManager;
    private sounds: Sound | undefined;
    private isLoading = false;

    private volume: number = 1.0;



    public static getInstance() {
        if (!SoundManager.instance) {
            Sound.setCategory('Playback');
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    playSound(filePath: string) {



        if (this.isLoading) {
            console.warn("Sound is still loading, please wait...");
            return;
        }

        // Stop and release any current sound
        if (this.sounds) {
            // this.sounds?.stop();
            this.sounds?.release();
        }

        this.isLoading = true;

        this.sounds = new Sound(filePath, Sound.MAIN_BUNDLE, (error) => {
            this.isLoading = false;

            if (error) {
                console.error(`❌ Failed to load file: ${filePath}`, error);
                return;
            }

            this.sounds?.setVolume(this.volume);

            this.sounds?.play((success) => {
                if (!success) {
                    console.error("❌ Failed to play file");
                }

                // // Auto-release after playback
                // this.sounds?.release();
                // this.sounds = undefined;
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
    getSoundInstance() {
        return this.sounds;
    }


    // public setVolume(volume: number): void {
    //     this.volume = volume;
    //     Object.values(this.sounds).forEach((sound) => sound.setVolume(volume));
    // }



}

export default SoundManager.getInstance();
