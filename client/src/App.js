import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import BookingScreen from "./pages/BookingScreen";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/booking">
			<BookingScreen bookingDate="2022-01-18T00:00:00.000Z"/>
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
	</Switch>
);

export default App;
