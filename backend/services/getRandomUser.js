export async function getRandomUser() {
  return {
    name: "Test User",
    email: "test@example.com",
    age: 30,
    gender: "male",
    profilePicture: "https://example.com/pic.jpg",
    location: {
      city: "Test City",
      country: "Testland",
    },
  };
}
