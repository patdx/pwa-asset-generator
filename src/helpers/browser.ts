/* eslint-disable no-console */
import puppeteer, { Browser } from 'puppeteer'
import type { LaunchOptions as PuppeteerNodeLaunchOptions } from '@puppeteer/browsers'
import {
  launch,
  LaunchedChrome,
  Options as ChromeLauncherOptions,
} from 'chrome-launcher'
import find from 'find-process'
import { get } from 'http'
import preLogger from './logger'
import constants from '../config/constants'

interface BrowserVersionInfo {
  Browser: string
  webSocketDebuggerUrl: string
  'Protocol-Version': string
  'User-Agent': string
  'V8-Version': string
  'Webkit-Version': string
}

const getLocalBrowserInstance = async (
  launchArgs: PuppeteerNodeLaunchOptions,
  noSandbox: boolean,
): Promise<Browser> => {
  return puppeteer.launch({
    ...launchArgs,
    ...(noSandbox && {
      args: [
        ...(launchArgs.args ?? []),
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    }),
  })
}

const launchSystemBrowser = (): Promise<LaunchedChrome> => {
  const launchOptions: ChromeLauncherOptions = {
    chromeFlags: constants.CHROME_LAUNCH_ARGS,
    logLevel: 'silent',
    maxConnectionRetries: constants.CHROME_LAUNCHER_MAX_CONN_RETRIES,
  }

  return launch(launchOptions)
}

const getLaunchedChromeVersionInfo = (
  chrome: LaunchedChrome,
): Promise<BrowserVersionInfo> => {
  return new Promise((resolve, reject) => {
    get(`http://localhost:${chrome.port}/json/version`, (res) => {
      let data = ''
      res.setEncoding('utf8')

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on('error', (err) => reject(err))
  })
}

const getSystemBrowserInstance = async (
  chrome: LaunchedChrome,
  launchArgs?: PuppeteerNodeLaunchOptions,
): Promise<Browser> => {
  const chromeVersionInfo = await getLaunchedChromeVersionInfo(chrome)

  return puppeteer.connect({
    ...launchArgs,
    browserWSEndpoint: chromeVersionInfo.webSocketDebuggerUrl,
  })
}

export const getBrowserInstance_real = async (
  launchArgs: PuppeteerNodeLaunchOptions,
  noSandbox: boolean,
): Promise<{ chrome: LaunchedChrome | undefined; browser: Browser }> => {
  const LAUNCHER_CONNECTION_REFUSED_ERROR_CODE = 'ECONNREFUSED'
  const LAUNCHER_NOT_INSTALLED_ERROR_CODE = 'ERR_LAUNCHER_NOT_INSTALLED'
  const logger = preLogger(getBrowserInstance_real.name)

  let browser: Browser
  let chrome: LaunchedChrome | undefined

  try {
    chrome = await launchSystemBrowser()
    browser = await getSystemBrowserInstance(chrome, launchArgs)
  } catch (e) {
    const error = e as { port: number; code: string }
    // Kill chrome instance manually in case of connection error
    if (error.code === LAUNCHER_CONNECTION_REFUSED_ERROR_CODE) {
      logger.warn(
        `Chrome launcher could not connect to your system browser. Is your port ${error.port} accessible?`,
      )
      const prc = await find('port', error.port)
      prc.forEach((pr) => {
        logger.log(
          `Killing incompletely launched system chrome instance on pid ${pr.pid}`,
        )
        process.kill(pr.pid)
      })
    }

    // Inform user that system chrome is not found
    if (error.code === LAUNCHER_NOT_INSTALLED_ERROR_CODE) {
      logger.warn('Looks like Chrome is not installed on your system')
    }

    browser = await getLocalBrowserInstance(launchArgs, noSandbox)
  }

  return { browser, chrome }
}

export const killBrowser = async (
  browser: Browser,
  chrome: LaunchedChrome | undefined,
): Promise<void> => {
  console.log(`killing browser instance`)
  if (chrome) {
    await browser.disconnect()
    await chrome.kill()
  } else {
    await browser.close()
  }
}

const getBrowserInstance = async (
  launchArgs: PuppeteerNodeLaunchOptions,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  _noSandbox: boolean,
): Promise<{ chrome: LaunchedChrome | undefined; browser: Browser }> => {
  console.log(`getting browser instance`)
  const browser = await getLocalBrowserInstance(
    launchArgs,
    true, // need noSandbox for CI
    //  noSandbox
  )
  console.log(`got browser instance`)

  return { chrome: undefined, browser }
}

export default {
  getBrowserInstance,
  killBrowser,
}
