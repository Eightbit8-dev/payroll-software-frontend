import axiosInstance from "../utils/axios";
import axios from "axios";
import { type LoanDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";

/**
 * -------------------------------------------
 * Blood Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all Bloodes
 *  - Create a new Blood
 *  - Edit an existing Blood
 *  - Delete a Blood
 *
 * Handles authentication, API errors, and notifications
 */

/**
 * 🔍 Fetch all Loans
 */
export const useFetchLoans = () => {
  const fetchAllLoans = async (): Promise<LoanDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.loans, {
        //All api routes are inside this file
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Loans");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Loans",
        );
      } else {
        toast.error("Something went wrong while fetching Loans");
      }
      throw new Error("Loan fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Loans"], //cache key
    queryFn: fetchAllLoans,
    staleTime: 1000 * 60 * 0, //expoiy time
    retry: 1,
  });
};

/**
 * ➕ Create a new Loan
 */
export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  const createLoan = async (newLoan: LoanDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(apiRoutes.loans, newLoan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Loan");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create Loan");
      } else {
        toast.error("Something went wrong while creating Loan");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createLoan,
    onSuccess: () => {
      toast.success("Loan created successfully");
      queryClient.invalidateQueries({ queryKey: ["Loans"] });
    },
  });
};

/**
 * ✏️ Edit an existing Loan
 */
export const useEditLoan = () => {
  const queryClient = useQueryClient();

  const editLoan = async (updatedLoan: LoanDetails) => {
    console.log("Edit called with:", updatedLoan);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: LoanId, ...payload } = updatedLoan;

    const res = await axiosInstance.put(
      `${apiRoutes.loans}/${LoanId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Loan");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editLoan,
    onSuccess: () => {
      toast.success("Loan updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Loans"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a Loan
 */
export const useDeleteLoan = () => {
  const queryClient = useQueryClient();

  const deleteLoan = async (Loan: LoanDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.loans}/${Loan.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Loan");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteLoan,
    onSuccess: () => {
      toast.success("Loan deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Loans"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
