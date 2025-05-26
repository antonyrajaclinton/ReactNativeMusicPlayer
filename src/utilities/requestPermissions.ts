import { request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

async function requestStoragePermission() {
    let permissionStatus;

    if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
            // Android 13+
            const results = await request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
            permissionStatus = results;
        } else {
            // Android < 13
            const results = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            permissionStatus = results;
        }
    } else if (Platform.OS === 'ios') {
        const results = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        permissionStatus = results;
    }

    if (permissionStatus === RESULTS.GRANTED) {
        console.log('Permission granted!');
        return true;
    } else {
        console.log('Permission denied or blocked.');
        return false;
    }
}
async function openAppSetting() {
    openSettings().catch(() => console.warn('cannot open settings'));
}


export { requestStoragePermission, openAppSetting };