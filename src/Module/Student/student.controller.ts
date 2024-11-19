import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './DTO/Create.StudentDto';
import { UpdateStudentDto } from './DTO/Update.studentDto';
import { JwtAuthGuard } from '../auth/Jwt-auth.guard';
import { STUDENTS } from './entity/Student.entity';

@Controller('student')
// @UseGuards(JwtAuthGuard)
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Get(':id/detail')
    async getStudentDetails(@Param('id') id: number) {
        const data = await this.studentService.getStudentDetailsById(id); // Convert string to number
        return {
            success: true,
            data,
        };
    }

    @Get(':id/teacher')
    async getTeacherDetails(@Param('id')id: number) {
        const data = await this.studentService.getStudentTeacherDetails(id);
        return {
            success: true,
            data,
        };
    }

    @Get(':id/mark')
    async getMarkDetails(@Param('id')id: number) {
        const data = await this.studentService.getStudentMarkDetails(id);
        return {
            success: true,
            data,
        };
    }

    @Get(':id/project')
    async getProjectDetail(@Param('id')id: number){
        const data = await this.studentService.getStudentProjectDetail(id);
        return{
            success: true,
            data,
        };
    }

    @Get('allDetail')
    async getAllDetails() {
        const data = await this.studentService.getAllDetails();
        return {
            success: true,
            data,
        };
    }

    @Get()
    findAll(){
        return this.studentService.findAll()
    }

    @Get(':id')
    findOne(@Param('id')id: number){
        return this.studentService.findOne(id)
    }

  
    @Post()
    create(@Body() createStudentDto: CreateStudentDto){
        return this.studentService.create(createStudentDto)
    }

    @Get('my-profile')
    async getMyProfile(@Request() req) {
      return this.studentService.findOne(req.user.id);
    }

  
    @Put(':id')
    update(@Param('id') id: number,@Body() updateStudentDto: UpdateStudentDto){
        return this.studentService.update(id,updateStudentDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.studentService.remove(id)
    }
}
