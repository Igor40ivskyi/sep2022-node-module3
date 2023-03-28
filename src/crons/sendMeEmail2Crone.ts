import { CronJob } from "cron";

import { EEmailActions } from "../enums";
import { emailService } from "../services";

const emailSender2 = async (): Promise<void> => {
  await emailService.sendMail(
    "ihor.sorokivskyi.xt.2017@lpnu.ua",
    EEmailActions.SEND_ME,
    { message: "It is me again testing this crone" }
  );
};

export const sendMeEmail2 = new CronJob("4 * * * *", emailSender2);
