import { fetchAirbnbData } from "./actions/action";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { categoryData } from "./lib/categories";

export default async function Home() {
  const { categoryBar: { categories } } = categoryData;
  const data = await fetchAirbnbData();
  return (
    <div className="parent-container">
      <Header categories={categories} />
      <div className="content-section grid grid-cols-1 gap-2 pl-4 pr-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        <ProductList productData={data} />
      </div>
    </div>
  );
}
