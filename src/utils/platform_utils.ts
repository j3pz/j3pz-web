export class PlatformUtil {
    // --------------   平台   ------------------
    public static isMobile(): boolean {
        return /(mobile)/i.test(navigator?.userAgent ?? '');
    }

    public static isAndroid(): boolean {
        return /(android)/i.test(navigator?.userAgent ?? '');
    }

    public static isIOS(): boolean {
        return /(iphone|ipad|ipod)/i.test(navigator?.userAgent ?? '');
    }

    public static isIPad(): boolean {
        return /(ipad)/i.test(navigator?.userAgent ?? '');
    }

    public static isMac(): boolean {
        return !this.isMobile() && /Mac OS X/i.test(navigator?.userAgent ?? '');
    }

    // --------------   浏览器   ------------------

    public static isFireFox(): boolean {
        return /firefox/i.test(navigator?.userAgent ?? '');
    }
}
