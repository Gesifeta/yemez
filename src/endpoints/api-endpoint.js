// make api call to a graphql end point

export const fetchGraphQL = (requestBody) => {
  const endpoint = import.meta.env.VITE_API_URI;
  console.log(endpoint);
  const response = fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      console.log(data)
      return data
    })
    .catch((error) => error);
  return response;
};
export default fetchGraphQL;
