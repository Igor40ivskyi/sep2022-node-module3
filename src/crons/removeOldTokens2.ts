import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailActions } from "../enums";
import { Token, User } from "../models";
import { emailService } from "../services";

dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
  const removeBefore_Date = dayjs().utc().subtract(1, "month");

  const expiredTokens = await Token.find({
    createdAt: { $lte: removeBefore_Date },
  });

  const ids = expiredTokens.map((record) => record._user_id);

  const users = await User.find({ _id: { $in: ids } });

  const emails = users.map((user) => user.email);

  emailService.sendMail(emails, EEmailActions.REMINDER);
};

export const removeOldTokensV2 = new CronJob("0 0 * * *", tokensRemover);
