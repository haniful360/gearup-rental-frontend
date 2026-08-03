import { getProviderOrders } from "@/service/provider-order/getOrders";
import ProviderOrdersTable from "./_components/ProviderOrdersTable/ProviderOrdersTable";

export interface ProviderOrder {
  id?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  quantity?: number;
  status?: string;
  paymentStatus?: string;
  createdAt?: string;
  gearItem?: {
    id?: string;
    title?: string;
    location?: string;
    brand?: string;
    pricePerDay?: number;
  };
  customer?: { id?: string; name?: string; email?: string };
}

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders({ limit: 100 });

  const rawData = result?.data;
  const orders: ProviderOrder[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

  return <ProviderOrdersTable initialOrders={orders} />;
}
