import { 
    BarChart2, DollarSign, Menu, Settings, ShoppingBag, 
    ShoppingCart, TrendingUp, UserRoundPlus, KeyRound, Shield, 
    UserCog, Power, 
    ArchiveIcon,
    ListIcon,
    ShapesIcon,
    BrickWallIcon,
    CircleDollarSign,
    CoinsIcon,
    HandCoins
} from "lucide-react";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openSubmenus, setOpenSubmenus] = useState({});
    const { logout } = useContext(UserContext);
    const navigate = useNavigate(); // Hook para redirección

    
    const toggleSubmenu = (name) => {
        setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleLogout = () => {
        logout();  // Cierra sesión
        navigate('/');  // Redirige al home
    };

    const SIDEBAR_ITEMS = [
        {
            name: "Configuración",
            icon: UserCog,
            color: "#EC4899",
            href: "/users",
            subItems: [
                { name: "Crear Usuario", icon: UserRoundPlus, color: "#F97316", href: "/users/register" },
                { name: "Usuarios", icon: UserRoundPlus, color: "#F97316", href: "/users/list" },
                { name: "Crear Rol", icon: KeyRound, color: "#F97316", href: "/users/roles" },
                { name: "Crear Permisos", icon: Shield, color: "#10B981", href: "/users/permisos" },
            ],
        },
        { 
            name: "Elementos", 
            icon: ArchiveIcon, 
            color: "#F59E0B", 
            subItems: [
                { name: "Categorias", icon: ShapesIcon, color: "#F97316", href: "/users/materials/categories" },
                { name: "Materiales", icon: BrickWallIcon, color: "#F97316", href: "/users/materials" },
                { name: "Tarifa Materiales", icon: CircleDollarSign, color: "#F97316", href: "/materials/pricing" },

            ],
        },
         { 
            name: "Precios Materiales", 
            icon: HandCoins, 
            color: "#F59E0B", 
            subItems: [
                { name: "Precios Por Proveedor", icon: ShapesIcon, color: "#F97316", href: "/users/precios_proveedores" },
                { name: "Precios Por Marca", icon: BrickWallIcon, color: "#F97316", href: "/users/precios_marca" },
            ],
        },
        { name: "Productos", icon: ShoppingBag, color: "#8B5CF6", href: "/users/products" },
        { name: "Ventas", icon: DollarSign, color: "#10B981", href: "/users/sales" },
        { name: "Órdenes", icon: ShoppingCart, color: "#F59E0B", href: "/users/orders" },
        { name: "Análisis", icon: TrendingUp, color: "#3B82F6", href: "/users/analytics" },
        { name: "Ajustes", icon: Settings, color: "#6EE7B7", href: "/users/settings" },
        { name: "Cerrar Sesión", icon: Power, color: "#FF4D4D", action: handleLogout },
    ];

    return (
        <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 overflow-visible ${ isSidebarOpen ? "w-64" : "w-20" }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
        <div 
            className={`h-full bg-menu-color-dark bg-opacity-0 backdrop-blur-md ${
            isSidebarOpen ? "p-4" : "p-2"
            } flex flex-col border-r border-gray-700`}
        >
            {/* Contenedor para el ícono de menú y el nombre "Gessoplaca" */}
            <div className="flex items-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>
                {isSidebarOpen && (
                    <motion.span
                        className='ml-4 whitespace-nowrap text-lg font-semibold'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                    >
                        Gessoplaca
                    </motion.span>
                )}
            </div>
    
            {/* Resto del código del sidebar */}
            <nav className='mt-8 flex-grow overflow-y-auto hide-scrollbar'>
                {SIDEBAR_ITEMS.map((item) => (
                    <div key={item.name}>
                        {item.action ? (
                            // Botón para cerrar sesión
                            <button 
                                onClick={item.action} 
                                className='flex items-center w-full p-4 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors mb-2'
                            >
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                {isSidebarOpen && <span className='ml-4 whitespace-nowrap'>{item.name}</span>}
                            </button>
                        ) : item.subItems ? (
                            <>
                                <motion.div
                                    onClick={() => toggleSubmenu(item.name)}
                                    className='flex items-center justify-between p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer'
                                >
                                    <div className='flex items-center'>
                                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                        <AnimatePresence>
                                            {isSidebarOpen && (
                                                <motion.span
                                                    className='ml-4 whitespace-nowrap'
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {isSidebarOpen && <span>{openSubmenus[item.name] ? "▲" : "▼"}</span>}
                                </motion.div>
    
                                <AnimatePresence>
                                    {openSubmenus[item.name] &&
                                        item.subItems.map((sub) => (
                                            <motion.div
                                                key={sub.href}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                    <Link 
                                                        to={sub.href} 
                                                        className={`block p-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg ${
                                                        isSidebarOpen ? "ml-6 text-left" : "mx-auto" 
                                                        }`}
                                                    >
                                                    <sub.icon size={18} style={{ color: sub.color, minWidth: "18px" }} className="mr-2 inline-block" />
                                                    {isSidebarOpen && sub.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                </AnimatePresence>
                            </>
                        ) : (
                            <Link to={item.href}>
                                    <motion.div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                                        isSidebarOpen ? "" : "justify-center"
                                        }`}
                                    >
                                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                    {isSidebarOpen && <span className='ml-4 whitespace-nowrap'>{item.name}</span>}
                                </motion.div>
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    </motion.div>
    );
};

export default Sidebar;
