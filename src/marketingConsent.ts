// Minimal marketing-consent gate. There's no cookie-consent banner on the
// site yet — this just defines the on/off switch so the Meta Pixel (and
// any future marketing tags) only ever activate after something has
// explicitly granted consent. Wire a real banner's "Accept" button to
// `grantMarketingConsent()` when one is built.
import { initMetaPixel } from './metaPixel'

const STORAGE_KEY = 'marketing-consent'

export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'granted'
  } catch {
    return false
  }
}

export function grantMarketingConsent() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'granted')
  } catch {
    /* ignore (e.g. private browsing storage restrictions) */
  }
  initMetaPixel()
}
