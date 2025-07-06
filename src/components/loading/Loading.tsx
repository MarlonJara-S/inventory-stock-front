interface LoadingProps {
    isLoading?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    isLoading ? (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500">
            <span className="sr-only">Cargando...</span>
        </div>
      </div>
    ) : null
  );
}
