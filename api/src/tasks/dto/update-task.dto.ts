import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

import { IsOptional } from 'class-validator';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  //   @IsOptional()
  //   readonly timeSpent: Time;
}
