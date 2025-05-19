import { useState, useEffect } from "react";
import { SupplierService } from "../../services/SupplierService";
import { motion } from "framer-motion";

export default function ActiveSuppliersTable() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      const activos = await SupplierService.getActive();
      setSuppliers(activos);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-100">Cargando proveedores…</div>;
  }

  return (
    <motion.div
      className="overflow-x-auto bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Lista de Proveedores</h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">CIF</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Nombre</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Domicilio</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {suppliers.map((sup) => (
            <tr key={sup.proveedorCifId}>
              <td className="px-4 py-2 text-gray-100">{sup.proveedorCifId}</td>
              <td className="px-4 py-2 text-gray-100">{sup.nombre}</td>
              <td className="px-4 py-2 text-gray-100">{sup.domicilioSocial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
