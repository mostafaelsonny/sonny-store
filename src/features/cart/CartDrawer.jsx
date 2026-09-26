import { IoMdClose } from "react-icons/io";
import { BiShoppingBag, BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartProvider";

export default function CartDrawer() {
  const {
    cartItems,
    toggleCart,
    isOpenCart,
    addToCart,
    removeFromCart,
    decreaseQuantity ,
    clearCart
  } = useCart();

  //   if (!isOpenCart) return null;

  const numCartItems = cartItems.map((phone) => {
    return phone.quantity;
  });
  const priceCartItems = cartItems.map((phone) => {
    return phone.price * phone.quantity;
  });

  const itemsNum = numCartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const totalItemsPrice = priceCartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );


  const navigate = useNavigate()

  function handleProceed () {
    toggleCart()
    navigate("/checkout");
  }

  // remove items from cart //

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.65)] backdrop-blur-[6px] z-[1000] flex justify-end transition-opacity duration-300 ${isOpenCart ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className={`w-full max-w-[420px] h-full bg-[rgba(9,28,85,0.82)] border-l border-[rgba(255,255,255,0.1)] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpenCart ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative p-[16px] sm:p-[20px_24px] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-[8px] sm:gap-[10px] text-white pr-[36px] sm:pr-0 min-w-0">
            <BiShoppingBag className="text-[1.3rem] sm:text-[1.5rem] text-[#0088ff] shrink-0" />
            <h2 className="text-[1.05rem] sm:text-[1.2rem] font-bold m-0 truncate">Your Shopping Cart</h2>
            <span className="bg-[rgba(0,136,255,0.2)] text-[#0088ff] border border-[rgba(0,136,255,0.4)] py-[2px] px-[6px] sm:px-[8px] rounded-[12px] text-[0.75rem] sm:text-[0.8rem] font-semibold shrink-0">{itemsNum}</span>
          </div>
          <button className="absolute top-[14px] sm:top-[15px] right-[14px] sm:right-[20px] bg-transparent border-none text-[#94a3b8] text-[1.4rem] sm:text-[1.6rem] cursor-pointer transition-colors duration-200 flex items-center hover:text-white" onClick={toggleCart} title="Close Cart">
            <IoMdClose />
          </button>
        </div>

        {/* Body (Static Items List) */}
        <div className="flex-1 overflow-y-auto p-[14px_16px] sm:p-[20px_24px]">
          <div className="flex flex-col gap-[12px] sm:gap-[16px]">
            {/* Dummy Item 1 */}
            {cartItems?.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-[10px] sm:gap-[14px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-[10px] sm:p-[12px] rounded-[12px]">
                  <img
                    src={item.image}
                    alt="Smartphone"
                    className="w-[58px] h-[58px] sm:w-[70px] sm:h-[70px] object-contain bg-[rgba(255,255,255,0.02)] rounded-[8px] p-[4px] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-[3px] sm:gap-[4px]">
                    <h4 className="text-white text-[0.88rem] sm:text-[0.95rem] font-semibold m-0 truncate">{item.name}</h4>
                    <div className="text-[#0088ff] font-bold text-[0.88rem] sm:text-[0.95rem]">
                      {item.price.toLocaleString()} <span className="text-[0.75rem] sm:text-[0.8rem] text-[#94a3b8]">EGP</span>
                    </div>

                    <div className="flex items-center gap-[8px] sm:gap-[10px] mt-[4px] sm:mt-[6px]">
                      <button
                        className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-white w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0088ff] hover:border-[#0088ff] shrink-0 text-xs sm:text-sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <BiMinus />
                      </button>
                      <span className="text-white text-[0.8rem] sm:text-[0.85rem] font-semibold">{item.quantity}</span>
                      <button
                        className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-white w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0088ff] hover:border-[#0088ff] shrink-0 text-xs sm:text-sm"
                        onClick={() => addToCart(item)}
                      >
                        <BiPlus />
                      </button>
                    </div>
                  </div>

                  <button className="bg-transparent border-none text-[#ef4444] text-[1.1rem] sm:text-[1.2rem] cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100 p-1 shrink-0" title="Remove Item" onClick={()=>removeFromCart(item.id)}>
                    <BiTrash />
                  </button>
                </div>
              );
            })}

            {/* Dummy Item 2 */}
          </div>
        </div>

        {/* Footer (Static Actions) */}
        <div className="p-[16px] sm:p-[20px_24px] border-t border-[rgba(255,255,255,0.08)] bg-[rgba(10,15,30,0.5)]">
          <div className="flex justify-between items-center text-white text-[0.95rem] sm:text-[1.1rem] font-semibold mb-[4px]">
            <span>Subtotal</span>
            <span className="text-[#0088ff] text-[1.15rem] sm:text-[1.3rem] font-bold">
              {totalItemsPrice.toLocaleString()} EGP
            </span>
          </div>
          <p className="text-[#64748b] text-[0.75rem] sm:text-[0.8rem] mb-[12px] sm:mb-[16px]">
            Taxes and shipping calculated at checkout.
          </p>

          <div className="flex flex-col gap-[8px] sm:gap-[10px]">
            <button onClick={handleProceed} className="w-full bg-[#0088ff] text-white border-none p-[12px] sm:p-[14px] rounded-[12px] text-[0.9rem] sm:text-[1rem] font-bold cursor-pointer transition-colors duration-200 shadow-[0_4px_15px_rgba(0,136,255,0.3)] hover:bg-[#0070d2]">Proceed to Checkout</button>
            <button onClick={clearCart} className="w-full bg-transparent text-[#ef4444] border border-[rgba(239,68,68,0.3)] p-[8px] sm:p-[10px] rounded-[12px] text-[0.85rem] sm:text-[0.9rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.1)]">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
