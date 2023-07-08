import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Body,
  UseGuards,
  NotFoundException,
  ValidationPipe,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks... --> []
  @Get()
  async getTasks(@Req() req): Promise<Task[]> {
    const { user } = req;
    return this.tasksService.getTasks(user);
  }

  // GET /tasks/:id --> { ... }
  @Get(':id')
  getOneTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  // POST /tasks
  @Post()
  async createTask(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  // PUT /tasks/:id --> { ... }
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  // DELETE /tasks/:id
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
