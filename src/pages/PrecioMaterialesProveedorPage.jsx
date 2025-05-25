
import Header from "../components/common/Header";
import ActiveSuppliersTable from "../components/suppliers/ActiveSuppliersTable";

export default function SuppliersPage() {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title="Proveedores Activos" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ActiveSuppliersTable />
      </main>
    </div>
  );
}