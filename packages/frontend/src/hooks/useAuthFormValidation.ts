import { useState } from "react";

interface ValidationErrors {
  username?: string;
  password?: string;
}

const useAuthFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (username: string, password: string): boolean => {
    const newErrors: ValidationErrors = {};

    if (!username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useAuthFormValidation;
