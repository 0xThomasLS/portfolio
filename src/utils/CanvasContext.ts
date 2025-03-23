export type CanvasOptions = {
  content: HTMLDivElement
  canvas: HTMLCanvasElement
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
    width: (this.font.size + 2) / 2,
    height: this.font.size + 2,
    refresh: 40,
    tickCount: 0,
  }

  public terminal = {
    x: 0,
    y: this.cursor.height,
    content: '',
    height: 0,
    translateY: 0,
    commands: [],
    workingDirectory: '/home/thomas',
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

  constructor(options: CanvasOptions) {
    this.content = options.content
    this.canvas = options.canvas
    this.ctx = options.canvas.getContext('2d') as CanvasRenderingContext2D
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
}
