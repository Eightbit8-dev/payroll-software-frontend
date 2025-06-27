import axiosInstance from "../utils/axios";
import axios from "axios";
import type { BranchDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";

export const useFetchBranches = () => {
  const fetchAllBranches = async (): Promise<BranchDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perfrom this action.");

      const res = await axiosInstance.get(apiRoutes.branches, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch branches");
      }

      const branches: BranchDetails[] = res.data;
      return branches;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch branches",
        );
      } else {
        toast.error("Something went wrong while fetching branches");
      }
      throw new Error("Branch fetch failed");
    }
  };

  return useQuery({
    queryKey: ["branches"],
    queryFn: fetchAllBranches,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  const createBranch = async (newBranch: BranchDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perfrom this action.");

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

export const useEditBranch = () => {
  const queryClient = useQueryClient();

  const editBranch = async (updatedBranch: BranchDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perfrom this action.");

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
      toast.success("Branch updated successfully ");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  const deleteBranch = async (branch: BranchDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perfrom this action.");

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
      toast.success("Branch deleted successfully ");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
