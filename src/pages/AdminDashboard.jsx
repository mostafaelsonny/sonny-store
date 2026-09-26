import { useAdminDashboard } from "../features/admin/useAdminDashboard";
import { 
  BiGridAlt, 
  BiMobileAlt, 
  BiShoppingBag, 
  BiGroup, 
  BiPlusCircle, 
  BiTrash, 
  BiEdit, 
  BiSearch, 
  BiDollarCircle,
  BiX,
  BiBlock,
  BiUserCheck
} from "react-icons/bi";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";

export default function AdminDashboard() {
  const {
    activeTab,
    setActiveTab,
    phones,
    orders,
    users,
    loading,
    kpis,
    phoneSearch,
    setPhoneSearch,
    isPhoneModalOpen,
    setIsPhoneModalOpen,
    editingPhone,
    selectedOrderDetails,
    setSelectedOrderDetails,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleOpenPhoneModal,
    onSubmitPhone,
    handleDeletePhone,
    handleOrderStatusChange,
    handleToggleUserBlock,
  } = useAdminDashboard();

  return (
    <>
      <BotHeader />
      <div className="bg-[#f8fafc] min-h-screen px-4 sm:px-5 pt-8 sm:pt-10 pb-16 sm:pb-20 text-[#1e293b]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="mb-[25px] pb-[15px] border-b border-[#e2e8f0]">
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#1e293b]">Admin Operations Center</h2>
            <p className="text-[#64748b] text-sm sm:text-[0.95rem]">Manage phones catalog, monitor customer orders, and control platform accounts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[25px]">
            {/* Sidebar */}
            <aside className="flex flex-col gap-2">
              <button className={`flex items-center gap-[10px] px-4 py-3 rounded-[12px] font-semibold cursor-pointer transition-all duration-200 text-left border-none ${activeTab === "overview" ? "bg-[#0088ff] text-white shadow-[0_4px_12px_rgba(0,136,255,0.25)]" : "bg-transparent text-[#64748b] hover:bg-[#edf2f7] hover:text-[#1e293b]"}`} onClick={() => setActiveTab("overview")}>
                <BiGridAlt /> Overview KPIs
              </button>
              <button className={`flex items-center gap-[10px] px-4 py-3 rounded-[12px] font-semibold cursor-pointer transition-all duration-200 text-left border-none ${activeTab === "phones" ? "bg-[#0088ff] text-white shadow-[0_4px_12px_rgba(0,136,255,0.25)]" : "bg-transparent text-[#64748b] hover:bg-[#edf2f7] hover:text-[#1e293b]"}`} onClick={() => setActiveTab("phones")}>
                <BiMobileAlt /> Phones Catalog ({phones.length})
              </button>
              <button className={`flex items-center gap-[10px] px-4 py-3 rounded-[12px] font-semibold cursor-pointer transition-all duration-200 text-left border-none ${activeTab === "orders" ? "bg-[#0088ff] text-white shadow-[0_4px_12px_rgba(0,136,255,0.25)]" : "bg-transparent text-[#64748b] hover:bg-[#edf2f7] hover:text-[#1e293b]"}`} onClick={() => setActiveTab("orders")}>
                <BiShoppingBag /> Orders ({orders.length})
              </button>
              <button className={`flex items-center gap-[10px] px-4 py-3 rounded-[12px] font-semibold cursor-pointer transition-all duration-200 text-left border-none ${activeTab === "users" ? "bg-[#0088ff] text-white shadow-[0_4px_12px_rgba(0,136,255,0.25)]" : "bg-transparent text-[#64748b] hover:bg-[#edf2f7] hover:text-[#1e293b]"}`} onClick={() => setActiveTab("users")}>
                <BiGroup /> Users ({users.length})
              </button>
            </aside>

            {/* Main Content */}
            <main className="min-w-0">
              {loading ? (
                <Spinner message="Loading ..." />
              ) : (
                <>
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === "overview" && (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-[25px]">
                        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[18px] flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                          <BiDollarCircle className="text-[2.2rem] text-[#0088ff] shrink-0" />
                          <div>
                            <span className="text-[0.8rem] text-[#64748b] font-semibold block">Total Revenue</span>
                            <h3 className="text-[1.25rem] font-extrabold text-[#1e293b]">EGP {kpis.revenue.toLocaleString()}</h3>
                          </div>
                        </div>

                        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[18px] flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                          <BiShoppingBag className="text-[2.2rem] text-[#0088ff] shrink-0" />
                          <div>
                            <span className="text-[0.8rem] text-[#64748b] font-semibold block">Total Orders</span>
                            <h3 className="text-[1.25rem] font-extrabold text-[#1e293b]">{kpis.totalOrders}</h3>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              <span className="text-[0.72rem] font-bold bg-[#fef3c7] text-[#d97706] px-2 py-0.5 rounded-full">🟡 {kpis.pendingOrders} Pending</span>
                              <span className="text-[0.72rem] font-bold bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 rounded-full">🔵 {kpis.processingOrders} Processing</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[18px] flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                          <BiMobileAlt className="text-[2.2rem] text-[#0088ff] shrink-0" />
                          <div>
                            <span className="text-[0.8rem] text-[#64748b] font-semibold block">Available Phones</span>
                            <h3 className="text-[1.25rem] font-extrabold text-[#1e293b]">{kpis.totalPhones}</h3>
                          </div>
                        </div>

                        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[18px] flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                          <BiGroup className="text-[2.2rem] text-[#0088ff] shrink-0" />
                          <div>
                            <span className="text-[0.8rem] text-[#64748b] font-semibold block">Registered Users</span>
                            <h3 className="text-[1.25rem] font-extrabold text-[#1e293b]">{kpis.totalUsers}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PHONES CRUD */}
                  {activeTab === "phones" && (
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-5">
                        <div className="relative w-full sm:max-w-[300px] flex items-center">
                          <BiSearch className="absolute left-3 text-[#64748b]" />
                          <input 
                            type="text" 
                            placeholder="Search phones by name or brand..." 
                            value={phoneSearch} 
                            onChange={(e) => setPhoneSearch(e.target.value)} 
                            className="w-full py-2 pr-3 pl-9 rounded-full border border-[#e2e8f0] outline-none text-sm"
                          />
                        </div>
                        <button className="bg-[#0088ff] text-white py-[10px] px-[18px] rounded-full font-semibold cursor-pointer flex items-center justify-center gap-[6px] border-none text-sm hover:bg-[#0077e6] transition-colors shrink-0" onClick={() => handleOpenPhoneModal()}>
                          <BiPlusCircle /> Add New Phone
                        </button>
                      </div>

                      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 sm:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] overflow-x-auto">
                        <table className="w-full min-w-[520px] border-collapse text-left text-[0.9rem]">
                          <thead>
                            <tr>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Phone</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Brand</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Price</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {phones.map((p) => {
                              const priceVal = typeof p.price === "object" ? p.price?.amount : p.price;
                              return (
                                <tr key={p.id}>
                                  <td className="py-[14px] px-4 border-b border-[#e2e8f0]">
                                    <div className="flex items-center gap-3 font-semibold">
                                      <img src={p.thumbnail || (p.images && p.images[0])} alt={p.name} className="w-10 h-10 object-contain shrink-0" />
                                      <span>{p.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap"><span className="px-[10px] py-1 rounded-full bg-[#e2e8f0] text-[0.75rem] font-bold">{p.brand}</span></td>
                                  <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">EGP {Number(priceVal || 0).toLocaleString()}</td>
                                  <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">
                                    <button className="bg-transparent border-none text-[1.2rem] cursor-pointer text-[#64748b] hover:text-[#1e293b] mr-[6px] transition-colors" onClick={() => handleOpenPhoneModal(p)}><BiEdit /></button>
                                    <button className="bg-transparent border-none text-[1.2rem] cursor-pointer text-[#ef4444] hover:text-red-700 mr-[6px] transition-colors" onClick={() => handleDeletePhone(p.id)}><BiTrash /></button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ORDERS MANAGEMENT */}
                  {activeTab === "orders" && (
                    <div>
                      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 sm:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] overflow-x-auto">
                        <table className="w-full min-w-[680px] border-collapse text-left text-[0.9rem]">
                          <thead>
                            <tr>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Order ID</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Customer</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Phone</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">City</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Total</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Status</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((o) => (
                              <tr key={o.id}>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap"><code>#{o.id.slice(0, 8)}</code></td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{o.full_name}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{o.phone}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{o.city}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap"><strong>EGP {Number(o.total_amount).toLocaleString()}</strong></td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">
                                  <select
                                    className={`px-3 py-1.5 rounded-full border font-semibold text-[0.8rem] cursor-pointer outline-none transition-colors ${
                                      o.status === "pending"
                                        ? "bg-[#fef3c7] text-[#d97706] border-[#fcd34d]"
                                        : o.status === "processing"
                                        ? "bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]"
                                        : o.status === "completed"
                                        ? "bg-[#dcfce7] text-[#15803d] border-[#86efac]"
                                        : o.status === "cancelled"
                                        ? "bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]"
                                        : "bg-[#fef3c7] text-[#d97706] border-[#fcd34d]"
                                    }`}
                                    value={o.status || "pending"}
                                    onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                                  >
                                    <option value="pending">🟡 Pending</option>
                                    <option value="processing">🔵 Processing</option>
                                    <option value="completed">🟢 Completed</option>
                                    <option value="cancelled">🔴 Cancelled</option>
                                  </select>
                                </td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">
                                  <button className="bg-[#e2e8f0] text-[#1e293b] hover:bg-[#cbd5e1] transition-colors py-1.5 px-3 rounded-[12px] cursor-pointer border-none font-semibold text-xs" onClick={() => setSelectedOrderDetails(o)}>
                                    Items
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: USERS MANAGEMENT */}
                  {activeTab === "users" && (
                    <div>
                      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 sm:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] overflow-x-auto">
                        <table className="w-full min-w-[650px] border-collapse text-left text-[0.9rem]">
                          <thead>
                            <tr>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Name</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Email</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Phone</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Address</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Role</th>
                              <th className="py-[14px] px-4 border-b border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] font-bold uppercase text-[0.75rem] whitespace-nowrap">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u) => (
                              <tr key={u.id}>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{u.full_name || "N/A"}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{u.email || "N/A"}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">{u.phone_number || "N/A"}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0]">{u.shipping_address || "No address provided"}</td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">
                                  <span className={`px-[10px] py-1 rounded-full text-[0.75rem] font-bold ${u.role === "admin" ? "bg-[rgba(0,136,255,0.15)] text-[#0088ff]" : "bg-[#e2e8f0] text-[#1e293b]"}`}>
                                    {u.role || "user"}
                                  </span>
                                </td>
                                <td className="py-[14px] px-4 border-b border-[#e2e8f0] whitespace-nowrap">
                                  {u.role !== "admin" && (
                                    <button 
                                      className={`py-1.5 px-3 rounded-full border-none cursor-pointer font-semibold text-[0.8rem] flex items-center gap-1 transition-colors ${u.role === "blocked" ? "bg-[#dcfce7] text-[#15803d] hover:bg-[#bbf7d0]" : "bg-[#fee2e2] text-[#b91c1c] hover:bg-[#fecaca]"}`}
                                      onClick={() => handleToggleUserBlock(u.id, u.role)}
                                    >
                                      {u.role === "blocked" ? <><BiUserCheck /> Unblock</> : <><BiBlock /> Block</>}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Phone Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-[1000] p-4">
          <div className="bg-white p-4 sm:p-6 rounded-[20px] w-full max-w-[500px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-[#1e293b]">{editingPhone ? "Edit Phone Details" : "Add New Phone"}</h3>
              <button className="bg-transparent border-none text-[1.5rem] cursor-pointer text-[#64748b] hover:text-[#1e293b] transition-colors" onClick={() => setIsPhoneModalOpen(false)}><BiX /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmitPhone)} className="flex flex-col gap-[14px]">
              <div className="flex flex-col gap-[6px]">
                <label className="text-sm font-semibold text-[#1e293b]">Phone Model Name</label>
                <input type="text" className="px-3 py-2 rounded-[8px] border border-[#e2e8f0] outline-none focus:border-[#0088ff] text-sm" {...register("name")} />
                {errors.name && <span className="text-[#ef4444] text-[0.75rem]">{errors.name.message}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-sm font-semibold text-[#1e293b]">Brand</label>
                  <input type="text" placeholder="Apple, Samsung..." className="px-3 py-2 rounded-[8px] border border-[#e2e8f0] outline-none focus:border-[#0088ff] text-sm" {...register("brand")} />
                  {errors.brand && <span className="text-[#ef4444] text-[0.75rem]">{errors.brand.message}</span>}
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-sm font-semibold text-[#1e293b]">Price (EGP)</label>
                  <input type="number" className="px-3 py-2 rounded-[8px] border border-[#e2e8f0] outline-none focus:border-[#0088ff] text-sm" {...register("priceAmount")} />
                  {errors.priceAmount && <span className="text-[#ef4444] text-[0.75rem]">{errors.priceAmount.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-sm font-semibold text-[#1e293b]">Thumbnail / Image URL</label>
                <input type="text" placeholder="https://..." className="px-3 py-2 rounded-[8px] border border-[#e2e8f0] outline-none focus:border-[#0088ff] text-sm" {...register("thumbnail")} />
                {errors.thumbnail && <span className="text-[#ef4444] text-[0.75rem]">{errors.thumbnail.message}</span>}
              </div>

              <button type="submit" className="w-full bg-[#0088ff] text-white py-[10px] px-[18px] rounded-full font-semibold cursor-pointer flex items-center justify-center gap-[6px] border-none text-sm hover:bg-[#0077e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                {isSubmitting ? "Saving Phone..." : "Save Phone"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Items Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-[1000] p-4">
          <div className="bg-white p-4 sm:p-6 rounded-[20px] w-full max-w-[500px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-[#1e293b]">Order Details (#{selectedOrderDetails.id.slice(0, 8)})</h3>
              <button className="bg-transparent border-none text-[1.5rem] cursor-pointer text-[#64748b] hover:text-[#1e293b] transition-colors" onClick={() => setSelectedOrderDetails(null)}><BiX /></button>
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-[#1e293b]">
              <p><strong className="font-semibold text-slate-700">Customer:</strong> {selectedOrderDetails.full_name}</p>
              <p><strong className="font-semibold text-slate-700">Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong className="font-semibold text-slate-700">Address:</strong> {selectedOrderDetails.address}, {selectedOrderDetails.city}</p>
              <hr className="my-2 border-[#e2e8f0]" />
              <h4 className="font-bold text-base text-[#1e293b]">Total Paid: EGP {Number(selectedOrderDetails.total_amount).toLocaleString()}</h4>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}