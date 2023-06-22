import { Model, model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    age: {
      type: Number,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    avatar: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface IUserMethods {
  nameWithAge(): void;
}

interface IUserVirtuals {
  nameWithSurname: string;
}

interface IUserModel extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Piatov`;
});

userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} years old`;
  },
};

userSchema.statics = {
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

export const User = model<IUser, IUserModel>("user", userSchema);
