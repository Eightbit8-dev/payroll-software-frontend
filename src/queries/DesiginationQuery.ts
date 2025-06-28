import axiosInstance from "../utils/axios";
import axios from "axios";
import type { DesignationsDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";

/**
 * -------------------------------------------
 * Designation Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all Designationes
 *  - Create a new Designation
 *  - Edit an existing Designation
 *  - Delete a Designation
 *
 * Handles authentication, API errors, and notifications
 */

/**
 * 🔍 Fetch all Designationes
 */
export const useFetchDesignations = () => {
  const fetchAllDesigination = async (): Promise<DesignationsDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.designations, {
        //All api routes are inside this file
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Designations");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Designations",
        );
      } else {
        toast.error("Something went wrong while fetching Designations");
      }
      throw new Error("Desigination fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Designations"], //cache key
    queryFn: fetchAllDesigination,
    staleTime: 1000 * 60 * 0, //expoiy time
    retry: 1,
  });
};

/**
 * ➕ Create a new Designation
 */
export const useCreateDesignation = () => {
  const queryClient = useQueryClient();

  const createDesignation = async (newDesignation: DesignationsDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(apiRoutes.designations, newDesignation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Designation");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create Designation");
      } else {
        toast.error("Something went wrong while creating Designation");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createDesignation,
    onSuccess: () => {
      toast.success("Designation created successfully");
      queryClient.invalidateQueries({ queryKey: ["Designations"] });
    },
  });
};

/**
 * ✏️ Edit an existing Designation
 */
export const useEditDesignation = () => {
  const queryClient = useQueryClient();

  const editDesignation = async (updatedDesignation: DesignationsDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: DesignationId, ...payload } = updatedDesignation;

    const res = await axiosInstance.put(
      `${apiRoutes.designations}/${DesignationId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Designation");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editDesignation,
    onSuccess: () => {
      toast.success("Designation updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Designations"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a Designation
 */
export const useDeleteDesignation = () => {
  const queryClient = useQueryClient();

  const deleteDesignation = async (Designation: DesignationsDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.designations}/${Designation.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Designation");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteDesignation,
    onSuccess: () => {
      toast.success("Designation deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Designations"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
