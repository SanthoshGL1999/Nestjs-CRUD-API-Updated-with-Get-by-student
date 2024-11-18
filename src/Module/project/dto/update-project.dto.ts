import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class UpdateProjectDto{

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    STUDENT_ID?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    TITLE: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    PROJECT_SUBJECT: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    PROJECT_MARKS: number;
}
