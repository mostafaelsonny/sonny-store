import { useState } from "react";
import { IoListSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // إضافة أيقونة البروفايل
import { CiLogin } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi"; // أيقونة الخروج
import { useAuth } from "../../context/AuthContext";
// import AuthModal from "../../features/auth/AuthModal";

import { Link, useNavigate  } from "react-router-dom";

export default function BotHeader() {

  const { user, logout } = useAuth();
  console.log(user)

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#0063f0] text-white">
      {/* Main bar */}
      <div className="w-full flex justify-between items-center px-4 sm:px-6">
        {/* Desktop Nav */}
        <ul className="hidden md:flex list-none m-0 p-0 gap-1">
          <Link to='/' style={{textDecoration:"none",color:"white"}}><li className="text-base p-4 hover:bg-[#0052cc] transition-colors">Home</li></Link>
          <Link to='/about' style={{textDecoration:"none",color:"white"}}><li className="text-base p-4 hover:bg-[#0052cc] transition-colors">About</li></Link>
          <Link to='/shop' style={{textDecoration:"none",color:"white"}}><li className="text-base p-4 hover:bg-[#0052cc] transition-colors">Shop</li></Link>
          <Link to='/blog' style={{textDecoration:"none",color:"white"}}><li className="text-base p-4 hover:bg-[#0052cc] transition-colors">Blog</li></Link>
          <Link to='/contact' style={{textDecoration:"none",color:"white"}}><li className="text-base p-4 hover:bg-[#0052cc] transition-colors">Contact</li></Link>
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden p-3 text-white focus:outline-none"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <IoListSharp className="text-2xl" />
        </button>

        {/* Auth section */}
        <div className="flex items-center gap-3 py-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link to='/profile'><FaUserCircle className="text-[28px] text-white cursor-pointer" /></Link>
                <span className="hidden sm:inline text-[#e2e8f0] max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                  {user.user_metadata?.full_name || "User"}
                </span>
              </div>
              <button
                className="flex items-center gap-1 bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#fca5a5] py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444]"
                onClick={logout}
                title="Log Out"
              >
                <FiLogOut className="text-base" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CiLogin onClick={() => navigate("/login")} className="text-2xl cursor-pointer hover:opacity-80 transition-opacity" title="Log In" />
              <TiUserAdd onClick={() => navigate("./signup")} className="text-2xl cursor-pointer hover:opacity-80 transition-opacity" title="Sign Up" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0052cc] border-t border-[rgba(255,255,255,0.15)]">
          <ul className="list-none m-0 p-0 flex flex-col">
            {[
              {to:'/', label:'Home'},
              {to:'/about', label:'About'},
              {to:'/blog', label:'Blog'},
              {to:'/contact', label:'Contact'},
              {to:'/shop', label:'Shop'},
            ].map(({to, label}) => (
              <Link key={to} to={to} style={{textDecoration:"none",color:"white"}} onClick={() => setMenuOpen(false)}>
                <li className="px-5 py-3 text-base hover:bg-[#004ab5] transition-colors border-b border-[rgba(255,255,255,0.08)]">{label}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}