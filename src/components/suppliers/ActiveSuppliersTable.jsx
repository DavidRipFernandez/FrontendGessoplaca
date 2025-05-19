import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Eye, ExternalLink } from "lucide-react";
import { SupplierService } from "../../services/SupplierService";

const ActiveSuppliersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar por nombre (buscador)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    (async () => {
      const activos = await SupplierService.getActive();
      setSuppliers(activos);
      setLoading(false);
    })();
  }, []);

  // Filtro por nombre
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((sup) =>
      sup.nombre.toLowerCase().includes(searchTerm)
    );
  }, [suppliers, searchTerm]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Lista de Proveedores</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por Nombre..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">CIF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Domicilio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">Cargando proveedores...</td>
              </tr>
            ) : filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">No se encontraron proveedores.</td>
              </tr>
            ) : (
              filteredSuppliers.map((sup) => (
                <motion.tr
                  key={sup.proveedorCifId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 text-sm text-gray-100">{sup.proveedorCifId}</td>
                  <td className="px-6 py-4 text-sm text-gray-100">{sup.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-100">{sup.domicilioSocial}</td>
                  <td className="px-6 py-4 text-sm flex space-x-2">
                    <button
                      className="text-indigo-400 hover:text-indigo-300"
                      title="Ver detalles"
                      onClick={() => alert(`Ver detalles de ${sup.nombre}`)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-green-400 hover:text-green-300"
                      title="Abrir proveedor"
                      onClick={() => alert(`Abrir proveedor ${sup.nombre}`)}
                    >
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ActiveSuppliersTable;
