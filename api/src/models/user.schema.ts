import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
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
export class UserRegisterPayload {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
export class UserLoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}