import axiosInstance from "../utils/axios";
import axios from "axios";
import type { BranchDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";

/**
 * -------------------------------------------
 * Branch Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all branches
 *  - Create a new branch
 *  - Edit an existing branch
 *  - Delete a branch
 *
 * Handles authentication, API errors, and notifications
 */

/**
 * 🔍 Fetch all branches
 */
export const useFetchBranches = () => {
  const fetchAllBranches = async (): Promise<BranchDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.branches, {
        //All api routes are inside this file
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch branches");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch branches",
        );
      } else {
        toast.error("Something went wrong while fetching branches");
      }
      throw new Error("Branch fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["branches"], //cache key
    queryFn: fetchAllBranches,
    staleTime: 1000 * 60 * 0, //expoiy time
    retry: 1,
  });
};

/**
 * ➕ Create a new branch
 */
export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  const createBranch = async (newBranch: BranchDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(apiRoutes.branches, newBranch, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create branch");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create branch");
      } else {
        toast.error("Something went wrong while creating branch");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      toast.success("Branch created successfully");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};

/**
 * ✏️ Edit an existing branch
 */
export const useEditBranch = () => {
  const queryClient = useQueryClient();

  const editBranch = async (updatedBranch: BranchDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: branchId, ...payload } = updatedBranch;

    const res = await axiosInstance.put(
      `${apiRoutes.branches}/${branchId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update branch");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editBranch,
    onSuccess: () => {
      toast.success("Branch updated successfully");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a branch
 */
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  const deleteBranch = async (branch: BranchDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.branches}/${branch.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete branch");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      toast.success("Branch deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
