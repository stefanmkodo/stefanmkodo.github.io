const server = "http://localhost:3000";

const fetcher = (url) => fetch(`${server}/api${url}`).then((res) => res.json());

export default fetcher;
