export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ConnectionError extends CustomError {
  constructor(message: string = "Connection Error") {
    super(message, 503);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}
