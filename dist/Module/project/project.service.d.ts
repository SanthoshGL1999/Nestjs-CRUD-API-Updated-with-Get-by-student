import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PROJECT } from './entities/project.entity';
import { Repository } from 'typeorm';
export declare class ProjectService {
    private projectRepository;
    constructor(projectRepository: Repository<PROJECT>);
    create(createProjectDto: CreateProjectDto): Promise<PROJECT>;
    findAll(): Promise<PROJECT[]>;
    findOne(id: number): Promise<PROJECT>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<void>;
    remove(id: number): Promise<void>;
}
