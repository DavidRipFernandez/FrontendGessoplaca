
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { RoutesAuth } from "./routes/RoutesAuth";
import { PrivateComponente } from "./components/privateComponent";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			<Routes>
				<Route path='/' element={<Login/>}/>
				<Route path="/users/*" element={
											<PrivateComponente>
												  <RoutesAuth/>
											</PrivateComponente>
                                          } /> 
				 <Route path="/*" element={<Navigate to="/" replace/>}/>  
			</Routes>
		</div>
	);
}

export default App;
