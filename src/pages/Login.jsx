import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LoginMessages } from "../helpers/Messages/LoginMessages";
import { Mail } from "lucide-react";

// Importa tu fondo
import fondoLogin from "../assets/gessoplaca.png";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const updateDataForm = ({ target }) => {
    const { value, name } = target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async (event) => {
    event.preventDefault();
    const datas = await login(data.email, data.password);
    if (datas.isSuccess) {
      LoginMessages.Success(datas.message);
      navigate('/users/users/list', { replace: true });
      return;
    }
    LoginMessages.Failed(datas.message);
    return;
  };

  return (
     <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoLogin})`
      }}
    >
      <motion.div
        className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Iniciar Sesión</h2>
        <form onSubmit={sendData} className="space-y-5">
          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Introduce tu correo"
              required
              autoComplete="username"
              onChange={updateDataForm}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="**************"
              required
              autoComplete="current-password"
              onChange={updateDataForm}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold p-2 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-6 text-center text-gray-300">
          ¿No tienes una cuenta? <span className="underline cursor-pointer">Regístrate</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
