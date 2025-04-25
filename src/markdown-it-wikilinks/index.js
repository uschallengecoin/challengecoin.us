/* eslint-disable */
import Plugin from 'markdown-it-regexp'
import extend from 'extend'
import sanitize from 'sanitize-filename'
import { Url } from 'reurl'
import fs from 'node:fs'

const INITIAL_HASH_REGEX = /^#/
const DIR_SEPARATOR_REGEX = /[/\\]/g

export default (options) => {
  const defaults = {
    baseURL: '/',
    relativeBaseURL: './',
    makeAllLinksAbsolute: false,
    uriSuffix: '.html',
    htmlAttributes: {
    },
    generatePagePathFromLabel: (label) => label,
    postProcessPagePath: (pagePath) => {
      pagePath = pagePath.trim()
      pagePath = pagePath.split('/').map(sanitize.sanitize).join('/')
      pagePath = pagePath.replace(/\s+/g, '_')
      return pagePath
    },
    postProcessPageHash: (pageHash) => {
      pageHash = pageHash.trim()
      pageHash = pageHash.split('/').map(sanitize.sanitize).join('/')
      pageHash = pageHash.replace(/\s+/g, '_')
      return pageHash
    },
    postProcessLabel: (label) => {
      label = label.trim()
      if (label.match(INITIAL_HASH_REGEX)) {
        label = label.replace(INITIAL_HASH_REGEX, '')
      } else {
        label = label.replace(/#[^#]*$/, '')
      }
      return label
    },
  }

  options = extend(true, defaults, options)

  function isAbsolute(pagePath) {
    return options.makeAllLinksAbsolute || pagePath.charCodeAt(0) === 0x2F/* / */
  }

  /**
   * Converts a path from the form '/path/to'
   * to an array of the form ['path', 'to']
   */
  function pathStrToArray(pathStr) {
    return (
      pathStr.split(DIR_SEPARATOR_REGEX)
        .filter((dirName) => !!dirName)
    )
  }

  return Plugin(
    /\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    (match, utils) => {
      let label = ''
      let pagePath = null
      const htmlAttrs = []
      let htmlAttrsString = ''

      const absoluteBaseDirs = pathStrToArray(options.baseURL)
      const relativeBaseDirs = pathStrToArray(options.relativeBaseURL)

      const { postProcessLabel } = options
      const postProcessPagePath = (
        options.postProcessPageName
        || options.postProcessPagePath
      )
      const { postProcessPageHash } = options
      const generatePagePathFromLabel = (
        options.generatePageNameFromLabel
        || options.generatePagePathFromLabel
      )

      const isSplit = !!match[3]
      if (isSplit) {
        label = match[3]
        pagePath = match[1]
      } else {
        label = match[1]
        pagePath = generatePagePathFromLabel(match[1])
      }


      // parse page path
      let pageUrl = new Url(pagePath)

      // run postprocessing
      if (pageUrl.file) {
        const file = postProcessPagePath(pagePath)
        pageUrl = new Url(file)
      }

      if (pageUrl.hash) {
        const hash = postProcessPageHash(pageUrl.hash)
        pageUrl = pageUrl.set({
          hash,
        })
      }

      label = postProcessLabel(label)

      if (isAbsolute(pagePath)) {
        const dirs = absoluteBaseDirs.concat(
          pageUrl.dirs || [],
        )
        pageUrl = pageUrl.set({
          root: '/',
          dirs,
        })
      } else if (pageUrl.file) { // relative
        const dirs = relativeBaseDirs.concat(
          pageUrl.dirs || [],
        )
        // obsidian absolute urls
        if (dirs.length > 1 && !dirs[0] != ('..')) {
          pageUrl = pageUrl.set({
            root: '/',
            dirs,
          })
        } else {
          pageUrl = pageUrl.set({
            root: null,
            dirs,
          })
        }
      }

      // add the URI suffix (e.g. `.html`)
      // but only if the filename is not empty
      if (pageUrl.file && options.uriSuffix) {
        pageUrl = pageUrl.set({
          file: pageUrl.file + options.uriSuffix,
        })
      }

      let href = pageUrl.toString()
      // Fix links to 3rd parties
      if (pageUrl.dirs.length >= 2 && pageUrl.dirs[1].startsWith('http')) {
        href = match[1]
      }

      const escapedHref = utils.escape(href)

      let tooltip = ''
      let filePath = `${match[1]}.md`
      while (filePath.startsWith('../')) {
        filePath = filePath.substr(3)
      }

      // ToDo
      // Add check if its md file
      try {
        const linkFile = fs.readFileSync(`docs/${filePath}`, 'utf8')
        const frontMatterRegex = /---(.*)---/gms.exec(linkFile)
        if (frontMatterRegex !== null && frontMatterRegex.length > 1) {
          frontMatterRegex[1].split('\n').forEach((line) => {
            const data = line.split(':')
            if (data[0] == 'summary') {
              tooltip = data[1].replaceAll('"', '').trim()
            }
          })
        }
      } catch (error) {

      }

      htmlAttrs.push(`href="${escapedHref}"`)
      for (const attrName in options.htmlAttributes) {
        const attrValue = options.htmlAttributes[attrName]
        htmlAttrs.push(`${attrName}="${attrValue}"`)
      }
      htmlAttrsString = htmlAttrs.join(' ')

      if (tooltip != '') {
        return `<VTooltip as-child><a ${htmlAttrsString}>${label}</a><template #content><div>${tooltip}</div></template></VTooltip>`
      }
      return `<a ${htmlAttrsString} title="${label}">${label}</a>`
    },
  )
}
