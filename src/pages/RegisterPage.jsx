import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Role } from "../services/RoleServices";
import { GeneralMessages } from "../helpers/Messages/GeneralMessages";
import { UserServices } from "../services/UsersService";

const RegisterPage = () => {
  const [data, setData] = useState({
    Nombre: "",
    Correo: "",
    Password: "",
    confirmPassword: "",
    RolId: "",
  });
  const [roles, setRoles] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true); // Estado para verificar si las contraseñas coinciden

  const updateDataForm = ({ target }) => {
    const { value, name } = target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Verificar si las contraseñas coinciden
    if (name === "Password" || name === "confirmPassword") {
      setPasswordMatch(data.Password === data.confirmPassword);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const rol = await Role.getRoles();
      setRoles(rol);
    };
    fetchRoles();
  }, []);

  const sendData = async (event) => {
    event.preventDefault();

    if (data.Password !== data.confirmPassword) {
      GeneralMessages.Failed("Las contraseñas no coinciden");
      return;
    }

    try {
      const register = await UserServices.registerUser({
        Nombre: data.Nombre,
        Correo: data.Correo,
        Password: data.Password,
        RolId: data.RolId,
      });

      if (register.success) {
        GeneralMessages.Success(register.message);

        // Limpiar los campos de los inputs después del registro exitoso
        setData({
          Nombre: "",
          Correo: "",
          Password: "",
          confirmPassword: "",
          RolId: "",
        });

        return;
      }

      GeneralMessages.Failed(register.message);
    } catch (error) {
      GeneralMessages.Failed("Error al registrar el usuario");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 max-w-3xl mx-auto mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Registrar Cuenta</h2>
      <form onSubmit={sendData} className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="text-gray-100 block mb-2">Username</label>
          <input
            type="text"
            name="Nombre"
            placeholder="User Name"
            value={data.Nombre}
            required
            onChange={updateDataForm}
            className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-custom-yellow focus:ring-2 focus:ring-custom-yellow focus:outline-none"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-gray-100 block mb-2">Email</label>
          <input
            type="email"
            name="Correo"
            placeholder="Enter address here"
            value={data.Correo}
            required
            onChange={updateDataForm}
            className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-custom-yellow focus:ring-2 focus:ring-custom-yellow focus:outline-none"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-gray-100 block mb-2">Password</label>
          <input
            type="password"
            name="Password"
            placeholder="**************"
            value={data.Password}
            required
            onChange={updateDataForm}
            className={`w-full p-3 rounded-md bg-gray-900 text-white border ${
              passwordMatch ? "border-gray-600" : "border-red-500"
            } focus:border-custom-yellow focus:ring-2 focus:ring-custom-yellow focus:outline-none`}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-gray-100 block mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="**************"
            value={data.confirmPassword}
            required
            onChange={updateDataForm}
            className={`w-full p-3 rounded-md bg-gray-900 text-white border ${
              passwordMatch ? "border-gray-600" : "border-red-500"
            } focus:border-custom-yellow focus:ring-2 focus:ring-custom-yellow focus:outline-none`}
          />
        </div>

        <div className="col-span-2">
          <label className="text-gray-100 block mb-2">Selecciona una opción</label>
          <select
            name="RolId"
            value={data.RolId}
            onChange={updateDataForm}
            className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-custom-yellow focus:ring-2 focus:ring-custom-yellow focus:outline-none"
          >
            <option value="" disabled>-- Selecciona --</option>
            {roles.length > 0 ? (
              roles.map((role) => (
                <option key={role.rolId} value={role.rolId}>
                  {role.nombreRol}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-custom-yellow text-gray-900 p-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            Registrar
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterPage;