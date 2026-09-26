import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [phones, setPhones] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('phones')
          .select('*');

        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setPhones(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err.message);
      } finally {
        setLoading(false); // إيقاف التحميل دائماً سواء نجح الطلب أو فشل
      }
    };

    fetchPhones();
  }, []);

  return (
    <DataContext.Provider value={{ phones, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

// تصحيح تصدير الـ Hook بنجاح
export const useData = () => {
  return useContext(DataContext);
};