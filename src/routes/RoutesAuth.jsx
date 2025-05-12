
import {Routes,Route} from 'react-router-dom'
import OverviewPage from '../pages/OverviewPage';
import ProductsPage from '../pages/ProductsPage';
import UsersPage from '../pages/UsersPage';
import SalesPage from '../pages/SalesPage';
import OrdersPage from '../pages/OrdersPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';
import PermissionsPage from '../pages/PermissionsPage';
import Sidebar from '../components/common/Sidebar';
import  RegisterPage  from '../pages/RegisterPage';
import { Navigate } from 'react-router-dom';
import { UsersList } from '../pages/UsersLists';
import { RolesPage } from '../pages/RolesPage';
import PreciosProveedoresPage from '../pages/PrecioProveedoresPage';
import PreciosMarcaPage from '../pages/PreciosMarcaPage';	


export function RoutesAuth(){

    return(<>
    	<Sidebar />
        <Routes>
                <Route path='dashboard' element={<OverviewPage />} />
				<Route path='register' element={<RegisterPage/>}/>
				<Route path='products' element={<ProductsPage />} />
				<Route path='users' element={<UsersPage />} />
				<Route path='sales' element={<SalesPage />} />
				<Route path='orders' element={<OrdersPage />} />
				<Route path='analytics' element={<AnalyticsPage />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path="list" element={<UsersList />}/>
				<Route path="roles" element={<RolesPage/>}/>
				<Route path="permisos" element={<PermissionsPage />}/>
				<Route path="precios_proveedores" element={<PreciosProveedoresPage/>}/>
				<Route path="precios_marca" element={<PreciosMarcaPage/>}/>
                <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
    </>);

}