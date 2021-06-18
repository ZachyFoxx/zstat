import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

// create hot app
const App = hot(() => <div>Hellofx World!</div>);

ReactDOM.render(<App />, document.querySelector("#mount"));
