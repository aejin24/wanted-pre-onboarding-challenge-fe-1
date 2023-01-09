const getErrorMessage = (message: unknown) => {
  const convertMessage = String(message);

  return convertMessage.substring(convertMessage.indexOf("] ") + 1);
}

export { getErrorMessage }