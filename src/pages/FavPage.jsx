import { Link } from 'react-router-dom';
import { useFav } from '../context/FavProvider';
import { BiHeart, BiShoppingBag } from 'react-icons/bi';

// import components //
import PhoneCard from '../components/ui/PhoneCard';
import TopHeader from '../components/layout/TopHeader'

export default function FavPage() {
  const { favPhones } = useFav();

  // Empty State (English)
  if (!favPhones || favPhones.length === 0) {
    return (
        <div>
            <TopHeader/>
      <div className="min-h-[70vh] flex items-center justify-center p-5">
        <div className="bg-[#161b22]/90 border border-white/10 backdrop-blur-[16px] py-[50px] px-10 rounded-[20px] text-center max-w-[480px] w-full shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="w-20 h-20 bg-[#0088ff]/10 border border-[#0088ff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BiHeart className="text-[2.5rem] text-[#0088ff]" />
          </div>
          <h2 className="text-2xl text-white mb-3 font-bold">Your Wishlist is Empty!</h2>
          <p className="text-[#94a3b8] text-[0.95rem] leading-[1.6] mb-[30px]">You haven't added any smartphones to your favorites yet. Explore our latest collection and save the devices you love.</p>
          
          <Link to="/" className="inline-flex items-center justify-center gap-[10px] bg-[#0088ff] text-white font-semibold py-3 px-7 rounded-xl text-base transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(0,136,255,0.3)] hover:bg-[#0070d2] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,136,255,0.45)]">
            <BiShoppingBag />
            <span>Browse Phones Now</span>
          </Link>
        </div>
      </div>
        </div>
    );
  }

  // Favorite Items Grid (English)
  return (
    <div>

      <TopHeader/>
    <div className="max-w-[1200px] mx-auto px-5 pt-10 pb-20 text-white">
      <header className="mb-[35px] border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[2rem] font-bold m-0" style={{color:"black"}}>Favorite Phones</h1>
          <span className="bg-[#0088ff]/15 text-[#0088ff] border border-[#0088ff]/30 text-[0.85rem] py-1 px-3 rounded-[20px] font-semibold">{favPhones.length} items</span>
        </div>
        {/* <p className="text-[#a0aec0] text-[0.95rem] mt-2">All the devices you saved for quick access and price tracking</p> */}
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        {favPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
    </div>
  );
}