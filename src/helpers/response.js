export default class response {
  static errorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: statusCode, message });
  }
}
