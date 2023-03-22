export enum EEmailActions {
  WELCOME,
  FORGOT_PASSWORD,
  GETALL,
}

export const allTemplates = {
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
};
