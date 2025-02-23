import { User } from "lucide-react";
import SettingSection from "../components/settings/SettingSection";
import '../styles/permissions.css';


const FormPermissions = () => {


	return (

		<><div className="permissions-text">
			<h3>HOLA MUNDO DESDE PERMISOS</h3>	
			<SettingSection icon={User} title={"Profile"}>
			<div className="space-y-4">
					<div>
					<label className="block text-sm font-medium text-white">Name</label>
					<input
						type="text"
						className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter your name"
					/>
					</div>

					<div>
					<label className="block text-sm font-medium text-white">Email</label>
					<input
						type="email"
						className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter your email"
					/>
					</div>

					<div>
					<label className="block text-sm font-medium text-white">Age</label>
					<input
						type="number"
						className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter your age"
					/>
					</div>
			</div>			
		</SettingSection>
		</div></>
	);
};

export default FormPermissions;
