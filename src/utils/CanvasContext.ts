import imageToAscii from '@/utils/imageToAscii'

export type CanvasOptions = {
  content: HTMLDivElement
  canvas: HTMLCanvasElement
  emit: (event: 'close', ...args: any[]) => void
}

export class CanvasContext {
  public font = {
    size: 24,
    family: 'VT323',
    color: '#fff',
  }

  public cursor = {
    x: 0,
    y: 0,
    width: Math.floor((this.font.size * 1.35) / 2),
    height: Math.floor(this.font.size * 1.35),
    refresh: 40,
    tickCount: 0,
  }

  public terminal = {
    x: 0,
    y: this.cursor.height,
    content: [],
    height: 0,
    translateY: 0,
    commands: [],
    workingDirectory: '/home/thomas',
    images: [],
    vars: {
      USER: 'thomas',
      PATH: '/bin:/home/thomas/bin',
    },
  }

  public userInput = {
    x: 0,
    y: 0,
    base: '$> ',
    content: '',
  }

  public content: HTMLDivElement
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public emit: (event: 'close', ...args: any[]) => void

  constructor(options: CanvasOptions) {
    this.content = options.content
    this.canvas = options.canvas
    this.ctx = options.canvas.getContext('2d') as CanvasRenderingContext2D
    this.emit = options.emit
  }

  public splitLine(line: string) {
    const lines = []
    let current = ''

    for (let i = 0; i < line.length; i++) {
      current += line[i]
      const text = this.ctx.measureText(current + 'm')

      if (text.width > this.canvas.width) {
        lines.push(current)
        current = ''
      }
    }

    if (current != '') {
      lines.push(current)
    }

    return lines
  }

  public splitText(text: string) {
    const lines = text.split('\n')
    const result: string[] = []

    lines.forEach((line) => {
      const splittedLine = this.splitLine(line)

      splittedLine.forEach((line) => {
        result.push(line)
      })
    })

    return result
  }

  public addContent(value: string, type: 'command' | 'text' | 'image' = 'text') {
    this.terminal.content.push({
      type,
      value,
    })
  }

  public println(value: string, isCommand: boolean = false) {
    this.addContent(value + '\n', isCommand ? 'command' : 'text')
  }

  public async printImage(path: string, width: number, height: number) {
    this.addContent(await imageToAscii(path, width, height), 'image')
  }
}
