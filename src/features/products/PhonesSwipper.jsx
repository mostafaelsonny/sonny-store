import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";

// import cutome hooks //
import { useFav } from "../../context/FavProvider";
import { useData } from "../../context/DataContext";
import { useCart } from "../../context/CartProvider";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

export default function PhonesSwipper({ name }) {

  const { phones, isLoading } = useData();
  const {favPhones , handleFavPhones} = useFav()
  const {cartItems , addToCart} = useCart()

console.log(cartItems.length)
console.log(cartItems)


  console.log(favPhones)

  if (isLoading) return <Spinner message="  Loading..." />;

  // فلترة الهواتف بناءً على الماركة وأخذ أول 10 عناصر
  const filteredPhones = phones
    ?.filter((phone) => phone.brand?.toLowerCase() === name?.toLowerCase())
    ?.slice(0, );

  if (!filteredPhones || filteredPhones.length === 0) {
    return (
      <p className="text-center text-[#9ca3af] py-[30px]">لا توجد هواتف متوفرة لهذه الماركة حالياً</p>
    );
  }

  const baseFavBtn = "w-[40px] h-[40px] rounded-full border border-[#0088ff] cursor-pointer transition-all duration-300 linear flex items-center justify-center text-[x-large]";
  const nonActiveFavBtn = `${baseFavBtn} bg-white`;
  const activeFavBtn = `${baseFavBtn} bg-[#0088ff] text-white`;

  return (
    <div className="w-full max-w-[1650px] mx-auto px-[10px] py-[20px] box-border">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={filteredPhones.length > 1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 14 },
          1024: { slidesPerView: 5, spaceBetween: 15 }, // 👈 عرض 5 كروت مع مسافات مناسبة
        }}
        className="w-full !pb-[48px] !px-[6px] !pt-[12px]"
      >
        {filteredPhones.map((phone) => {
          // استخراج رابط الصورة بامان
          const imageUrl = phone.images?.[0] || phone.thumbnail;

          // تنسيق السعر سوار كان Object أو Number
          const priceAmount =
            typeof phone.price === "object" ? phone.price?.amount || "16,320" : "12,000";
          const currency =
            typeof phone.price === "object"
              ? phone.price?.currency || "EGP"
              : "EGP";

          return (
            <Link to={`./${phone.id}`}>

            <SwiperSlide key={phone.id} className="h-auto bg-[rgba(255,255,255,0.1)]">
              <div className="group bg-[rgba(255,255,255,0.1)] border border-[#e5e7eb] rounded-[8px] p-[12px] flex flex-col justify-evenly items-center gap-[5%] h-[460px] shadow-[0_2px_6px_rgba(143,26,26,0.05)] relative overflow-hidden transition-all duration-300 linear hover:-translate-y-[6px] hover:border-[rgba(0,136,255,0.4)] hover:shadow-[0_2px_6px_#0088ff] hover:bg-[rgba(255,255,255,0.3)]">
                <div className="w-full h-[300px] flex items-center justify-center mb-[8px]">
                  <img
                    src={imageUrl}
                    alt={phone.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                    loading="lazy"
                  />
                </div>
                  <h4 className="text-[15px] font-semibold m-0 line-clamp-1">{phone.name}</h4>
                <div className="flex flex-col justify-between grow w-full">

                  <div className="flex flex-col items-center justify-between mt-[10px] pt-[10px] gap-[10%] border-t border-[rgba(255,255,255,0.05)] w-full">
                    <div className="text-[#0088ff] text-xl font-bold">
                      {priceAmount?.toLocaleString()}{" "}
                      <span className="text-lg text-[#94a3b8]">{currency}</span>
                    </div>
                  <Link to={`/${phone.id}`} className="w-full"><button className="p-[10px] bg-white text-[#0088ff] border border-[#0088ff] rounded-[10px] w-full cursor-pointer text-[18px] transition-all duration-300 linear hover:bg-[#0088ff] hover:text-white">Details</button></Link>
                  </div>
                </div>
                <div className="absolute top-[35%] -right-[20%] transition-all duration-300 linear bg-transparent text-black flex flex-col items-center gap-[5px] group-hover:right-[5%] group-hover:opacity-100 group-hover:z-[2] group-hover:bg-transparent">
                <button className={favPhones.some(item=> item.id === phone.id)? activeFavBtn : nonActiveFavBtn}
                      onClick={(e)=>{ e.preventDefault(); handleFavPhones(phone); }} 
                ><MdFavoriteBorder/></button>
                <button className={cartItems.some(item=> item.id === phone.id)? activeFavBtn : nonActiveFavBtn}
                        onClick={(e)=>{ e.preventDefault(); addToCart(phone); }} 
                ><IoMdCart/></button>
                <button className={nonActiveFavBtn} onClick={(e)=>e.preventDefault()}><RiShareForwardLine/></button>
                </div>
              </div>
            </SwiperSlide>
            </Link>
          );
        })}
      </Swiper>
    </div>
  );
}
