import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartProvider";
import { BiSearch, BiFilterAlt, BiSort, BiCheck } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import BotHeader from "../components/layout/BotHeader";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import TopHeader from "../components/layout/TopHeader";
import Spinner from "../components/ui/Spinner";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("featured");
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("phones").select("*");
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // استخراج قائمة الماركات المتاحة ديناميكياً
  const brands = useMemo(() => {
    const allBrands = products.map((p) => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // تطبيق الفلترة والترتيب تلقائياً
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
        const matchesPrice = (product.price?.amount || product.price) <= maxPrice;
        return matchesSearch && matchesBrand && matchesPrice;
      })
      .sort((a, b) => {
        const priceA = a.price?.amount || a.price;
        const priceB = b.price?.amount || b.price;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        return 0; // Featured / Default
      });
  }, [products, searchTerm, selectedBrand, maxPrice, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <>
      <TopHeader />
      <BotHeader />
      <div className="bg-[#f8fafc] text-[#1e293b] min-h-screen pt-6 sm:pt-10 px-3 sm:px-5 pb-16 sm:pb-20">
        <div className="max-w-[1280px] mx-auto w-full">
          
          {/* Header & Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-5 mb-6 sm:mb-[30px] pb-4 sm:pb-[15px] border-b border-[#e2e8f0]">
            <h2 className="text-xl sm:text-2xl md:text-[1.6rem] font-bold text-[#1e293b] text-center sm:text-left">Explore Smartphones & Devices</h2>
            <div className="relative w-full sm:w-72 md:w-80">
              <BiSearch className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[1.2rem] text-[#64748b]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-[10px] pr-4 pl-[42px] bg-white border border-[#e2e8f0] rounded-[25px] text-[#1e293b] text-[0.95rem] outline-none shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out focus:border-[#0088ff] focus:shadow-[0_0_0_3px_rgba(0,136,255,0.15)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 md:gap-6">
            {/* Sidebar Filters */}
            <aside className="bg-white border border-[#e2e8f0] rounded-[20px] p-4 sm:p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] h-fit flex flex-col gap-4 sm:gap-5">
              <h3 className="flex items-center gap-2 text-[1.1rem] font-bold text-[#1e293b] pb-[10px] border-b border-[#e2e8f0]"><BiFilterAlt /> Filters</h3>
              
              {/* Brand Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] text-[#64748b] font-semibold">Brand</label>
                <select className="w-full py-[10px] px-[14px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] text-[#1e293b] font-medium outline-none cursor-pointer text-sm sm:text-base" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b === "all" ? "All Brands" : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] text-[#64748b] font-semibold">Max Price: EGP {maxPrice.toLocaleString()}</label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-[#0088ff] cursor-pointer w-full"
                />
              </div>

              {/* Sort By */}
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] text-[#64748b] font-semibold flex items-center gap-1"><BiSort /> Sort By</label>
                <select className="w-full py-[10px] px-[14px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] text-[#1e293b] font-medium outline-none cursor-pointer text-sm sm:text-base" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </aside>

            {/* Products Listing */}
            <main className="min-w-0">
              {loading ? (
                <Spinner message="Loading products..." />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-[60px] text-[#64748b] text-base bg-white rounded-[20px] border border-[#e2e8f0]">No products match your criteria.</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:gap-5">
                  {filteredProducts.map((product) => {
                    const price = product.price?.amount || product.price;
                    const isAdded = addedItems[product.id];

                    return (
                      <div key={product.id} className="bg-white border border-[#e2e8f0] rounded-[20px] py-5 px-4 flex flex-col justify-between items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:border-[#cbd5e1] w-full">
                        <img className="w-full h-[180px] sm:h-[190px] object-contain mb-3" src={product.images?.[0] || product.image_url} alt={product.name} />
                        <div className="w-full flex flex-col flex-1 justify-between">
                          <div>
                            <span className="block text-[0.75rem] font-bold text-[#0088ff] uppercase mb-1">{product.brand}</span>
                            <h4 className="text-sm sm:text-base font-bold text-[#1e293b] mb-3 leading-[1.3] line-clamp-2" title={product.name}>{product.name}</h4>
                          </div>
                          <div>
                            <div className="flex justify-between items-center w-full mt-2 pt-[10px] border-t border-dashed border-[#e2e8f0] gap-2">
                              <span className="text-[1rem] sm:text-[1.05rem] font-extrabold text-[#1e293b] truncate">EGP {price?.toLocaleString()}</span>
                              <button
                                className={`w-[38px] h-[38px] shrink-0 rounded-full border-none text-white text-[1.2rem] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                                  isAdded
                                    ? "bg-[#10b981] shadow-[0_4px_10px_rgba(16,185,129,0.25)]"
                                    : "bg-[#0088ff] shadow-[0_4px_10px_rgba(0,136,255,0.25)] hover:bg-[#0070d8]"
                                }`}
                                onClick={() => handleAddToCart(product)}
                              >
                                {isAdded ? <BiCheck /> : <FaCartPlus />}
                              </button>
                            </div>
                            <Link to={`/${product.id}`} className="block mt-3 w-full">
                              <button className="py-2.5 px-4 bg-white text-[#0088ff] border border-[#0088ff] rounded-[10px] w-full cursor-pointer text-sm sm:text-base font-semibold transition-all duration-300 ease-linear hover:bg-[#0088ff] hover:text-white">
                                Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}