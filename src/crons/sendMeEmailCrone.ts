import { CronJob } from "cron";

import { EEmailActions } from "../enums";
import { emailService } from "../services";

const emailSender = async (): Promise<void> => {
  await emailService.sendMail(
    "ihor.sorokivskyi.xt.2017@lpnu.ua",
    EEmailActions.SEND_ME,
    { message: "it is me testing this crone" }
  );
};

export const sendMeEmail = new CronJob("4 * * * *", emailSender);
