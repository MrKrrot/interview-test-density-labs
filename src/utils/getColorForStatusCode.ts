import chalk from 'chalk'

const getColorForStatusCode = (statusCode: number) => {
  if (statusCode >= 500) return chalk.red(statusCode)
  if (statusCode >= 400) return chalk.yellow(statusCode)
  if (statusCode >= 300) return chalk.cyan(statusCode)
  if (statusCode >= 200) return chalk.green(statusCode)
  return chalk.white(statusCode)
}

export default getColorForStatusCode
