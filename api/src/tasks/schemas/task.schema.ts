import { Schema, Prop, SchemaFactory } from '@nestJs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export enum Status {
  COMPLETED = 'Completed',
  UNCOMPLETED = 'Uncompleted',
}

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

@Schema()
export class Task extends Document {
  @Prop()
  title: string;

  @Prop({ default: Status.UNCOMPLETED })
  status: Status;

  @Prop({
    required: false,
    type: Object,
    default: { hours: 0, minutes: 0, seconds: 0 },
  })
  timeSpent: Time;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
