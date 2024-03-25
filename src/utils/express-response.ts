import { CookieOptions } from "express";

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
  deleteCookie: string;
  cookie: {
    name: string;
    val: string;
    options: CookieOptions;
  } | null;
}

export class CustomResponse implements IResponse {
  private _statusCode: number = 200;
  private _headers: Object = {};
  private _message: string = "";
  private _data: Object | string = "";
  private _deleteCookie: string = "";
  private _cookie: {
    name: string;
    val: string;
    options: CookieOptions;
  } | null = null;

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
  cookie(name: string, val: string, options: CookieOptions): CustomResponse {
    this._cookie = { name, val, options };
    return this;
  }
  deleteCookie(name: string): CustomResponse {
    this._deleteCookie = name;
    return this;
  }
  data(data: Object | string): CustomResponse {
    if (typeof data === "object" && "password" in data)
      delete (data as any).password;

    this._data = data;
    return this;
  }
  response(): CustomResponseType {
    return {
      statusCode: this._statusCode,
      headers: this._headers,
      message: this._message,
      data: this._data,
      cookie: this._cookie,
      deleteCookie: this._deleteCookie,
    };
  }
}
