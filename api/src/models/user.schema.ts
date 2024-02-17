import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);

export type UserRegisterPayload = {
  fullname: string;
  email: string;
  password: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};
