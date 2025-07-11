import videojs, { VideoJsPlayerPluginOptions } from 'video.js';

export interface playerOptions extends videojs.ComponentOptions {
    aspectRatio?: string | undefined;
    autoplay: videojs.Autoplay;
    bigPlayButton?: boolean | undefined;
    controlBar?: videojs.ControlBarOptions | false | undefined;
    textTrackSettings?: videojs.TextTrackSettingsOptions | undefined;
    controls?: boolean | undefined;
    defaultVolume?: number | undefined;
    fill?: boolean | undefined;
    fluid?: boolean | undefined;
    height?: number | undefined;
    html5?: any;
    inactivityTimeout?: number | undefined;
    language?: string | undefined;
    languages?: { [code: string]: videojs.LanguageTranslations } | undefined;
    liveui?: boolean | undefined;
    loop?: boolean | undefined;
    muted?: boolean | undefined;
    nativeControlsForTouch?: boolean | undefined;
    notSupportedMessage?: string | undefined;
    playbackRates?: number[] | undefined;
    playsinline?: boolean | undefined;
    noUITitleAttributes?: boolean | undefined;
    plugins?: Partial<VideoJsPlayerPluginOptions> | undefined;
    poster?: string | undefined;
    preload?: videojs.Preload | undefined;
    responsive?: boolean | undefined;
    sourceOrder?: boolean | undefined;
    sources: videojs.Tech.SourceObject[];
    src?: string | undefined;
    techOrder?: string[] | undefined;
    tracks?: videojs.TextTrackOptions[] | undefined;
    userActions?: videojs.UserActions | undefined;
    width?: number | undefined;

    audioOnlyMode?: boolean | undefined;
    audioPosterMode?: boolean | undefined;
    autoSetup?: boolean | undefined;
    breakpoints?: Partial<videojs.Breakpoint> | undefined;
    fullscreen?: { options: { navigationUI: "hide" } } | undefined;
    id?: string | undefined;
    liveTracker?: {
        trackingThreshold?: number | undefined;
        liveTolerance?: number | undefined;
    } | undefined;
    normalizeAutoplay?: boolean | undefined;
    preferFullWindow?: boolean | undefined;
    restoreEl?: boolean | Element | undefined;
    suppressNotSupportedError?: boolean | undefined;
    techCanOverridePoster?: boolean | undefined;
    "vtt.js"?: string | undefined;
    disablePictureInPicture?: boolean | undefined;
    enableSourceset?: boolean | undefined;
    retryOnError?: boolean | undefined;
}