import { motion } from "framer-motion";
import { Edit, Search, Eye, EyeOff, Trash } from "lucide-react";  // Importar el ícono Trash
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UserServices } from "../../services/UsersService";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // To store the original list
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de eliminación
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [productToDelete, setProductToDelete] = useState(null); // Para almacenar el producto a eliminar

  const handleClose = () => setShow(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false); // Cerrar modal de eliminación

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleShowDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusChange = (e) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        estado: e.target.checked,
      });
    }
  };

  const handleInputChange = (e) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedProduct) {
      try {
        const updatedUser = {
          usuarioId: selectedProduct.usuarioId, 
          nombre: selectedProduct.nombre,
          correo: selectedProduct.correo,
          contraseña: selectedProduct.constraseña,
          estado: selectedProduct.estado,
        };
  
        await UserServices.updateUser(selectedProduct.usuarioId, updatedUser);
  
        setShow(false); 
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        // Llamada a la función para eliminar el producto
       // await UserServices.deleteUser(productToDelete.usuarioId);
        alert(`Usuario ${productToDelete.nombre} eliminado con éxito`);
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await UserServices.getUsers();
      console.log("LISTA DE USUARIOS : ", users);
      setAllProducts(users); // Store the complete list
      setFilteredProducts(users); // Initially show all products
    };
    fetchUserList();
  }, []);

  // Filter products based on searchTerm
  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm) ||
      product.correo.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]); // Re-run when searchTerm or allProducts change

  return (
    <motion.div
      className="bg-white-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold ">Usuarios</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="bg-black-700 placeholder-gray rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Contraseña
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.usuarioId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {product.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                  {passwordVisibility[product.usuarioId] ? product.contraseña : "••••••••"}
                  <button
                    className="ml-2 focus:outline-none"
                    onClick={() => togglePasswordVisibility(product.usuarioId)}
                  >
                    {passwordVisibility[product.usuarioId] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${product.estado ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                  >
                    {product.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {product.rolNombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleShow(product)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleShowDeleteModal(product)}
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al usuario {productToDelete?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edición */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="text-black">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={selectedProduct.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="text-black">Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={selectedProduct.correo}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="text-black">Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  name="constraseña"
                  value={selectedProduct.constraseña}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label className="text-black">Estado</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Activo"
                  checked={selectedProduct.estado}
                  onChange={handleStatusChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default ProductsTable;