import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash } from "lucide-react";
import { Role } from "../../services/RoleServices";
import { GeneralMessages } from "../../helpers/Messages/GeneralMessages";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ nombre: "", descripcion: "" });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await Role.getRoles();
        setRoles(response);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteRole = async (rolId) => {
    try {
      await Role.deleteRole(rolId);
      GeneralMessages.Success("Rol eliminado exitosamente");
      setRoles(roles.filter((role) => role.rolId !== rolId));
    } catch (error) {
      console.error("Error eliminando rol:", error);
      GeneralMessages.Failed("Ocurrió un error eliminando el rol");
    }
  };

  const handleAddRole = async (nombre, descripcion) => {
    try {
      const response = await Role.createRol(nombre, descripcion);
      if (!response.success) {
        GeneralMessages.Failed("Ocurrió un error");
      } else {
        GeneralMessages.Success("Rol Creado con Éxito");

        const nuevoRol = {
          rolId: response.data.rolId, 
          nombreRol: nombre,
          descripcion: descripcion,
          estado: true,
        };

        setRoles((prevRoles) => [...prevRoles, nuevoRol]);
        setIsModalOpen(false);
        setNewRole({ nombre: "", descripcion: "" });
      }
    } catch (error) {
      GeneralMessages.Failed("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.nombreRol.toLowerCase().includes(searchTerm) ||
      role.descripcion.toLowerCase().includes(searchTerm)
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Lista de Roles</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar roles..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Rol
      </button>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredRoles.map((role) => (
              <motion.tr key={role.rolId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 text-sm text-gray-100">{role.rolId}</td>
                <td className="px-6 py-4 text-sm text-gray-100">{role.nombreRol}</td>
                <td className="px-6 py-4 text-sm text-gray-100">{role.descripcion}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      role.estado ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {role.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex space-x-2">
                  <button className="text-indigo-400 hover:text-indigo-300">
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteRole(role.rolId)}
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-x-0 top-0 flex items-start justify-center bg-black bg-opacity-50 p-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-full mx-auto">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Agregar Rol</h3>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              value={newRole.nombre}
              onChange={(e) => setNewRole({ ...newRole, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              value={newRole.descripcion}
              onChange={(e) => setNewRole({ ...newRole, descripcion: e.target.value })}
            />
            <div className="flex justify-end space-x-4">
              <button className="bg-red-500 px-4 py-2 rounded text-white" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button className="bg-green-500 px-4 py-2 rounded text-white" onClick={() => handleAddRole(newRole.nombre, newRole.descripcion)}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OrdersTable;
