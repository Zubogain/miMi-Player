export function millisToMinutesAndSeconds(ms: number): string {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + seconds;
}

// export function millisToMinutesAndSeconds(ms: number): string {
//     var minutes = Math.floor(ms / 60000);
//     var seconds = ((ms % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
// }

export function msToPrecent(ms1: number, ms2: number): number {
    return ms1 == ms2 ? 0 : (ms1 / ms2) * 100;
}

export function getFileName(filePath: string): string {
    return filePath.replace(/^.*[\\\/\\]/, "");
}