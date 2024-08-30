export const today = () => {
  const today = new Date();
  const currentDate = new Date(today);
  currentDate.toISOString().substring(0, 10);
  return currentDate;
};
