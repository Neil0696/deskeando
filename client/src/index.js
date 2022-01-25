import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
