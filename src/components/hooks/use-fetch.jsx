import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

export function useFetch(cb, params = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (body) => {
    try {
      setIsLoading(true);
      setError(null);

      const supabaseToken = await session.getToken({
        template: "supabase",
      });

      // if body is undefined, that's fine
      const result = await cb(supabaseToken, params, body);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { fn, data, isLoading, error };
}

  