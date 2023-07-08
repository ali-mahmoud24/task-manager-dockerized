import { Schema, Prop, SchemaFactory } from '@nestJs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

// import { Task } from 'src/ninjas/schemas/task.schema';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ minlength: [6, 'Password must be min 6 characters'] })
  password: string;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  //   default: [],
  // })
  // tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
