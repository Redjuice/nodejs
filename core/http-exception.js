class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = 400;
  }
}

class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0) {
    super();
    this.code = 201;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}

module.exports = { HttpException, ParameterException, Success };
