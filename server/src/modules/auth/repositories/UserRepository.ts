import * as AWS from "aws-sdk";
import { v4 } from "uuid";
import db from "database/models";
import { IRegisterRequest, IUser } from "../requestTypes";

const User = db.User;

class UserRepository {
  async createUser(
    user: Omit<IRegisterRequest, "redirectURL">
  ): Promise<IUser> {
    const newUser = await User.create({
      id: v4(),
      ...user,
      password: await User.generateHash(user.password),
    });

    return newUser.dataValues;
  }
  async getUser(where = {}): Promise<IUser | null> {
    const user = await User.findOne({
      where,
    });

    return user.dataValues;
  }

  async validatePassword(plainPassword: string, hashedPassword: string) {
    return User.isPasswordValid(plainPassword, hashedPassword);
  }
}

export const userRepository = new UserRepository();

export type UserRepoType = typeof userRepository;
