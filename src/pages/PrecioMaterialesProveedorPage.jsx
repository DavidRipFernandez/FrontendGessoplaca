import Header from "../components/common/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SupplierMaterialsService } from "../services/SupplierMaterialsService";
import { ArrowLeft } from "lucide-react";
import MaterialsTable from "../components/suppliers/MaterialsTable"; // Nuevo componente

export default function PrecioMaterialesProveedorPage() {
  const { proveedorCifId } = useParams();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("ProveedorCifId recibido :", proveedorCifId);

  useEffect(() => {
    console.log("ProveedorCifId usado :", proveedorCifId);
    setLoading(true);
    setError("");
    SupplierMaterialsService.getMaterialsBySupplier(proveedorCifId)
      .then(res => {
        if (res.success) {
          setMaterials(res.materiales);
          setProveedor(res.proveedor);
        } else {
          setError(res.message || "No se encontraron materiales.");
        }
      })
      .catch(() => setError("Error de red"))
      .finally(() => setLoading(false));
  }, [proveedorCifId]);

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title="Precio Materiales por Proveedor" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-300 hover:text-yellow-400"
        >
          <ArrowLeft size={20} className="mr-2" /> Volver a Proveedores
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          {proveedor ? `Materiales de ${proveedor.nombre}` : "Materiales"}
        </h2>
        <MaterialsTable loading={loading} error={error} materials={materials} />
      </main>
    </div>
  );
}
