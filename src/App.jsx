
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { RoutesAuth } from "./routes/RoutesAuth";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			<Routes>
				<Route path='/' element={<Login/>}/>
				<Route path="/users/*" element={
                                            <RoutesAuth/>
                                          } /> 
				 <Route path="/*" element={<Navigate element="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;
