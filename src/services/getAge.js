export function getAge(date) {
  const now = new Date();
  const current = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  const input = date.split("-").map((string) => Number(string));

  const userBirth = { day: input.at(2), month: input.at(1), year: input.at(0) };

  const age = Math.floor(
    current.year -
      userBirth.year +
      (current.month - userBirth.month) / 12 +
      (current.day - userBirth.day) / 30
  );

  return age;
}
