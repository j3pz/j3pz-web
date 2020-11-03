export class PlatformUtil {
    // --------------   平台   ------------------
    public static isMobile(): boolean {
        if (typeof window === 'object') {
            return /(mobile)/i.test(navigator.userAgent);
        }
        return false;
    }

    public static isAndroid(): boolean {
        if (typeof window === 'object') {
            return /(android)/i.test(navigator.userAgent);
        }
        return false;
    }

    public static isIOS(): boolean {
        if (typeof window === 'object') {
            return /(iphone|ipad|ipod)/i.test(navigator.userAgent);
        }
        return false;
    }

    public static isIPad(): boolean {
        if (typeof window === 'object') {
            return /(ipad)/i.test(navigator.userAgent);
        }
        return false;
    }

    public static isMac(): boolean {
        if (typeof window === 'object') {
            return !this.isMobile() && /Mac OS X/i.test(navigator.userAgent);
        }
        return false;
    }

    // --------------   浏览器   ------------------

    public static isFireFox(): boolean {
        if (typeof window === 'object') {
            return /firefox/i.test(navigator.userAgent);
        }
        return false;
    }
}
