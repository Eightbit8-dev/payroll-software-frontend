import { useMutation } from "@tanstack/react-query";
import type { signInRequestType, SignInResponseType } from "../types/apiTypes";
import axios from "axios";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import { SignInSchema } from "../utils/validationSchema";
import { ZodError } from "zod";
import { apiRoutes } from "../routes/apiRoutes";

const signInRequest = async (
  data: signInRequestType,
): Promise<SignInResponseType> => {
  try {
    const parsed = SignInSchema.parse(data);

    const response = await axiosInstance.post(apiRoutes.signin, parsed);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Sign-in successful!");
      return response.data;
    } else {
      throw new Error(response.data?.message || "Login failed");
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const firstError = error.errors?.[0]?.message ?? "Invalid input";
      toast.error(firstError);
    } else if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } else {
      toast.error("Something went wrong while creating branch");
    }
    throw error; // Ensure React Query knows it failed
  }
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInRequest,
  });
};
