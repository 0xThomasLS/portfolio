import type { CanvasContext } from '@/utils/CanvasContext'
import structure from '@/assets/structure'

export function concatPath(p1: string, p2: string) {
  if (p1[0] === '/') {
    return p1
  }

  return p1.split('/').reduce((acc, cur) => {
    if (cur === '..') {
      return acc.slice(0, acc.lastIndexOf('/'))
    }

    return (acc === '/' ? '/' : acc + '/') + cur
  }, p2)
}

export function resolveAbsolutePath(context: CanvasContext, strPath: string) {
  return (
    '/' +
    concatPath(strPath, context.terminal.workingDirectory)
      .split('/')
      .filter((item) => item !== '')
      .join('/')
  )
}

export function search(context: CanvasContext, strPath?: string) {
  let path = (
    strPath ? resolveAbsolutePath(context, strPath) : context.terminal.workingDirectory
  ).split('/')
  path[0] = '/'
  path = path.filter((item) => item != '')

  let current = structure
  for (const directory of path) {
    let found = false
    current.forEach((item) => {
      if (item[directory]) {
        current = item[directory]
        found = true
      }
    })

    if (!found) {
      return null
    }
  }

  return current
}
