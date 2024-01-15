import { Howl } from 'howler';
import sound from '../assets/sound/alarm.mp3';
const s = sound;

export const playAlarmSound = () => {
    const src = s;
    const sound = new Howl({
        src,
        html5: true,
    });
    sound.play();
}