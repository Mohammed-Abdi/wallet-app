export async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);

    const data = await res.json();
    if (!data?.results?.length) {
      throw new Error("No results found in API response");
    }

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
  } catch (error) {
    console.error("Error in getRandomUser:", error.message);
    return null;
  }
}
