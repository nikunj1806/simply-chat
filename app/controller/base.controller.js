class BaseCtrl {
  constructor() {
    this.name = 'base';
  }

  getName() {
    return this.name;
  }
  response(res, status_code, message, data) {
    res.status(status_code).json({
      message: message,
      data: data,
    });
  }
}
export default BaseCtrl;