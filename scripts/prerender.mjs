// Runs after the client and SSR builds. Renders the app to an HTML string
// and bakes it into dist/index.html, so the page has real content in its
// raw HTML instead of an empty <div id="root"> that only fills in once
// JavaScript runs. React then hydrates this markup in the browser.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const { render } = await import(
  path.resolve(root, 'dist-ssr/entry-server.js')
)
const appHtml = render()

const templatePath = path.resolve(root, 'dist/index.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
)

if (output === template) {
  throw new Error('Prerender failed: could not find <div id="root"></div> in dist/index.html')
}

fs.writeFileSync(templatePath, output)
console.log('Prerendered app HTML into dist/index.html')
