import axiosInstance from "../utils/axios";
import axios from "axios";
import type { AllowanceDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";
import type { DropdownOption } from "../components/common/DropDown";

// addon for getting allowance types
export const useFetchAllowanceTypes = () => {
  const fetchAllAllowanceTypes = async (): Promise<DropdownOption[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.allowance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Allowance types");
        return [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formatted: DropdownOption[] = res.data.map((type: any) => ({
        id: type.id,
        label: type.name,
      }));

      return formatted;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong while fetching Allowance types");
      }
      throw new Error("Allowance types fetch failed");
    }
  };

  return useQuery({
    queryKey: ["AllowanceTypes"],
    queryFn: fetchAllAllowanceTypes,
    staleTime: 60 * 1000,
    retry: 1,
  });
};

/**
 * -------------------------------------------
 * Attendance Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all Attendances
 *  - Create a new Attendance
 *  - Edit an existing Attendance
 *  - Delete an Attendance
 *
 * Handles authentication, API errors, and notifications
 */

/**
 * 🔍 Fetch all Allowances  
 */
export const useFetchAllowances = () => {
  const fetchAllAllowances = async (): Promise<AllowanceDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.allowance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Allowances");
      }

      toast.success(res.data);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Allowances",
        );
      } else {
        toast.error("Something went wrong while fetching Allowances");
      }
      throw new Error("Allowance fetch failed");
    }
  };

  return useQuery({
    queryKey: ["Allowances"],
    queryFn: fetchAllAllowances,
    staleTime: 0,
    retry: 1,
  });
};

/**
 * ➕ Create a new Allowance
 */
export const useCreateAllowance = () => {
  const queryClient = useQueryClient();

  const createAllowance = async (newAllowance: AllowanceDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(
        apiRoutes.allowance,
        newAllowance,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Allowance");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create Allowance",
        );
      } else {
        toast.error("Something went wrong while creating Allowance");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createAllowance,
    onSuccess: () => {
      toast.success("Allowance created successfully");
      queryClient.invalidateQueries({ queryKey: ["Allowances"] });
    },
  });
};

/**
 * ✏️ Edit an existing Allowance
 */
export const useEditAllowance = () => {
  const queryClient = useQueryClient();

  const editAllowance = async (updatedAllowance: AllowanceDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: allowanceId, ...payload } = updatedAllowance;

    const res = await axiosInstance.put(
      `${apiRoutes.allowance}/${allowanceId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Allowance");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editAllowance,
    onSuccess: () => {
      toast.success("Allowance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Allowances"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete an Allowance
 */
export const useDeleteAllowance = () => {
  const queryClient = useQueryClient();

  const deleteAllowance = async (allowance: AllowanceDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.allowance}/${allowance.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Allowance");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteAllowance,
    onSuccess: () => {
      toast.success("Allowance deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Allowances"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
