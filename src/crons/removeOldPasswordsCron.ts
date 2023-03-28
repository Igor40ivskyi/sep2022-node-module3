import { CronJob } from "cron";
import dayjs from "dayjs";

import { OldPassword } from "../models/OldPassword.model";

const oldPasswordRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({ createdAt: { $lte: previousYear } });
};

export const removeOldPasswords = new CronJob("0 0 * * *", oldPasswordRemover);
