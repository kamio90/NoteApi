import HttpException from "./http.exception";

class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(401, 'Auth token is missing');
    }
}

export default AuthenticationTokenMissingException;