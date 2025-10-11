import { filesystem } from '@/datas/filesystem'

export const getNodeFromPath = (path: string, cwd: string) => {
  const basePath = path.startsWith('/') ? [] : cwd.split('/').filter(Boolean)
  const targetPath = path.split('/').filter(Boolean)

  const resolvedPathSegments: string[] = [...basePath]
  for (const segment of targetPath) {
    if (segment === '.') continue
    if (segment === '..') resolvedPathSegments.pop()
    else resolvedPathSegments.push(segment)
  }

  let currentNode: any = filesystem['/']
  for (const segment of resolvedPathSegments) {
    if (currentNode && typeof currentNode === 'object' && segment in currentNode) {
      currentNode = currentNode[segment]
    } else return null
  }

  return currentNode
}
