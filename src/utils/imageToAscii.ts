function getFontRatio() {
  const pre = document.createElement('pre')
  pre.style.display = 'inline'
  pre.textContent = ' '

  document.body.appendChild(pre)
  const { width, height } = pre.getBoundingClientRect()
  document.body.removeChild(pre)

  return height / width
}

function clampDimensions(width: number, height: number, maxWidth: number, maxHeight: number) {
  const rectifiedWidth = Math.floor(getFontRatio() * width)

  if (height > maxHeight) {
    const reducedWidth = Math.floor((rectifiedWidth * maxHeight) / height)
    return [reducedWidth, maxHeight]
  }

  if (width > maxWidth) {
    const reducedHeight = Math.floor((height * maxWidth) / rectifiedWidth)
    return [maxWidth, reducedHeight]
  }

  return [rectifiedWidth, height]
}

function toGrayScale(r: number, g: number, b: number) {
  return 0.21 * r + 0.72 * g + 0.07 * b
}

function convertToGrayScales(context: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = context.getImageData(0, 0, width, height)

  const grayScales = []

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i]
    const g = imageData.data[i + 1]
    const b = imageData.data[i + 2]

    const grayScale = toGrayScale(r, g, b)
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale

    grayScales.push(grayScale)
  }

  context.putImageData(imageData, 0, 0)

  return grayScales
}

function getCharacterForGrayScale(grayScale: number) {
  const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. '
  return grayRamp[Math.ceil(((grayRamp.length - 1) * grayScale) / 255)]
}

function getAscii(grayScales: number[], width: number) {
  return grayScales.reduce((asciiImage, grayScale, index) => {
    let nextChars = getCharacterForGrayScale(grayScale)
    if ((index + 1) % width === 0) {
      nextChars += '\n'
    }

    return asciiImage + nextChars
  }, '')
}

function loadImage(path: string) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = path

    image.onload = () => {
      resolve(image)
    }
  })
}

export default async function imageToAscii(path: string, maxWidth: number, maxHeight: number) {
  const image: HTMLImageElement = await loadImage(path)
  const [width, height] = clampDimensions(image.width, image.height, maxWidth, maxHeight)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, 0, 0, width, height)

  const grayScales = convertToGrayScales(ctx, width, height)
  const asciiResult = getAscii(grayScales, width)

  return asciiResult
}
