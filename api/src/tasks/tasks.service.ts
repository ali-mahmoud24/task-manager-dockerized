import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestJs/mongoose';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async getTasks(user: User): Promise<Task[]> {
    try {
      const loadedTasks = await this.taskModel
        .find({ user: user.id })
        .sort({ _id: -1 });
      return loadedTasks;
    } catch (err) {
      console.log(err);
    }
  }

  async getTask(id: string): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const loadedTask = await this.taskModel.findById(id);
    if (!loadedTask) {
      throw new NotFoundException('No such task.');
    }
    return loadedTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = {
      title: createTaskDto.title,
      user: user._id,
    };

    try {
      const result = await this.taskModel.create(newTask);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      runValidators: true,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
