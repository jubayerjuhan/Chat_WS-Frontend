import moment from "moment";

export const formatMessage = (username, message) => {
  return {
    text: message,
    username,
    time: moment(),
  };
};
