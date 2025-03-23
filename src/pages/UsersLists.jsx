import { Row,Col,Card } from "react-bootstrap";
import ProductsTable from "../components/products/ProductsTable";
import '../styles/users.css';

export function UsersList(){
    return(
    <>
     <div className="flex-1 overflow-auto relative z-10 container-userslist">
        <ProductsTable/>
    </div>
    </>
    );
}