import type { CanvasContext } from '@/utils/CanvasContext'

export function getEnv(context: CanvasContext, name: string) {
  return context.terminal.vars[name]
}

export function setEnv(context: CanvasContext, name: string, value: string) {
  context.terminal.vars[name] = value
}

export function resolveEnv(context: CanvasContext, str: string) {
  return str.replace(/\$([a-zA-Z0-9]+)/g, (_, name) => getEnv(context, name))
}
