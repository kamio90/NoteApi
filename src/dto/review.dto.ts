import { IsString } from 'class-validator';

class CreateReviewDto{
    @IsString()
    public title: string;

    @IsString()
    public description: string;
}

export default CreateReviewDto;