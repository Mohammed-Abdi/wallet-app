export async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const result = data.results[0];

  return {
    name: `${result.name.first} ${result.name.last}`,
    email: result.email,
    age: result.dob.age,
    gender: result.gender,
    profilePicture: result.picture.large,
    location: {
      city: result.location.city,
      country: result.location.country,
    },
  };
}
