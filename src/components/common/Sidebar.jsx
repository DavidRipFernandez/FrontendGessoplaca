import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, UserRoundPlus, KeyRound, Shield,UserCog  } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{
		name: "Configuracion",
		icon: UserCog,
		color: "#EC4899",
		href: "/users",
		subItems: [
			{ name: "Crear Usuario", icon: UserRoundPlus, color: "#F97316", href: "/users/register" },
			{ name: "Crear Rol", icon: KeyRound, color: "#F97316", href: "/users/users/roles" },
			{ name: "Crear Permisos", icon: Shield, color: "#10B981", href: "/users/users/permisos" },
			
		],
	},
	{ name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/users/products" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/users/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/users/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/users/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/users/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openSubmenus, setOpenSubmenus] = useState({});

	const toggleSubmenu = (name) => {
		setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-menu-color-dark bg-opacity-0 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
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
									className='ml-4 whitespace-nowrap'
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2, delay: 0.3 }}
									>
										Gessoplaca
									</motion.span>
									)}
				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<div key={item.href}>
							{item.subItems ? (
								// Si tiene subItems, se muestra un botón para desplegar el menú
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

									{/* Subitems */}
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
													<Link to={sub.href} className='block ml-6 p-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg'>
														<sub.icon size={18} style={{ color: sub.color, minWidth: "18px" }} className="mr-2 inline-block" />
														{isSidebarOpen && sub.name}
													</Link>
												</motion.div>
											))}
									</AnimatePresence>
								</>
							) : (
								// Elementos normales sin submenús
								<Link to={item.href}>
									<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
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
