import { useFav } from '../../context/FavProvider';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { IoMdCart } from 'react-icons/io';
import { RiShareForwardLine } from 'react-icons/ri';
import { useCart } from '../../context/CartProvider';

export default function PhoneCard({ phone }) {
  const { favPhones, handleFavPhones } = useFav();
  const { cartItems, addToCart } = useCart();
  console.log(phone)

  // 1. توحيد الـ ID (wishlist بتعتمد product_id بينما phones بتعتمد id)
  const productId = phone?.product_id || phone?.id;

  // 2. توحيد الصورة (إما image أو thumbnail أو أول صورة في المصفوفة)
  const imageUrl = phone?.image || phone?.thumbnail || phone?.images?.[0];

  // 3. توحيد السعر (معالجة حالة إذا كان number مباشر أو JSON object)
  const rawPrice = typeof phone?.price === 'object' ? phone?.price?.amount : phone?.price;
  const formattedPrice = Number(rawPrice || 12000).toLocaleString();

  // 4. المقارنة مع الـ Context باستخدام الـ ID الموحد
  const isFav = favPhones?.some((item) => (item.product_id || item.id) === productId);
  const isCart = cartItems?.some((item) => (item.product_id || item.id) === productId);

  const baseBtnClasses = "w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer text-[1.2rem] transition-all duration-300 ease border border-[rgba(255,255,255,0.15)] backdrop-blur-[8px] hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff]";
  const activeBtnClasses = `${baseBtnClasses} bg-[#0088ff] text-white border-[#0088ff]`;
  const nonActiveBtnClasses = `${baseBtnClasses} bg-[rgba(15,23,42,0.75)] text-white`;

  return (
    <div className="group bg-[rgba(255,255,255,0.1)] border border-[#e5e7eb] rounded-lg p-[12px] flex flex-col justify-evenly items-center gap-[10%] h-[400px] shadow-[0_2px_6px_rgba(143,26,26,0.05)] relative overflow-hidden transition-all duration-300 linear text-center hover:-translate-y-[5px] hover:border-[rgba(0,136,255,0.4)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.35)]">
      <div className="relative w-full h-[210px] bg-[rgba(255,255,255,0.02)] flex items-center justify-center p-[15px]">
        <img src={imageUrl} alt={phone?.name} className="max-w-full max-h-full object-contain transition-transform duration-500 ease group-hover:scale-105" />

        {/* Floating Action Buttons */}
        <div className="absolute top-[35%] -right-[22%] transition-all duration-300 linear bg-transparent text-black flex flex-col items-center gap-[5px] group-hover:right-[5%] group-hover:opacity-100 group-hover:z-10">
          <button
            className={isFav ? activeBtnClasses : nonActiveBtnClasses}
            onClick={() => handleFavPhones(phone)}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? <MdFavorite className="text-white" /> : <MdFavoriteBorder />}
          </button>

          <button 
            className={isCart ? activeBtnClasses : nonActiveBtnClasses}
            onClick={() => addToCart(phone)}
            title="Add to cart"
          >
            <IoMdCart />
          </button>

          <button title="Share" className={nonActiveBtnClasses}>
            <RiShareForwardLine />
          </button>
        </div>
      </div>

      <div className="p-[16px] flex flex-col gap-[6px] grow w-full">
        <span className="text-[20px] text-[#0088ff] uppercase tracking-[0.5px] font-semibold">{phone?.name || "Smartphone"}</span>
        
        <div className="flex items-center gap-[10px] mt-[4px] justify-center">
          <span className="text-[1.1rem] font-bold text-[#0088ff]">{formattedPrice}</span>
          <span style={{ color: "#94a3b8", fontSize: "large" }}>EGP</span>
        </div>
      </div>
    </div>
  );
}