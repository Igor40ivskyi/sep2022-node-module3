import { removeOldTokens } from "./removeOldTokensCron";

// export const cronRunner = () => {
//   removeOldTokens.start();
// };

export const cronRunner = () => {
  removeOldTokens.start();
};
