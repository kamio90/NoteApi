import HttpException from './http.exception';

class ReviewNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Review with id: ${id} not found`);
    }
}

export default ReviewNotFoundException;