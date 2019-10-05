import HttpException from "./http.exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, "Wrong Credentials error");
  }
}

export default WrongCredentialsException;