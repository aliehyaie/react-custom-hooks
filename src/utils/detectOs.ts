enum OS {
    Windows = 'Windows',
    Mac = 'Mac',
    Linux = 'Linux',
    iOS = 'iOS',
    Android = 'Android',
    Unknown = 'Unknown',
}

const detectOS = (userAgent?: string) => {
    if (typeof window !== 'undefined' && !userAgent) {
        userAgent = window.navigator.userAgent;
    }

    return {
        isIOS: userAgent === OS.iOS,
        isMac: userAgent === OS.Mac,
        isWindows: userAgent === OS.Windows,
        isLinux: userAgent === OS.Linux,
        isAndroid: userAgent === OS.Android,
        isUnknown: userAgent === OS.Unknown
    };
}

export default detectOS;