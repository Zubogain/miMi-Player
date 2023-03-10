export const msToMinutesAndSeconds = (ms: number): string => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
};

export const msToPrecent = (ms1: number, ms2: number): number => {
    return ms1 == ms2 ? 0 : (ms1 / ms2) * 100;
};

export const getFileName = (filePath: string): string => {
    return filePath.replace(/^.*[\\\/\\]/, "");
};