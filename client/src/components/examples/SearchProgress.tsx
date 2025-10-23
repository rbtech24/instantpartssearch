import { SearchProgress } from '../SearchProgress';

export default function SearchProgressExample() {
  const mockSuppliers = [
    { name: "RepairClinic", status: "complete" as const },
    { name: "AppliancePartsPros", status: "searching" as const },
    { name: "PartSelect", status: "pending" as const },
    { name: "Sears Parts", status: "pending" as const },
  ];

  return (
    <div className="w-full max-w-md">
      <SearchProgress suppliers={mockSuppliers} />
    </div>
  );
}
