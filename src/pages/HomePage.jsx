// import component //
import TopHeader from '../components/layout/TopHeader';
import BotHeader from '../components/layout/BotHeader';
import HeroSlider from '../features/products/HeroSlider';
import PhonesSwipper from '../features/products/PhonesSwipper';
import BrandButtons from '../features/products/BrandButtons';
import FeaturesBar from '../components/ui/FeaturesBar';
import PromotionalBanners from '../components/ui/PromotionalBanners';
import Footer from '../components/layout/Footer';
import Testimonials from '../components/ui/Testimonials';
import Spinner from '../components/ui/Spinner';

// import hooks //
import { useData } from '../context/DataContext';
import { useState } from 'react';

export default function HomePage() {
  const [phoneBrand , setPhoneBrand] = useState("apple")
  // console.log(phoneBrand)
  const { phones, isLoading } = useData();

  if (isLoading) return <Spinner message="  Loading..." fullScreen={true} />;

  return (
    <div className="flex flex-col items-center justify-center">
        
      <TopHeader />
      <BotHeader/>
      <HeroSlider/>
      <FeaturesBar/>
      <BrandButtons onSelectBrand = {setPhoneBrand}/>
        {/* <button name='apple' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Iphone</button>
        <button name='samsung' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Samsung</button>
        <button name='google' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Google</button>
        <button name='huawei' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Huawei</button>
        <button name='infinix' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Infinix</button>
        <button name='oneplus' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>OnePlus</button>
        <button name='oppo' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Oppo</button>
        <button name='realme' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Realme</button>
        <button name='vivo' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Vivo</button>
        <button name='Xiaomi' className='butto' onClick={(e)=>setPhoneBrand(e.target.name)}>Xaiomi</button> */}
        <PhonesSwipper name={phoneBrand}/>
        <PromotionalBanners/>
        <Testimonials/>
        <Footer/>
      
    </div>
  );
}