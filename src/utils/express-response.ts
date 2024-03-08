export interface IResponse {
  statusCode(statusCode: number): CustomResponse;
  headers(headers: Object): CustomResponse;
  message(message: string): CustomResponse;
  data(data: Object | string): CustomResponse;
  response(): CustomResponseType;
}

export interface CustomResponseType {
  statusCode: number;
  headers: Object;
  message: string;
  data: Object | string;
}

export class CustomResponse implements IResponse {
  private _statusCode: number = 200;
  private _headers: Object = {};
  private _message: string = "";
  private _data: Object | string = "";

  statusCode(statusCode: number): CustomResponse {
    this._statusCode = statusCode;
    return this;
  }
  headers(headers: Object): CustomResponse {
    this._headers = headers;
    return this;
  }
  message(message: string): CustomResponse {
    this._message = message;
    return this;
  }
  data(data: Object | string): CustomResponse {
    this._data = data;
    return this;
  }
  response(): CustomResponseType {
    return {
      statusCode: this._statusCode,
      headers: this._headers,
      message: this._message,
      data: this._data,
    };
  }
}
