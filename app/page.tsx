import Pagination from "./components/Pagination";

interface Props {
  readonly searchParams: {
    readonly page: string;
  };
}

export default function Home({ searchParams: { page } }: Props) {
  return (
    <Pagination
      currentPage={parseInt(page) || 1}
      itemsPerPage={10}
      totalItems={100}
    />
  );
}
