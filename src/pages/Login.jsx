import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginMessages } from "../helpers/Messages/LoginMessages";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const LoginPage = () => {
  const {login,logout,user_data} = useContext(UserContext);
  const navigator  = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const updateDataForm = ({ target }) => {
    const { value, name } = target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async(event) => {
    event.preventDefault();
    const datas = await login(data.email,data.password);
      if(datas.isSuccess){
        LoginMessages.Success(datas.message);
        navigator('/users/users/list',{replace:true});
        return;
      }
      LoginMessages.Failed(datas.message);
      return;
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 max-w-md mx-auto mt-20 h-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={sendData} className="space-y-4">
        <div>
          <label className="text-gray-100">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Introduce tu correo"
            required
            onChange={updateDataForm}
            className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="text-gray-100">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="**************"
            required
            onChange={updateDataForm}
            className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-4 text-center">
          <p>No tienes una cuenta? Registrate</p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
