export const cmdArgsParser = (args: string[]) => {
  const results = {
    options: [] as string[],
    args: [] as string[],
  }

  args.forEach((arg) => {
    if (arg.startsWith('-')) {
      results.options.push(arg.slice(1))
    } else {
      results.args.push(arg)
    }
  })

  return results
}
