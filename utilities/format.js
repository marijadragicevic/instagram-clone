// accepts time in seconds returns HH:MM:SS
export const formatDuration = (time) => {
  const seconds = Math.ceil(time % 60)
    .toString()
    .padStart(2, 0);
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, 0);

  if (hours !== "00") {
    return hours + " : " + minutes + " : " + seconds;
  }

  return minutes + " : " + seconds;
};

export const formatText = (text) => {
  const result =
    text?.length > 11
      ? text?.slice(0, 10).toLowerCase() + "..."
      : text.toLowerCase();

  return result;
};
