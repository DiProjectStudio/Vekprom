export function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Firefox')) {
        return 'firefox';
    } else if (userAgent.includes('Chrome')) {
        return 'chrome';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'safari';
    } else if (userAgent.includes('Edge')) {
        return 'edge';
    } else {
        return null;
    }
}
