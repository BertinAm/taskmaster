import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { LoginFormValues } from "../validation/loginSchema";

type UseAuthReturn = {
  isLoading: boolean;
  error: string | null;
  login: (values: LoginFormValues) => Promise<boolean>;
};

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (values: LoginFormValues): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      return true;
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, login };
} 