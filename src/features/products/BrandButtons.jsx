import { useData } from "../../context/DataContext";
import { useState } from "react";
import Spinner from "../../components/ui/Spinner";

export default function BrandButtons({ onSelectBrand }) {
  // 1. استخراج الأسماء الفريدة للبراندات
  const {phones , isLoading} = useData()
  const uniqueBrands = [...new Set(phones?.map((phone) => phone.brand))];
  const [activeBrand, setActiveBrand] = useState(uniqueBrands[0] || "");
  
  if(isLoading) return <Spinner message="Loading brands..." />;

  const baseBtnClasses = "w-[80px] h-[48px] sm:w-[100px] sm:h-[60px] flex items-center justify-center border border-[#0088ff] rounded-[50%] text-center cursor-pointer transition-all duration-300 linear text-[13px] sm:text-[15px]";
  const nonActiveClasses = `${baseBtnClasses} bg-white hover:bg-[#0088ff] hover:text-white`;
  const activeClasses = `${baseBtnClasses} bg-[#0088ff] text-white`;

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-wrap justify-center items-center mb-[30px] gap-2 sm:gap-[10px] px-3 sm:px-0">
      {uniqueBrands.map((brandName) => (
        <button 
          className={activeBrand === brandName ? activeClasses : nonActiveClasses}
          key={brandName} 
          onClick={() => {
            onSelectBrand(brandName);
            setActiveBrand(brandName);
          }}
        >
          {brandName}
        </button>
      ))}
    </div>
  );
}