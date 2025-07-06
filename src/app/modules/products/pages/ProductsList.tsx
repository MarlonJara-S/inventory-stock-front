import { DataTable } from '@/app/shared/components/table/DataTable';
import { columns } from '../components/Columns';
import { useProducts} from '../hooks/useProducts';
import { Loading } from '@/components/loading/Loading';


export const ProductsList: React.FC = () => {
  const {  data: products, isLoading } = useProducts();

  if (isLoading)
    return <Loading isLoading={isLoading} />;

  return (
    <>
      <DataTable 
          columns={columns} 
          data={products ?? []}
      />
    </>
  );
};
