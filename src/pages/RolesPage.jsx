import { Row,Col,Card } from "react-bootstrap";
import ProductsTable from "../components/products/ProductsTable";
import '../styles/users.css';
import OrdersTable from "../components/orders/OrdersTable";

export function RolesPage(){
    return(
    <>
     <div className="flex-1 overflow-auto relative z-10 container-userslist">
        <OrdersTable/>
    </div>
    </>
    );
}