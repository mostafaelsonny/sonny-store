import { BiCart, BiHeart, BiSearch } from "react-icons/bi";
import logoImg from "../../img/icon.png";
import { useFav } from '../../context/FavProvider';
import { useCart } from "../../context/CartProvider";
import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

export default function TopHeader() {
  const { favPhones } = useFav();
  const { cartItems, isOpenCart, toggleCart } = useCart();
  const favCounter = favPhones.length;

  const itemsNum = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinkBaseClasses = "relative text-2xl flex items-center justify-center rounded-full w-[40px] h-[40px] transition-all duration-300 cursor-pointer text-center group";
  const navLinkFavClasses = `${navLinkBaseClasses} border border-[rgba(65,62,62,0.411)] bg-white hover:text-white hover:bg-[#0088ff] hover:border-[#0088ff]`;
  const navLinkFavoClasses = `${navLinkBaseClasses} border border-[#0088ff] bg-[#0088ff] text-white`;

  return (
    <div className="w-full sticky top-0 z-10 bg-white shadow-sm">
      {/* Row 1: Logo + Icons */}
      <div className="flex items-center justify-between px-3 sm:px-8 py-4 sm:py-3">
        {/* Logo */}
        <div className="flex items-center gap-1 shrink-0">
          <Link to='/'><img src={logoImg} alt="Sonny Store Logo" className="w-9 sm:w-[50px]" /></Link>
          <div className="hidden sm:flex flex-col leading-tight">
            <Link to='/' style={{ textDecoration: "none" }}>
              <span className="text-black font-sans font-bold text-2xl sm:text-[32px] leading-none">Sonny</span>
            </Link>
            <span className="text-black text-xs"><span className="text-[#0090f0] font-semibold">OnLine</span> Store</span>
          </div>
        </div>

        {/* Search — hidden on xs, shown from sm up */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center flex-1 max-w-[420px] lg:max-w-[600px] mx-4 bg-[#f0f2f2] border border-[#8abecf] rounded-full overflow-hidden">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="search for phone"
            className="flex-1 border-none outline-none bg-transparent py-2 px-4 text-sm text-[#333]"
          />
          <button type="submit" className="bg-[#0088ff] border-none outline-none py-2 px-4 text-white text-lg cursor-pointer flex items-center justify-center transition-colors duration-200">
            <BiSearch />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <NavLink
            to="/FavPage"
            className={({ isActive }) => (isActive ? navLinkFavoClasses : navLinkFavClasses)}
          >
            <BiHeart />
            <span className="absolute -top-[20%] -right-[5%] text-xs bg-[#0088ff] rounded-full w-5 h-5 flex justify-center items-center text-white">{favCounter}</span>
          </NavLink>
          <button onClick={toggleCart} className={isOpenCart ? navLinkFavoClasses : navLinkFavClasses}>
            <BiCart />
            <span className="absolute -top-[25%] -right-[5%] text-xs bg-[#0088ff] rounded-full w-5 h-5 flex justify-center items-center text-white">{itemsNum}</span>
          </button>
        </div>
      </div>

      {/* Row 2: Mobile-only search bar */}
      <div className="sm:hidden px-3 pb-2">
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-[#f0f2f2] border border-[#8abecf] rounded-full overflow-hidden">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="search for phone"
            className="flex-1 border-none outline-none bg-transparent py-2 px-4 text-sm text-[#333]"
          />
          <button type="submit" className="bg-[#0088ff] border-none outline-none py-2 px-4 text-white text-lg cursor-pointer flex items-center justify-center">
            <BiSearch />
          </button>
        </form>
      </div>
    </div>
  );
}