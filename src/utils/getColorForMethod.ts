import chalk from 'chalk'

const getColorForMethod = (method: string) => {
  if (method === 'GET') return chalk.green(method)
  if (method === 'POST') return chalk.yellow(method)
  if (method === 'PUT') return chalk.blue(method)
  if (method === 'PATCH') return chalk.magenta(method)
  if (method === 'DELETE') return chalk.red(method)
  return chalk.white(method)
}

export default getColorForMethod
