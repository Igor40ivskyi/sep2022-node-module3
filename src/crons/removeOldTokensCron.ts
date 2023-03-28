import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailActions } from "../enums";
import { Token, User } from "../models";
import { emailService } from "../services";

dayjs.extend(utc);

// const tokensRemover = async (): Promise<void> => {
//   console.log("Cron has started");
// };
//
// export const removeOldTokens = new CronJob("* * * * * *", tokensRemover);

// const previousMonth = dayjs().format("h:m a DD/MM/YYYY");

const tokensRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  const expiredTokens = await Token.find({
    createdAt: { $lte: previousMonth },
  });

  const ids = expiredTokens.map((record) => record._user_id);

  const users = await User.find({ _id: { $in: ids } });

  const emails = users.map((u) => u.email);

  await emailService.sendMail(emails, EEmailActions.REMINDER);

  // await Promise.all(
  //   users.map(async ({ email }) => {
  //     return emailService.sendMail(email, EEmailActions.REMINDER);
  //   })
  // );

  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldTokens = new CronJob("0 0 * * *", tokensRemover);
