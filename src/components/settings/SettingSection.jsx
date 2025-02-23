import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children }) => {
	console.log("THIS IS THE COLOR PARAMT ::")
	return (
		<motion.div
      className={`w-1/2 bg-custom-yellow bg-opacity-1 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-indigo-400 mr-4" size="24" />
        <h2 className="text-xl font-semibold text-black-100">{title}</h2>
      </div>

      {/* Campos del formulario */}
      {children}
    </motion.div>
	);
};
export default SettingSection;
