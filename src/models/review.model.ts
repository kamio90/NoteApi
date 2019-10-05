  
import * as mongoose from 'mongoose';
import Review from '../interfaces/review.interface';

const reviewSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
});

const reviewModel = mongoose.model<Review & mongoose.Document>('Review', reviewSchema);

export default reviewModel;