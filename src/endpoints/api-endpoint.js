// make api call to a graphql end point

export const fetchGraphQL = (requestBody) => {

  const response = fetch(`${import.meta.env.VITE_API_URI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then(({data} ) => data)
    .catch((error) => error);
  return response;
};
export default fetchGraphQL;
