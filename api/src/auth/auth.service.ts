import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { EmailTakenException } from "src/exceptions/EmailTakenException";
import { InvalidCredentialException } from "src/exceptions/InvalidCredentialsException";
import {
  User,
  UserDocument,
  UserRegisterPayload,
  UserLoginPayload,
} from "src/models/user.schema";

export type LoginResponse = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async register(payload: UserRegisterPayload): Promise<User> {
    const foundUser = await this.userModel
      .findOne({ email: payload.email })
      .exec();
    if (foundUser) {
      throw new EmailTakenException();
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(payload.password, salt);
    const userCreateData = {
      fullname: payload.fullname,
      email: payload.email,
      password: hash,
    };
    const newUser = new this.userModel(userCreateData);
    return newUser.save();
  }

  async login(payload: UserLoginPayload): Promise<LoginResponse> {
    const foundUser = await this.userModel
      .findOne({ email: payload.email })
      .exec();
    if (!foundUser) {
      throw new InvalidCredentialException();
    }
    const { password } = foundUser;
    const validPasswordComparison = await bcrypt.compare(
      payload.password,
      password,
    );
    if (!validPasswordComparison) {
      throw new InvalidCredentialException();
    }
    const data = { email: payload.email };
    return {
      token: this.jwtService.sign(data),
    };
  }
}
