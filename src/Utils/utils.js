const formattedDates = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses van de 0 a 11, así que sumamos 1
  const day = date.getDate();
  return `${month}/${day}/${year}`;
};

export { formattedDates };
