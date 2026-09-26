import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import TopHeader from "../components/layout/TopHeader";
import BotHeader from "../components/layout/BotHeader";
import PhoneCard from "../components/ui/PhoneCard";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("phones")
        .select("*")
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%`);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error("Search Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader />
      <BotHeader />
      
      <main className="max-w-[1280px] mx-auto px-5 pt-8 pb-[60px] min-h-[70vh]">
        <div className="flex justify-between items-baseline mb-7 border-b border-[#e2e8f0] pb-4">
          <h2 className="text-[1.65rem] font-bold text-[#0f172a]">
            Search Results for: <span className="text-[#2563eb]">"{query}"</span>
          </h2>
          {!loading && (
            <p className="text-[0.95rem] text-[#64748b]">
              Found <strong>{results.length}</strong> {results.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        {/* حالة الـ Loading باستخدام Skeleton Cards */}
        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-[12px] p-4 border border-[#f1f5f9] flex flex-col gap-3">
                <div className="w-full h-[200px] rounded-[8px] bg-[#e2e8f0] animate-pulse"></div>
                <div className="w-[75%] h-[18px] rounded-[4px] bg-[#e2e8f0] animate-pulse"></div>
                <div className="w-[40%] h-[22px] rounded-[4px] bg-[#e2e8f0] animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          /* حالة عدم وجود نتائج */
          <div className="text-center py-[60px] px-5 bg-white rounded-[12px] border border-dashed border-[#cbd5e1] max-w-[500px] my-10 mx-auto">
            <div className="text-[3rem] mb-4">🔍</div>
            <h3 className="text-[1.3rem] font-bold text-[#1e293b] mb-2">No Products Found</h3>
            <p className="text-[#64748b] text-[0.95rem] leading-[1.5]">We couldn't find anything matching "{query}". Try checking for spelling errors or searching for different keywords.</p>
          </div>
        ) : (
          /* عرض النتائج */
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            {results.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}