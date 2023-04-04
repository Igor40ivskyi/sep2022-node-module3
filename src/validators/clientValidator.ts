import Joi from "joi";

export class ClientValidator {
  private static nname = Joi.string().min(2).max(75).trim().lowercase();
  private static surname = Joi.string().min(2).max(100).trim().lowercase();
  private static nickname = Joi.string().min(2).max(20).trim().lowercase();
  private static wifename = Joi.string().min(2).max(75).trim().lowercase();
  private static car = Joi.string().min(2).max(20).trim().lowercase();
  private static age = Joi.number().min(1).max(126);
  private static profession = Joi.string().min(1).max(20).trim().lowercase();

  static create = Joi.object({
    name: this.nname.required(),
    surname: this.surname.required(),
    nickname: this.nickname.required(),
    wifename: this.wifename.required(),
    car: this.car.required(),
    age: this.age.required(),
    profession: this.profession.required(),
  });
}
