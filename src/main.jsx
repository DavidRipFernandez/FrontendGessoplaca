
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

import "./index.css";



import { BrowserRouter } from "react-router-dom";
import { RoutesAuth } from "./routes/RoutesAuth.jsx";
import { UserProvider } from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter future={{ v7_startTransition: true }}>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);
