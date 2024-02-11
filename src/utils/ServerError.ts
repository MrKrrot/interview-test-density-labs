interface IServerError {
  statusCode: number
}

class ServerError extends Error implements IServerError {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

export default ServerError
