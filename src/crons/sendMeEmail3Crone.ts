import { CronJob } from "cron";

import { EEmailActions } from "../enums";
import { emailService } from "../services";

const emailSender = async (): Promise<void> => {
  await emailService.sendMail(
    "ihor.sorokivskyi.xt.2017@lpnu.ua",
    EEmailActions.SEND_ME,
    { message: "it is just me third time testing the cron work" }
  );
};

export const sendMe3Email = new CronJob("10 * * * *", emailSender);
