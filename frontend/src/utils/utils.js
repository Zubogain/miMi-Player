export function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function msToPrecent(ms1, ms2) {
    return ms1 == ms2 ? 0 : (ms1 / ms2) * 100;
}

export function getFileName(filePath) {
    return filePath.replace(/^.*[\\\/\\]/, "");
}