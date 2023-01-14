const getErrorMessage = (message: unknown) => {
  const convertMessage = String(message);

  return convertMessage.substring(convertMessage.indexOf("] ") + 1);
};

const convertGMTtoLocal = (time: string) => {
  const localDate = new Date(time);

  return `${localDate.getFullYear()}.${
    localDate.getMonth() + 1
  }.${localDate.getDate()}`;
};

export { getErrorMessage, convertGMTtoLocal };
