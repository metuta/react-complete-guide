import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

// add interceptor for all requests
axios.interceptors.request.use(
	(request) => {
		console.log("[index.js] request:", request);
		return request;
	},
	(error) => {
		console.log("[index.js] request error:", error);
		return Promise.reject(error);
	}
);

// add interceptor for all responses
axios.interceptors.response.use(
	(response) => {
		console.log("[index.js] response:", response);
		return response;
	},
	(error) => {
		console.log("[index.js] response error:", error);
		return Promise.reject(error);
	}
);

// removing interceptor
// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
