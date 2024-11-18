import { STUDENTS } from "src/Module/Student/entity/Student.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PROJECT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    STUDENT_ID: number;

    @Column()
    TITLE: string;

    @Column()
    PROJECT_SUBJECT: string;

    @Column()
    PROJECT_MARKS: number;

    @ManyToMany(()=>STUDENTS,(student)=> student.project)
    @JoinColumn({name:'studentid'})
    student: STUDENTS;
}
