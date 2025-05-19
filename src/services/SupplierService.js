import api from "./api"


//listar proveedores activos
export const SupplierService = {
  async getActive() {
    try {
      // Llama a GET {VITE_API_URL}/api/supplier/activos
      const { data, success, message } = await api.get("/supplier/activos");
      if (!success) {
        console.error("API Error:", message);
        return [];
      }
      return data; // aquí está el array de proveedores
    } catch (err) {
      console.error("Error fetching active suppliers:", err);
      return [];
    }
  }
};