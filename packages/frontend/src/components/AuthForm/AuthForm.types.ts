import { FormEvent } from "react";

export interface AuthFormProps {
  tab: number;
  setTab: (tab: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface AuthFormFieldsProps {
  tab: number;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  image: File | null;
  setImage: (file: File | null) => void;
  errors: {
    username?: string;
    password?: string;
  };
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loginError?: string;
  registerError?: string;
}
