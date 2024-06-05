import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={5} itemsPerPage={10} totalPages={100} />;
}
