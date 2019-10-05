import HttpException from './http.exception';

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, 'Bad auth token');
    }
}

export default WrongAuthenticationTokenException;