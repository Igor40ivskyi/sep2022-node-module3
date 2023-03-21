import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs";

class EmailService {
  private transporter: Transporter;
  private templateParser;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_EMAIL_PASSWORD,
      },
    });
    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "static", "css"),
        },
      },
    });
  }

  public async sendMail(email: string) {
    const html = await this.templateParser.render("register");
    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: "Test email",
      html,
    });
  }
}

export const emailService = new EmailService();
