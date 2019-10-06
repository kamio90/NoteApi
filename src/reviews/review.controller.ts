import * as express from 'express';
//
import ReviewNotFoundException from '../exceptions/reviewNotFound.exception';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreateReviewDto from '../dto/review.dto';
import Review from '../interfaces/review.interface';
import reviewModel from '../models/review.model';

class ReviewController implements Controller {
    public path = '/review';
    public router = express.Router();
    private review = reviewModel;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.getAllReview);
        this.router.get(`${this.path}/:id`, this.getReviewById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateReviewDto, true), this.modifyReview)
            .delete(`${this.path}/:id`, this.deleteReview)
            .post(this.path, authMiddleware, validationMiddleware(CreateReviewDto), this.createReview);
    }

    private getAllReview = async (req: express.Request, res: express.Response) => {
        const reviews = await this.review.find()
            .populate('userId', '-password');
        res.send(reviews);
    }

    private getReviewById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const singleReview = await this.review.findById(id);
        if (singleReview) {
            res.send(singleReview);
        } else {
            next(new ReviewNotFoundException(id));
        }
    }

    private modifyReview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const reviewData: Review = req.body;
        const singleReview = await this.review.findByIdAndUpdate(id, reviewData, {
            new: true
        });
        if (singleReview) {
            res.send(singleReview);
        } else {
            next(new ReviewNotFoundException(id));
        }
    }

    private createReview = async (req: RequestWithUser, res: express.Response) => {
        const reviewData: CreateReviewDto = req.body;
        const createdReview = new this.review({
            ...reviewData,
            userId: req.user._id
        });
        const savedReview = await createdReview.save();
        res.send(savedReview);
    }

    private deleteReview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        const successResponse = await this.review.findByIdAndDelete(id);
        if (successResponse) {
            res.send(200);
        } else {
            next(new ReviewNotFoundException(id));
        }
    }
}

export default ReviewController;