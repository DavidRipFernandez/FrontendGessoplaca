import { User } from "lucide-react";
import SettingSection from "../components/settings/SettingSection";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import '../styles/permissions.css';
import { Role } from "../services/RoleServices";
import { GeneralMessages } from "../helpers/Messages/GeneralMessages";

const PermissionsPage = () => {
    const [roles, setRoles] = useState([]); 
    const [modules, setModules] = useState([]);
    const permissions = ["Crear", "Leer", "Actualizar", "Eliminar"];
    const [formData, setFormData] = useState({}); 

    useEffect(() => {
        // Cargar roles al inicio
        const fetchRoles = async () => {
            const rol = await Role.getRoles();
            setRoles(rol);
        };
        fetchRoles();
    }, []);

    const getModules = async (roleId) => {
        try {
            const data = await Role.getModulesByRole(roleId);
            if (!data.success) {
                GeneralMessages.Failed(data.message);
            } else {
                console.log(data.data.modules);

                const modulesWithPermissions = data.data.modules.map((module) => {
                 
                    const permissionsStatus = permissions.map((perm, index) => {
                 
                        return module.permissions[index]?.activo || false;
                    });

                    return {
                        ...module,
                        permissionsStatus,
                    };
                });

                setModules(modulesWithPermissions);

            
                const newFormData = modulesWithPermissions.reduce((acc, module, moduleIndex) => {
                    permissions.forEach((perm, permIndex) => {
                        const key = `perm-${moduleIndex}-${permIndex}`;
                        acc[key] = module.permissionsStatus[permIndex]; 
                    });
                    return acc;
                }, {});

                setFormData(newFormData);
            }
        } catch (error) {
            console.log(error);
            GeneralMessages.Failed("Ocurrió un error inesperado");
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

   
    const sendForm = (event) => {
        event.preventDefault();
        console.log(formData);
      
    };

    return (
        <>
            <div className="permissions-text container-roles">
                <h1 className="roles-title">Módulos y Permisos</h1>
                <form onSubmit={sendForm} className="form-modules-rols">
                    <Row>
                     
                        <Col md={3}>
                            <Form.Group controlId="formRole">
                                <Form.Label className="form-label">Rol</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => getModules(e.target.value)} // Llamada a getModules cuando se cambia el select
                                >
                                    {roles.map((role) => (
                                        <option key={role.rolId} value={role.rolId}>
                                            {role.nombreRol}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {/* Columna 2: Módulos en filas */}
                        <Col md={3} className="module-list">
                            <Form.Label className="form-label">Módulo</Form.Label>
                            {modules.map((module, index) => (
                                <div key={index} className="module-label mb-2">
                                    {module.nombreModulo}
                                </div>
                            ))}
                        </Col>

                        <Col md={6}>
                            <Form.Label className="form-label">Permisos</Form.Label>
                            {modules.map((module, moduleIndex) => (
                                <Row key={moduleIndex} className="mb-4">
                                    {permissions.map((perm, permIndex) => (
                                        <Col key={permIndex} xs={3}>
                                            <Form.Check
                                                type="checkbox"
                                                label={perm}
                                                name={`perm-${moduleIndex}-${permIndex}`} 
                                                checked={formData[`perm-${moduleIndex}-${permIndex}`] || false} 
                                                onChange={handleCheckboxChange}
                                                className="permission-checkbox"
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center mt-4">
                        <Button type="submit" className="send-permissions">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PermissionsPage;