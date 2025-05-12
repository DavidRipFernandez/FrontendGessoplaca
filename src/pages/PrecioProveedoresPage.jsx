
import Header from "../components/common/Header";
//export default function PreciosProveedoresPage() {
//return (
//<div className="p-6">
//<h1 className="text-2xl font-semibold">Precios Por Proveedor</h1>
//{/* Tu contenido aquí */}
//</div>
//);
//}

const PreciosProveedoresPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Lista de Proveedores' />
        </div>
    );
};
export default PreciosProveedoresPage