import RNFS from 'react-native-fs';
import { MusicListTypes } from './global.types';

async function recursiveFileSearchByDirectory(dirPath: string, fileExtension: string = '', collected: MusicListTypes[] = []) {
    try {
        const musicDir = RNFS.ExternalStorageDirectoryPath;
        const items = await RNFS.readDir(dirPath);
        for (const item of items) {
            if (item && !item.name.startsWith('.') && !item.path.includes('/Android')) {
                // console.log(item);
                
                if (item.isFile() && ((!fileExtension) || (fileExtension && item.name.toLowerCase().endsWith(fileExtension)))) {
                    collected.push({
                        fileName: item.name,
                        filePath: item.path,
                        fileSize: item.size
                    });
                } else if (item.isDirectory()) {
                    await recursiveFileSearchByDirectory(item.path, fileExtension, collected);
                }
            }
        }
    } catch (e: any) {
        console.warn('Error reading dir:', dirPath, e.message);
    }
    return collected;
}
async function readAllFilesByExtension(fileExtension: string = '', fileDirectory: string = '') {
    const parentDirectory = fileDirectory || RNFS.ExternalStorageDirectoryPath;
    return recursiveFileSearchByDirectory(parentDirectory, fileExtension);
}


export { readAllFilesByExtension };