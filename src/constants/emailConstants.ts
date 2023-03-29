import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you in our app!",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control you password,just follow all steps and everything will be good!",
    templateName: "forgotPassword",
  },
  [EEmailActions.GETALL]: {
    subject: "Get all is get all",
    templateName: "getAll",
  },
  [EEmailActions.ACTIVATE]: {
    subject: "Activate!",
    templateName: "activate",
  },
  [EEmailActions.SEND_ME]: {
    subject: "Just email",
    templateName: "justEmail",
  },
  [EEmailActions.REMINDER]: {
    subject: "JUST REMIND THAT YOU HAVE BEEN OUT A LONG TIME",
    templateName: "",
  },
};
