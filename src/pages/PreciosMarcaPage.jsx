import Header from "../components/common/Header";
// src/pages/PreciosMarcaPage.jsx
//export default function PreciosMarcaPage() {
//  return (
//    <div className="p-6">
//      <h1 className="text-2xl font-semibold">Precios Por Marca</h1>
//      {/* Tu contenido aquí */}
//    </div>
//  );
//}

const PreciosMarcaPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Precios por Marca' />
        </div>
    );
};
export default PreciosMarcaPage