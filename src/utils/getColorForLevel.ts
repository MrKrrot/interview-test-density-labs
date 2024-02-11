import chalk from 'chalk'

type ChalkColorFunction = (text: string) => string

interface LevelColors {
  [key: string]: ChalkColorFunction
}

const levelColors: LevelColors = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.green,
  debug: chalk.blue
}

const getColorForLevel = (level: string) => levelColors[level.toLowerCase()] || chalk.reset

export default getColorForLevel
