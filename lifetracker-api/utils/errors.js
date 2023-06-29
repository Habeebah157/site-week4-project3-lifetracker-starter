class ExpressError extends Errors {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}
