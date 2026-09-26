
export default function FeaturesBar() {
  const features = [
    {
      id: 1,
      title: "Free & Fast Delivery",
      description: "Free shipping directly to your doorstep",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12 0A2.25 2.25 0 0113.5 16.5h-3a2.25 2.25 0 01-2.25-2.25"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "100% Official Warranty",
      description: "Genuine products with official warranty",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Secure Payment",
      description: "Cash on delivery or card payment",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Easy Returns",
      description: "Hassle-free 14-day return policy",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full max-w-[1600px] m-[20px_auto] lg:m-[20px_100px] px-[16px] box-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between items-center gap-[16px] sm:gap-[20px] p-[20px_16px] lg:p-[24px_28px] bg-white border border-[rgba(255,255,255,0.08)] backdrop-blur-[12px] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-black mb-[100px]">
        {features.map((feature, idx) => (
          <div key={feature.id} className="group flex items-center gap-[16px] flex-1 p-[4px_0] sm:p-[8px_12px] transition-transform duration-300 ease-in-out relative hover:-translate-y-[2px] lg:after:content-[''] lg:after:absolute lg:after:-right-[10px] lg:after:top-[15%] lg:after:h-[70%] lg:after:w-[1px] lg:after:bg-[rgba(255,255,255,0.08)] lg:last:after:hidden">
            <div className="w-[52px] h-[52px] min-w-[52px] bg-[rgba(0,136,255,0.1)] border border-[rgba(0,136,255,0.25)] rounded-[12px] flex items-center justify-center text-[#0088ff] transition-all duration-300 ease-in-out group-hover:bg-[#0088ff] group-hover:text-white group-hover:shadow-[0_0_16px_rgba(0,136,255,0.5)] group-hover:border-[#0088ff]">
              {/* Clone the SVG to add strokeWidth class, though it's already there in the object, just in case */}
              {feature.icon}
            </div>
            <div className="flex flex-col gap-[4px]">
              <h4 className="text-black text-[0.95rem] font-semibold m-0 leading-[1.2]">{feature.title}</h4>
              <p className="text-[#94a3b8] text-[0.8rem] m-0 leading-[1.3]">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}