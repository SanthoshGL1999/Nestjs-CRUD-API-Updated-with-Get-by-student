import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<import("./entities/project.entity").PROJECT>;
    findAll(): Promise<import("./entities/project.entity").PROJECT[]>;
    findOne(id: number): Promise<import("./entities/project.entity").PROJECT>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<void>;
    remove(id: number): Promise<void>;
}
