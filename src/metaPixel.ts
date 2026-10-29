// Meta Pixel (Facebook Pixel) integration.
//
// There is no cookie-consent UI on this site yet, and the Pixel sets
// third-party marketing cookies, so it must not fire until something has
// actually granted marketing consent. Call `initMetaPixel()` only after
// that — e.g. from a "accept" handler once a consent banner exists. Until
// then this module intentionally does nothing.

const PIXEL_ID = '958661220276893'

type Fbq = {
  (...args: unknown[]): void
  queue: unknown[]
  loaded: boolean
  version: string
  callMethod?: (...args: unknown[]) => void
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let initialized = false

/**
 * Loads fbevents.js, initializes the Pixel, and fires the initial
 * PageView. Safe to call more than once — only the first call does
 * anything. Must only be called client-side, after marketing consent has
 * been granted.
 */
export function initMetaPixel() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  // Official Meta Pixel base code (https://www.facebook.com/business/help/952192354843755),
  // adapted minimally to satisfy TypeScript.
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    }) as Fbq
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq ??= fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)
  }

  window.fbq!('init', PIXEL_ID)
  window.fbq!('track', 'PageView')
}
