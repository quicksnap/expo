import { ExpoConfig } from '@expo/config-types';
export declare enum AppOwnership {
    Standalone = "standalone",
    Expo = "expo",
    Guest = "guest"
}
export declare enum ExecutionEnvironment {
    Bare = "bare",
    Standalone = "standalone",
    StoreClient = "storeClient"
}
export declare enum UserInterfaceIdiom {
    Handset = "handset",
    Tablet = "tablet",
    Unsupported = "unsupported"
}
export interface IOSManifest {
    buildNumber: string;
    platform: string;
    model: string | null;
    userInterfaceIdiom: UserInterfaceIdiom;
    systemVersion: string;
    [key: string]: any;
}
export interface AndroidManifest {
    versionCode: number;
    [key: string]: any;
}
export interface WebManifest {
    [key: string]: any;
}
interface NewManifestAsset {
    url: string;
}
export interface NewManifest {
    id: string;
    createdAt: string;
    extras?: {
        [k: string]: any;
    };
    runtimeVersion: string;
    launchAsset: NewManifestAsset;
    assets: NewManifestAsset[];
    updateMetadata: object;
    name?: undefined;
    hostUri?: undefined;
    developer?: undefined;
    web?: undefined;
    currentFullName?: undefined;
    ios?: undefined;
    android?: undefined;
    detach?: undefined;
    notification?: undefined;
    logUrl?: undefined;
    extra?: undefined;
    releaseChannel?: undefined;
    iconUrl?: undefined;
    publishedTime?: undefined;
    scheme?: undefined;
}
export interface LegacyManifest extends ExpoConfig {
    /** Published Apps Only */
    id?: string;
    currentFullName?: string;
    releaseId?: string;
    revisionId?: string;
    releaseChannel?: string;
    publishedTime?: string;
    packagerOpts?: {
        hostType?: string;
        dev?: boolean;
        strict?: boolean;
        minify?: boolean;
        urlType?: string;
        urlRandomness?: string;
        lanType?: string;
        [key: string]: any;
    };
    developer?: {
        tool?: string;
        [key: string]: any;
    };
    bundleUrl?: string;
    debuggerHost?: string;
    mainModuleName?: string;
    logUrl?: string;
    iconUrl?: string;
    hostUri?: string;
    scheme?: string;
}
export interface ManifestDerivedMethods {
    getSDKVersion(): string | null;
}
export declare type AppManifest = LegacyManifest | NewManifest;
export interface PlatformManifest {
    ios?: IOSManifest;
    android?: AndroidManifest;
    web?: WebManifest;
    detach?: {
        scheme?: string;
        [key: string]: any;
    };
    logUrl?: string;
    scheme?: string;
    hostUri?: string;
    developer?: string;
    [key: string]: any;
}
export interface NativeConstants {
    name: 'ExponentConstants';
    appOwnership: AppOwnership | null;
    debugMode: boolean;
    deviceName?: string;
    deviceYearClass: number | null;
    executionEnvironment: ExecutionEnvironment;
    experienceUrl: string;
    expoRuntimeVersion: string | null;
    /**
     * The version string of the Expo client currently running.
     * Returns `null` on and bare workflow and web.
     */
    expoVersion: string | null;
    isDetached?: boolean;
    intentUri?: string;
    /**
     * @deprecated Constants.installationId is deprecated in favor of generating your own ID and
     * storing it. This API will be removed in SDK 44.
     */
    installationId: string;
    isDevice: boolean;
    isHeadless: boolean;
    linkingUri: string;
    nativeAppVersion: string | null;
    nativeBuildVersion: string | null;
    manifest: AppManifest;
    manifestDerivedMethods: ManifestDerivedMethods;
    sessionId: string;
    statusBarHeight: number;
    systemFonts: string[];
    systemVersion?: number;
    platform?: PlatformManifest;
    [key: string]: any;
    getWebViewUserAgentAsync: () => Promise<string | null>;
}
export interface Constants extends NativeConstants {
    /**
     * @deprecated Constants.deviceId is deprecated in favor of generating your own ID and storing it.
     * This API will be removed in SDK 44.
     */
    deviceId?: string;
    /**
     * @deprecated Constants.linkingUrl has been renamed to Constants.linkingUri. Consider using the
     * Linking API directly. Constants.linkingUrl will be removed in SDK 44.
     */
    linkingUrl?: string;
    /**
     * @warning do not use this property. Use `manifest` by default.
     *
     * In certain cases accessing manifest via this property
     * suppresses important warning about missing manifest.
     */
    __unsafeNoWarnManifest: AppManifest;
}
export {};
