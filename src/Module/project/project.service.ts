import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PROJECT } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(PROJECT)
              private projectRepository: Repository<PROJECT>,
){}
  create(createProjectDto: CreateProjectDto): Promise<PROJECT>{
    return this.projectRepository.save(createProjectDto);
  }

  findAll(): Promise<PROJECT[]>{
    return this.projectRepository.find();
  }

  findOne(id: number): Promise<PROJECT>{
    return this.projectRepository.findOneBy({id});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<void>{
    await this.projectRepository.update(id,updateProjectDto);
  }

  async remove(id: number): Promise<void>{
    await this.projectRepository.delete(id);
  }
}
