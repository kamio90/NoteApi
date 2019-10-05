import { IsString } from 'class-validator';

class LogInDto {
    @IsString()
    public emial: string;

    @IsString()
    public password: string;
}

export default LogInDto;