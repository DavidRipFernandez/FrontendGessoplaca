import {motion} from "framer-motion";
import {search} from "lucide-react";

export default function MaterialsTable({ loading, error, materials }) {
  if (loading) return <div className="text-gray-400">Cargando materiales...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">CÓDIGO MATERIAL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">NOMBRE MATERIAL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">SISTEMA MEDICIÓN</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">PRECIO</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">NOMBRE MARCA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">FECHA MODIFICACIÓN</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {materials.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No hay materiales para este proveedor.</td>
            </tr>
          ) : (
            materials.map((mat) => (
              <tr key={mat.materialId}>
                <td className="px-6 py-4 text-sm text-gray-100">{mat.codigoMaterial}</td>
                <td className="px-6 py-4 text-sm text-gray-100">{mat.nombreMaterial}</td>
                <td className="px-6 py-4 text-sm text-gray-100">{mat.sistemaMedicion}</td>
                <td className="px-6 py-4 text-sm text-gray-100">Bs {mat.precio}</td>
                 <td className="px-6 py-4 text-sm text-gray-100">{mat.nombreMarca}</td>
                <td className="px-6 py-4 text-sm text-gray-100">
                  {mat.fechaModificacion
                    ? new Date(mat.fechaModificacion).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
</motion.div>
  );
}
