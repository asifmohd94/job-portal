import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

export function useFetch(cb, params = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const { session } = useSession();
  
    const fn = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const supabaseToken = await session.getToken({
          template: "supabase",
        });
  
        const result = await cb(supabaseToken, params);
        setData(result);
  
        return result;
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { fn, data, isLoading, error };
  }
  