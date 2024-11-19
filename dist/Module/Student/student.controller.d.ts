import { StudentService } from './student.service';
import { CreateStudentDto } from './DTO/Create.StudentDto';
import { UpdateStudentDto } from './DTO/Update.studentDto';
import { STUDENTS } from './entity/Student.entity';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getStudentDetails(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    getTeacherDetails(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    getMarkDetails(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    getProjectDetail(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    getAllDetails(): Promise<{
        success: boolean;
        data: any;
    }>;
    findAll(): Promise<STUDENTS[]>;
    findOne(id: number): Promise<STUDENTS>;
    create(createStudentDto: CreateStudentDto): Promise<STUDENTS>;
    getMyProfile(req: any): Promise<STUDENTS>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<void>;
    remove(id: number): Promise<void>;
}
