import { useState, useMemo } from "react";
import { Edit, X, Search, Upload, Download } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const MARCAS_DEMO = [
  { id: 1, nombre: "Placo" },
  { id: 2, nombre: "Knauf" },
  { id: 3, nombre: "Volcan" },
];

export default function MaterialsTable({ loading, error, materials, proveedorNombre }) {
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Modales
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedMarcaExcel, setSelectedMarcaExcel] = useState("Todos");

  // Filtrar materiales por búsqueda
  const filteredMaterials = useMemo(() =>
    materials.filter(
      (mat) =>
        mat.nombreMaterial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.codigoMaterial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.nombreMarca?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [materials, searchTerm]
  );

  // Marcas únicas para el modal de descarga personalizada
  const marcasUnicas = useMemo(() => {
    const marcasSet = new Set();
    const marcasArr = [];
    materials.forEach(mat => {
      if (mat.nombreMarca && !marcasSet.has(mat.nombreMarca)) {
        marcasSet.add(mat.nombreMarca);
        marcasArr.push(mat.nombreMarca);
      }
    });
    return marcasArr;
  }, [materials]);

  const handleEditClick = (material) => {
    setEditingMaterial(material);
    setEditFields({
      nombreMaterial: material.nombreMaterial,
      codigoMaterial: material.codigoMaterial,
      sistemaMedicion: material.sistemaMedicion,
      precio: material.precio,
      nombreMarca: material.nombreMarca,
    });
  };

  const handleChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Aquí puedes guardar en backend
    setEditingMaterial(null);
  };

  // --- Modal Carga Masiva ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleBulkSave = () => {
    alert(`Marca: ${selectedBrand}\nArchivo: ${file?.name || "Ninguno"}`);
    setShowBulkModal(false);
    setSelectedBrand("");
    setFile(null);
  };

  // --- Modal Descarga Personalizada ---
  const handleExportExcelPersonalizado = () => {
    // Filtra materiales por marca seleccionada
    const dataToExport = materials.filter(mat =>
      selectedMarcaExcel === "Todos" || mat.nombreMarca === selectedMarcaExcel
    ).map(mat => ({
      "Nombre Material": mat.nombreMaterial || "",
      "Sistema Medición": mat.sistemaMedicion || "",
      "Precio": mat.precio ?? "",
      "Nombre Marca": mat.nombreMarca || ""
    }));

    if (dataToExport.length === 0) {
      alert("No existen materiales para exportar con la marca seleccionada.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materiales");
    XLSX.writeFile(workbook, `Materiales_${proveedorNombre || "Proveedor"}.xlsx`);
    setShowDownloadModal(false);
    setSelectedMarcaExcel("Todos");
  };

  return (
    <>
      <div className="overflow-x-auto bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
        {/* HEADER Y BUSCADOR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Materiales de {proveedorNombre || "Proveedor"}
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar nombre ..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* BOTONES DEBAJO DEL TITULO */}
        <div className="flex flex-wrap gap-3 mb-5">
          <button
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm flex items-center gap-1"
            onClick={() => setShowBulkModal(true)}
          >
            <Upload size={16} /> Carga Masiva
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm flex items-center gap-1"
            onClick={() => setShowDownloadModal(true)}
          >
            <Download size={16} /> Descargar Plantilla Excel
          </button>
        </div>

        {/* TABLA */}
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
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">Cargando materiales...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-red-400">{error}</td>
              </tr>
            ) : filteredMaterials.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">No hay materiales para este proveedor.</td>
              </tr>
            ) : (
              filteredMaterials.map((mat) => (
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
                  <td className="px-6 py-4 text-sm">
                    <button
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleEditClick(mat)}
                      title="Editar material"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDITAR MATERIAL */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-2xl w-[350px] max-w-full relative border border-gray-700 flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              onClick={() => setEditingMaterial(null)}
              title="Cerrar"
            >
              <X size={22} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-100">
              Editar Material
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Nombre Material</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  name="nombreMaterial"
                  value={editFields.nombreMaterial}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Código Material</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  name="codigoMaterial"
                  value={editFields.codigoMaterial}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Sistema Medición</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  name="sistemaMedicion"
                  value={editFields.sistemaMedicion}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Precio</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  name="precio"
                  value={editFields.precio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Marca</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  name="nombreMarca"
                  value={editFields.nombreMarca}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DE CARGA MASIVA */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-2xl w-[380px] max-w-full relative border border-gray-700 flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 50 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowBulkModal(false)}
              title="Cerrar"
            >
              <X size={22} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-100">
              Carga Masiva {proveedorNombre ? `para el proveedor ${proveedorNombre}` : ""}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Seleccionar Marca</label>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
              >
                <option value="">Seleccione una marca</option>
                {MARCAS_DEMO.map(m => (
                  <option key={m.id} value={m.nombre}>{m.nombre}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Subir archivo Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="w-full p-2 rounded bg-gray-700 text-white"
                onChange={handleFileChange}
              />
              {file && (
                <div className="text-xs text-gray-400 mt-1">
                  Archivo seleccionado: <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleBulkSave}
                disabled={!selectedBrand || !file}
                title="Debe seleccionar una marca y un archivo"
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DE DESCARGA PERSONALIZADA */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-2xl w-[380px] max-w-full relative border border-gray-700 flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 50 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowDownloadModal(false)}
              title="Cerrar"
            >
              <X size={22} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-100">
              Descarga Personalizada
            </h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Lista de Marcas</label>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={selectedMarcaExcel}
                onChange={e => setSelectedMarcaExcel(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {marcasUnicas.map((marca, idx) => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleExportExcelPersonalizado}
              >
                Descargar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
