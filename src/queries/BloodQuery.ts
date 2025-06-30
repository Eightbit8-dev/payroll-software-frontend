import axiosInstance from "../utils/axios";
import axios from "axios";
import type { BloodDetails } from "../types/apiTypes";
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
 * 🔍 Fetch all Bloodes
 */
export const useFetchBloods = () => {
  const fetchAllBloods = async (): Promise<BloodDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.Bloods, {
        //All api routes are inside this file
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Bloods");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Bloods",
        );
      } else {
        toast.error("Something went wrong while fetching Bloods");
      }
      throw new Error("Desigination fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Bloods"], //cache key
    queryFn: fetchAllBloods,
    staleTime: 1000 * 60 * 0, //expoiy time
    retry: 1,
  });
};

/**
 * ➕ Create a new Blood
 */
export const useCreateBlood = () => {
  const queryClient = useQueryClient();

  const createBlood = async (newBlood: BloodDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(apiRoutes.Bloods, newBlood, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Blood");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create Blood");
      } else {
        toast.error("Something went wrong while creating Blood");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createBlood,
    onSuccess: () => {
      toast.success("Blood created successfully");
      queryClient.invalidateQueries({ queryKey: ["Bloods"] });
    },
  });
};

/**
 * ✏️ Edit an existing Blood
 */
export const useEditBlood = () => {
  const queryClient = useQueryClient();

  const editBlood = async (updatedBlood: BloodDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: BloodId, ...payload } = updatedBlood;

    const res = await axiosInstance.put(
      `${apiRoutes.Bloods}/${BloodId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Blood");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editBlood,
    onSuccess: () => {
      toast.success("Blood updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Bloods"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a Blood
 */
export const useDeleteBlood = () => {
  const queryClient = useQueryClient();

  const deleteBlood = async (Blood: BloodDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.Bloods}/${Blood.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Blood");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteBlood,
    onSuccess: () => {
      toast.success("Blood deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Bloods"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
