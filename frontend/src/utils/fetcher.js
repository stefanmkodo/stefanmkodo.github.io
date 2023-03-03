import getParam from "./queryString.js";

const server = getParam('apiIp') ? `https://${getParam('apiIp')}:8443` : "https://192.168.1.216:8443";

const fetcher = (url) => fetch(`${server}/api${url}`).then((res) => res.json());

export default fetcher;
