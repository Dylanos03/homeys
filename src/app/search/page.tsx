import SearchComponent from "../_components/Search";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

function SearchPage() {
  return (
    <main className="relative m-0 flex min-h-screen w-screen justify-center  lg:px-4 ">
      <Sidebar />
      <Navbar name="Messages" />
      <section className="flex w-full flex-col border-x-2 p-2 lg:w-[720px] lg:py-2">
        <h1 className="p-2 text-2xl font-semibold">Search</h1>
        <SearchComponent />
      </section>
    </main>
  );
}

export default SearchPage;
