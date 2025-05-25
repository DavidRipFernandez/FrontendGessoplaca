import api from "./api";

// Obtener materiales por proveedor
export const SupplierMaterialsService = {
  async getMaterialsBySupplier(proveedorCifId) {
    try {
      // GET {VITE_API_URL}/api/preciotarifa/proveedor/:proveedorCifId
      const res = await api.get(`/preciotarifa/proveedor/${proveedorCifId}`);
      if (!res.success) {
        // Si success es false, puede que la data sea null
        return {
          success: false,
          materiales: [],
          message: res.message || "No hay materiales para este proveedor."
        };
      }
      return {
        success: true,
        materiales: res.data?.materiales || [],
        proveedor: {
          nombre: res.data?.nombreProveedor,
          proveedorCifId: res.data?.proveedorCifId
        }
      };
    } catch (err) {
      return {
        success: false,
        materiales: [],
        message: err.message || "Error al obtener precio de los materiales por proveedor"
      };
    }
  }
};
