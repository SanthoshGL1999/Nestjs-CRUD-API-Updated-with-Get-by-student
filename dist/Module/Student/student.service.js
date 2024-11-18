"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Student_entity_1 = require("./entity/Student.entity");
const typeorm_2 = require("typeorm");
const Teacher_entity_1 = require("../Teacher/entity/Teacher.entity");
const Mark_entity_1 = require("../Mark/entity/Mark.entity");
const project_entity_1 = require("../project/entities/project.entity");
let StudentService = class StudentService {
    constructor(studentRepository, teacherRepository, markRepo, projectRepo) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.markRepo = markRepo;
        this.projectRepo = projectRepo;
    }
    async getStudentDetailsById(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        const teacher = student.id
            ? await this.teacherRepository.findOne({ where: { id: student.id } })
            : null;
        const marks = await this.markRepo.findOne({ where: { id: student.id } });
        console.log(marks);
        const projects = await this.projectRepo.findOne({ where: { id: student.id } });
        return {
            student: {
                id: student.id,
                name: student.NAME,
                age: student.AGE,
                course: student.COURSE,
                grade: student.GRADE,
                class_teacher: student.CLASS_TEACHER,
            },
            teacher: teacher
                ? {
                    id: teacher.id,
                    name: teacher.NAME,
                    subject: teacher.SUBJECT,
                }
                : null,
            mark: marks
                ? {
                    id: marks.id,
                    tamil: marks.TAMIL,
                    english: marks.ENGLISH,
                    maths: marks.MATHS,
                    science: marks.SCIENCE,
                    social_science: marks.SOCIAL_SCIENCE,
                }
                : null,
            project: projects
                ? {
                    id: projects.id,
                    title: projects.TITLE,
                    project_subject: projects.PROJECT_SUBJECT,
                    project_mark: projects.PROJECT_MARKS,
                }
                : null,
        };
    }
    async getStudentTeacherDetails(id) {
        const students = await this.studentRepository.findOne({ where: { id } });
        if (!students) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        const teacher = students.CLASS_TEACHER
            ? await this.teacherRepository.findOne({ where: { id: students.CLASS_TEACHER } })
            : null;
        return {
            ...students,
            teacher: teacher
                ? { id: teacher.id, name: teacher.NAME, subject: teacher.SUBJECT }
                : null,
        };
    }
    async getStudentMarkDetails(id) {
        const students = await this.studentRepository.findOne({ where: { id } });
        if (!students) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        const mark = students.id
            ? await this.markRepo.findOne({ where: { id: students.id } })
            : null;
        return {
            ...students,
            marks: mark
                ? { id: mark.id, tamil: mark.TAMIL, english: mark.ENGLISH, maths: mark.MATHS, science: mark.SCIENCE, social_science: mark.SOCIAL_SCIENCE }
                : null,
        };
    }
    async getAllDetails() {
        const students = await this.studentRepository.find();
        const teachers = await this.teacherRepository.find();
        const combinedData = students.map((student) => {
            const teacher = teachers.find((t) => t.id === student.CLASS_TEACHER);
            return {
                ...student,
                teacher: teacher ? { id: teacher.id, name: teacher.NAME, subject: teacher.SUBJECT } : null,
            };
        });
        return combinedData;
    }
    findAll() {
        return this.studentRepository.find();
    }
    findOne(id) {
        return this.studentRepository.findOneBy({ id });
    }
    create(createStudentDto) {
        return this.studentRepository.save(createStudentDto);
    }
    async update(id, updateStudentDto) {
        await this.studentRepository.update(id, updateStudentDto);
    }
    async remove(id) {
        await this.studentRepository.delete(id);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Student_entity_1.STUDENTS)),
    __param(1, (0, typeorm_1.InjectRepository)(Teacher_entity_1.TEACHERS)),
    __param(2, (0, typeorm_1.InjectRepository)(Mark_entity_1.MARKS)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.PROJECT)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map