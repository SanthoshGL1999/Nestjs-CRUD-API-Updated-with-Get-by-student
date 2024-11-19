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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Teacher_entity_1 = require("./entity/Teacher.entity");
const typeorm_2 = require("typeorm");
const Student_entity_1 = require("../Student/entity/Student.entity");
const Mark_entity_1 = require("../Mark/entity/Mark.entity");
const project_entity_1 = require("../project/entities/project.entity");
let TeacherService = class TeacherService {
    constructor(teacherRepository, studentRepository, markRepository, projectRepository) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.markRepository = markRepository;
        this.projectRepository = projectRepository;
    }
    async getTeacherDetailById(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException(`teacher with ID ${id} not found`);
        }
        const student = teacher.id
            ? await this.studentRepository.findOne({ where: { id: teacher.id } })
            : null;
        const marks = teacher.id
            ? await this.markRepository.findOne({ where: { id: teacher.id } })
            : null;
        const projects = teacher.id
            ? await this.projectRepository.findOne({ where: { id: teacher.id } })
            : null;
        return {
            teacher: {
                id: teacher.id,
                name: teacher.NAME,
            },
            student: student
                ? {
                    id: student.id,
                    name: student.NAME,
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
    async getTeacherStduentDetail(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException(`teacher with ID ${id} not found`);
        }
        const student = teacher.id
            ? await this.studentRepository.findOne({ where: { id: teacher.id } })
            : null;
        return {
            ...teacher,
            student: student
                ? {
                    id: student.id,
                    name: student.NAME,
                }
                : null
        };
    }
    async getTeacherMarkDetail(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException(`teacher with ID ${id} not found`);
        }
        const marks = teacher.id
            ? await this.markRepository.findOne({ where: { id: teacher.id } })
            : null;
        return {
            ...teacher,
            mark: marks
                ? {
                    id: marks.id,
                    tamil: marks.TAMIL,
                    english: marks.ENGLISH,
                    maths: marks.MATHS,
                    science: marks.SCIENCE,
                    social_science: marks.SOCIAL_SCIENCE,
                }
                : null
        };
    }
    async getTeacherProjectDetail(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException(`teacher with ID ${id} not found`);
        }
        const projects = teacher.id
            ? await this.projectRepository.findOne({ where: { id: teacher.id } })
            : null;
        return {
            ...teacher,
            project: projects
                ? {
                    id: projects.id,
                    title: projects.TITLE,
                    project_subject: projects.PROJECT_SUBJECT,
                    project_mark: projects.PROJECT_MARKS,
                }
                : null
        };
    }
    async getAllDetail() {
        const teachers = await this.teacherRepository.find();
        const students = await this.studentRepository.find();
        const marks = await this.markRepository.find();
        const projects = await this.projectRepository.find();
        const combinedData = teachers.map((teachers) => {
            const student = students.find((s) => s.id === teachers.id);
            const mark = marks.find((m) => m.id === teachers.id);
            const project = projects.find((p) => p.id === teachers.id);
            return {
                ...teachers,
                student: student ? { id: student.id, name: student.NAME } : null,
                mark: mark ? { id: mark.id, tamil: mark.TAMIL, english: mark.ENGLISH, maths: mark.MATHS, science: mark.SCIENCE, social_science: mark.SOCIAL_SCIENCE } : null,
                project: project ? { id: project.id, title: project.TITLE, project_subject: project.PROJECT_SUBJECT, project_mark: project.PROJECT_MARKS } : null,
            };
        });
        return combinedData;
    }
    findAll() {
        return this.teacherRepository.find();
    }
    findOne(id) {
        return this.teacherRepository.findOneBy({ id });
    }
    create(createTeacherDto) {
        return this.teacherRepository.save(createTeacherDto);
    }
    async update(id, updateTeacherDto) {
        await this.teacherRepository.update(id, updateTeacherDto);
    }
    async remove(id) {
        await this.teacherRepository.delete(id);
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Teacher_entity_1.TEACHERS)),
    __param(1, (0, typeorm_1.InjectRepository)(Student_entity_1.STUDENTS)),
    __param(2, (0, typeorm_1.InjectRepository)(Mark_entity_1.MARKS)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.PROJECT)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map