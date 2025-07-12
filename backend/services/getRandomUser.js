export async function getRandomUser(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch("https://randomuser.me/api/");
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);

      const data = await res.json();
      if (!data?.results?.length) throw new Error("No results found");

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
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) return null;
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}
