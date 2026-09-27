import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {  
  BiCreditCard, 
  BiHeart, 
  BiCheckCircle, 
  BiChip, 
  BiMobileAlt, 
  BiCamera, 
  BiBattery, 
  BiWifi, 
  BiShieldQuarter, 
  BiArrowBack,
  BiTrendingUp
} from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartProvider";
import { useFav } from "../context/FavProvider";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";
import TopHeader from "../components/layout/TopHeader";

export default function PhoneDetailPage() {
  const { phoneId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favPhones, handleFavPhones } = useFav();

  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("phones")
          .select("*")
          .eq("id", phoneId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setPhone(data);
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching phone details:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [phoneId]);

  if (loading) return <Spinner message="Loading flagship specs..." fullScreen={true} />;

  if (!phone) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-[#64748b]">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")}><BiArrowBack /> Back to Store</button>
      </div>
    );
  }

  // Formatting price
  const basePrice = phone.price?.amount || phone.price || 0;
  const currency = phone.price?.currency || "EGP";

  const isFav = favPhones?.some((item) => (item.product_id || item.id) === (phone.product_id || phone.id));

  const handleAddToCart = async () => {
    setAdding(true);
    // تجهيز كائن المنتج ليمر بأمان للـ CartProvider
    const cartProduct = {
      id: phone.id,
      name: `${phone.name} (${selectedVariant ? selectedVariant.storageGB + 'GB' : ''})`,
      price: basePrice,
      image: phone.images?.[0] || "",
    };
    await addToCart(cartProduct);
    setAdding(false);
  };

  return (
    <>
    <TopHeader/>
      <BotHeader />
      <div className="bg-[#f8fafc] min-h-[90vh] pt-[30px] px-4 sm:px-5 pb-20 text-[#0f172a]">
        <div className="max-w-[1100px] mx-auto">
          
          {/* Back Button */}
          <button className="inline-flex items-center gap-1.5 bg-transparent border-none text-[#64748b] font-bold cursor-pointer mb-6 transition-colors duration-200 hover:text-[#0088ff]" onClick={() => navigate(-1)}>
            <BiArrowBack /> Back
          </button>

          {/* Top Section: Media & Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 items-start mb-[50px]">
            
            {/* Gallery Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-[20px] p-10 flex items-center justify-center relative border border-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                <span className="absolute top-5 left-5 bg-[#0f172a] text-white text-xs font-extrabold py-1 px-3 rounded-[20px]">{phone.brand?.toUpperCase()}</span>
                
                {/* Wishlist Button */}
                <button 
                  className={`absolute top-5 right-5 w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer text-[1.4rem] transition-all duration-300 ease border ${isFav ? 'bg-[#ef4444] text-white border-[#ef4444]' : 'bg-white text-[#64748b] border-[#e2e8f0] hover:text-[#ef4444] hover:border-[#ef4444]'}`}
                  onClick={() => handleFavPhones(phone)}
                  title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>

                <img src={phone.images?.[0]} alt={phone.name} className="max-w-full max-h-[380px] object-contain" />
              </div>
            </motion.div>

            {/* Info & Buying Controls */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-5">
                <span className="inline-flex items-center gap-1 text-[#0088ff] text-[0.82rem] font-extrabold uppercase"><BiTrendingUp /> {phone.category}</span>
                <h1 className="text-[2rem] font-extrabold text-[#0f172a] my-1.5">{phone.name}</h1>
                <p className="text-[#64748b] text-[0.95rem]">{phone.specs?.operatingSystem}</p>
              </div>

              {/* Price Tag */}
              <div className="bg-white py-4 px-5 rounded-xl border border-[#e2e8f0] mb-6">
                <span className="block text-[1.8rem] font-extrabold text-[#0088ff]">{basePrice.toLocaleString()} {currency}</span>
                <span className="text-[0.8rem] text-[#94a3b8]">Includes local taxes & shipping options</span>
              </div>

              {/* Variants Selector */}
              {phone.variants && phone.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-[0.88rem] font-bold text-[#334155] mb-2.5">Storage / RAM Option:</label>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
                    {phone.variants.map((v) => (
                      <button
                        key={v.id}
                        className={`border-2 rounded-xl p-3 flex flex-col items-center cursor-pointer transition-all duration-200 ease-in-out ${
                          selectedVariant?.id === v.id
                            ? "border-[#0088ff] bg-[rgba(0,136,255,0.04)]"
                            : "border-[#e2e8f0] bg-white"
                        }`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        <span className="font-extrabold text-[#0f172a] text-[0.95rem]">{v.storageGB} GB</span>
                        <span className="text-[0.78rem] text-[#64748b]">{v.ramGB} GB RAM</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {phone.colors && phone.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-[0.88rem] font-bold text-[#334155] mb-2.5">Selected Color: <strong>{selectedColor}</strong></label>
                  <div className="flex gap-2.5 flex-wrap">
                    {phone.colors.map((color) => (
                      <button
                        key={color}
                        className={`border py-2 px-4 rounded-[20px] text-[0.85rem] font-bold cursor-pointer transition-all duration-200 ${
                          selectedColor === color
                            ? "bg-[#0f172a] text-white border-[#0f172a]"
                            : "bg-white text-[#334155] border-[#cbd5e1]"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-6">
                <button className="p-[14px] rounded-xl font-extrabold text-[0.95rem] border-none cursor-pointer flex items-center justify-center gap-2 transition-all duration-[250ms] bg-[#0088ff] text-white hover:bg-[#0066cc]" onClick={handleAddToCart} disabled={adding}>
                  <FaCartPlus /> {adding ? "Adding..." : "Add To Cart"}
                </button>
                <button className="p-[14px] rounded-xl font-extrabold text-[0.95rem] border-none cursor-pointer flex items-center justify-center gap-2 transition-all duration-[250ms] bg-[#0f172a] text-white hover:bg-[#1e293b]" onClick={() => { handleAddToCart(); navigate("/checkout"); }}>
                  <BiCreditCard /> Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-4 text-[0.82rem] font-bold text-[#64748b]">
                <div className="flex items-center gap-1.5"><BiShieldQuarter /> 1 Year Official Warranty</div>
                <div className="flex items-center gap-1.5"><BiCheckCircle /> Express Local Delivery</div>
              </div>

            </motion.div>
          </div>

          {/* Technical Specs Grid */}
          {phone.specs && (
            <motion.div 
              className="bg-white p-8 rounded-[20px] border border-[#e2e8f0]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-[1.4rem] font-extrabold mb-6">Technical Specifications</h2>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
                
                {/* Processor */}
                <div className="flex items-start gap-[14px] p-4 bg-[#f8fafc] rounded-xl">
                  <div className="text-[1.6rem] text-[#0088ff] bg-[rgba(0,136,255,0.1)] p-2.5 rounded-[10px]"><BiChip /></div>
                  <div>
                    <h4 className="text-[0.85rem] text-[#64748b] mb-0.5">Processor</h4>
                    <p className="font-extrabold text-[0.92rem] text-[#0f172a]">{phone.specs.processor?.chipset || "N/A"}</p>
                  </div>
                </div>

                {/* Display */}
                <div className="flex items-start gap-[14px] p-4 bg-[#f8fafc] rounded-xl">
                  <div className="text-[1.6rem] text-[#0088ff] bg-[rgba(0,136,255,0.1)] p-2.5 rounded-[10px]"><BiMobileAlt /></div>
                  <div>
                    <h4 className="text-[0.85rem] text-[#64748b] mb-0.5">Display</h4>
                    <p className="font-extrabold text-[0.92rem] text-[#0f172a]">{phone.specs.display?.sizeInches}" AMOLED, {phone.specs.display?.refreshRateHz}Hz</p>
                    <span className="block text-[0.75rem] text-[#94a3b8] mt-0.5">{phone.specs.display?.resolution}</span>
                  </div>
                </div>

                {/* Camera */}
                <div className="flex items-start gap-[14px] p-4 bg-[#f8fafc] rounded-xl">
                  <div className="text-[1.6rem] text-[#0088ff] bg-[rgba(0,136,255,0.1)] p-2.5 rounded-[10px]"><BiCamera /></div>
                  <div>
                    <h4 className="text-[0.85rem] text-[#64748b] mb-0.5">Camera System</h4>
                    <p className="font-extrabold text-[0.92rem] text-[#0f172a]">Rear: {phone.specs.camera?.rearMegapixels?.join(" + ")} MP</p>
                    <span className="block text-[0.75rem] text-[#94a3b8] mt-0.5">Front: {phone.specs.camera?.frontMegapixels?.join(" + ")} MP</span>
                  </div>
                </div>

                {/* Battery */}
                <div className="flex items-start gap-[14px] p-4 bg-[#f8fafc] rounded-xl">
                  <div className="text-[1.6rem] text-[#0088ff] bg-[rgba(0,136,255,0.1)] p-2.5 rounded-[10px]"><BiBattery /></div>
                  <div>
                    <h4 className="text-[0.85rem] text-[#64748b] mb-0.5">Battery Capacity</h4>
                    <p className="font-extrabold text-[0.92rem] text-[#0f172a]">{phone.specs.battery?.capacityMah} mAh</p>
                  </div>
                </div>

                {/* Network */}
                <div className="flex items-start gap-[14px] p-4 bg-[#f8fafc] rounded-xl">
                  <div className="text-[1.6rem] text-[#0088ff] bg-[rgba(0,136,255,0.1)] p-2.5 rounded-[10px]"><BiWifi /></div>
                  <div>
                    <h4 className="text-[0.85rem] text-[#64748b] mb-0.5">Connectivity</h4>
                    <p className="font-extrabold text-[0.92rem] text-[#0f172a]">{phone.specs.network?.["5G"] ? "5G Ready Enabled" : "4G LTE"}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}