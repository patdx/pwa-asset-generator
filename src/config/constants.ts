import { Orientation } from '../models/image'
import { HTMLMetaNames, HTMLMetaSelector } from '../models/meta'
import APPLE_HIG_SPLASH_SCREEN_FALLBACK_DATA from './apple-fallback-data.json'

const HTML_META_ORDERED_SELECTOR_LIST: HTMLMetaSelector[] = [
  {
    name: HTMLMetaNames.favicon,
    selector: 'link[rel="icon"]',
  },
  {
    name: HTMLMetaNames.msTileImage,
    selector: 'meta[name*="msapplication-"]',
  },
  {
    name: HTMLMetaNames.appleTouchIcon,
    selector: 'link[rel="apple-touch-icon"]',
  },
  {
    name: HTMLMetaNames.appleMobileWebAppCapable,
    selector: 'meta[name="apple-mobile-web-app-capable"]',
  },
  {
    name: HTMLMetaNames.appleLaunchImage,
    selector:
      'link[rel="apple-touch-startup-image"]:not([media^="(prefers-color-scheme: dark)"])',
  },
  {
    name: HTMLMetaNames.appleLaunchImageDarkMode,
    selector:
      'link[rel="apple-touch-startup-image"][media^="(prefers-color-scheme: dark)"]',
  },
]

export default {
  FLAGS: {
    background: {
      type: 'string',
      shortFlag: 'b',
      default: 'transparent',
    },
    manifest: {
      type: 'string',
      shortFlag: 'm',
    },
    index: {
      type: 'string',
      shortFlag: 'i',
    },
    path: {
      type: 'string',
      shortFlag: 'a',
    },
    pathOverride: {
      type: 'string',
      shortFlag: 'v',
    },
    opaque: {
      type: 'boolean',
      shortFlag: 'o',
      default: true,
    },
    scrape: {
      type: 'boolean',
      shortFlag: 's',
      default: true,
    },
    padding: {
      type: 'string',
      shortFlag: 'p',
      default: '10%',
    },
    type: {
      type: 'string',
      shortFlag: 't',
      default: 'jpg',
    },
    quality: {
      type: 'number',
      shortFlag: 'q',
      default: 70,
    },
    splashOnly: {
      type: 'boolean',
      shortFlag: 'h',
      default: false,
    },
    iconOnly: {
      type: 'boolean',
      shortFlag: 'c',
      default: false,
    },
    landscapeOnly: {
      type: 'boolean',
      shortFlag: 'l',
      default: false,
    },
    portraitOnly: {
      type: 'boolean',
      shortFlag: 'r',
      default: false,
    },
    log: {
      type: 'boolean',
      shortFlag: 'g',
      default: true,
    },
    singleQuotes: {
      type: 'boolean',
      shortFlag: 'u',
      default: false,
    },
    xhtml: {
      type: 'boolean',
      shortFlag: 'x',
      default: false,
    },
    favicon: {
      type: 'boolean',
      shortFlag: 'f',
      default: false,
    },
    mstile: {
      type: 'boolean',
      shortFlag: 'w',
      default: false,
    },
    maskable: {
      type: 'boolean',
      shortFlag: 'e',
      default: true,
    },
    darkMode: {
      type: 'boolean',
      shortFlag: 'd',
      default: false,
    },
    noSandbox: {
      type: 'boolean',
      shortFlag: 'n',
      default: false,
    },
  } as const,

  CHROME_LAUNCH_ARGS: [
    '--disable-dev-shm-usage',
    '--log-level=3', // Fatal only
    '--no-default-browser-check',
    '--disable-infobars',
    '--no-experiments',
    '--ignore-gpu-blacklist',
    '--disable-gpu',
    '--disable-default-apps',
    '--enable-features=NetworkService',
    '--disable-features=TranslateUI',
    '--disable-extensions',
    '--disable-component-extensions-with-background-pages',
    '--disable-background-networking',
    '--disable-backgrounding-occluded-windows',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-file-system',
    '--disable-permissions-api',
    '--incognito',
    '--disable-sync',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-first-run',
    '--headless',
    '--force-color-profile=srgb',
  ],

  CHROME_LAUNCHER_DEBUG_PORT: 9222,
  CHROME_LAUNCHER_MAX_CONN_RETRIES: 10,
  EMULATED_USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  APPLE_HIG_SPLASH_SCR_SPECS_URL:
    'https://developer.apple.com/design/human-interface-guidelines/layout/',

  // Apple platform specs: https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/
  // https://web.dev/apple-touch-icon/
  APPLE_ICON_SIZES: [180],

  // Android platform specs: https://developers.google.com/web/fundamentals/web-app-manifest/#icons
  // Windows platform specs: https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/get-started
  MANIFEST_ICON_SIZES: [192, 512],

  // MSDN static tiles specs: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85)?redirectedfrom=MSDN#static-tiles
  MS_ICON_SIZES: [128, 270, 558, { width: 558, height: 270 }],

  FAVICON_SIZES: [196],

  HTML_META_ORDERED_SELECTOR_LIST,

  FAVICON_FILENAME_PREFIX: 'favicon',
  APPLE_ICON_FILENAME_PREFIX: 'apple-icon',
  APPLE_SPLASH_FILENAME_PREFIX: 'apple-splash',
  APPLE_SPLASH_FILENAME_DARK_MODE_POSTFIX: '-dark',
  MANIFEST_ICON_FILENAME_PREFIX: 'manifest-icon',
  MS_ICON_FILENAME_PREFIX: 'mstile-icon',
  APPLE_HIG_SPLASH_SCR_SPECS_DATA_GRID_SELECTOR: 'table tbody tr',
  WAIT_FOR_SELECTOR_TIMEOUT: 1000,
  BROWSER_TIMEOUT: 10000,

  FAVICON_META_HTML: (
    size: number,
    url: string,
    mimeType: string,
    xhtml: boolean,
  ): string =>
    `<link rel="icon" type="${mimeType}" sizes="${size}x${size}" href="${url}"${
      xhtml ? ' /' : ''
    }>
`,

  MSTILE_SIZE_ELEMENT_NAME_MAP: {
    '128x128': 'square70x70logo',
    '270x270': 'square150x150logo',
    '558x558': 'square310x310logo',
    '558x270': 'wide310x150logo',
  } as Record<string, string>,

  MSTILE_IMAGE_META_HTML: (
    tileName: string,
    url: string,
    xhtml: boolean,
  ): string =>
    `<meta name="msapplication-${tileName}" content="${url}"${
      xhtml ? ' /' : ''
    }>
`,

  SHELL_HTML_FOR_LOGO: (
    imgPath: string,
    padding: string,
    backgroundColor = 'transparent',
  ): string => `\
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      background: ${backgroundColor};
      height: 100vh;
      padding: ${padding};
      box-sizing: border-box;
    }
    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: block;
      object-fit: contain;
    }
  </style>
</head>
<body>
<img src="${imgPath}">
</body>
</html>`,

  APPLE_TOUCH_ICON_META_HTML: (url: string, xhtml: boolean): string =>
    `<link rel="apple-touch-icon" href="${url}"${xhtml ? ' /' : ''}>
`,

  APPLE_LAUNCH_SCREEN_META_HTML: (
    width: number,
    height: number,
    url: string,
    scaleFactor: number,
    orientation: Orientation,
    darkMode: boolean,
    xhtml: boolean,
  ): string => {
    if (orientation === 'portrait') {
      return `\
<link rel="apple-touch-startup-image" href="${url}" media="${
        darkMode ? '(prefers-color-scheme: dark) and ' : ''
      }(device-width: ${width / scaleFactor}px) and (device-height: ${
        height / scaleFactor
      }px) and (-webkit-device-pixel-ratio: ${scaleFactor}) and (orientation: ${orientation})"${
        xhtml ? ' /' : ''
      }>
`
    }

    // As weird as it gets, Apple expects same device width and height values from portrait orientation, for landscape
    return `\
<link rel="apple-touch-startup-image" href="${url}" media="${
      darkMode ? '(prefers-color-scheme: dark) and ' : ''
    }(device-width: ${height / scaleFactor}px) and (device-height: ${
      width / scaleFactor
    }px) and (-webkit-device-pixel-ratio: ${scaleFactor}) and (orientation: ${orientation})"${
      xhtml ? ' /' : ''
    }>
`
  },

  APPLE_HIG_SPLASH_SCREEN_FALLBACK_DATA,
}
