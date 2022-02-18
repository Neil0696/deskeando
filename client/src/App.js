import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const App = () => (
	<>
	<Header />
		<Switch>
			<Route path="/" exact>
				<Hero />
			</Route>
			<Route path="/home" exact>
				<Home />
			</Route>
			<Route path="/about/this/site">
				<About />
			</Route>
		</Switch>
		<Footer />
	</>
);

export default App;
