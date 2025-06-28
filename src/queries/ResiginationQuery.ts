import axiosInstance from "../utils/axios";
import axios from "axios";
import type { ResignationDetails } from "../types/apiTypes";
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
export const useFetchResignations = () => {
  const fetchAllResignation = async (): Promise<ResignationDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.resigination, {
        //All api routes are inside this file
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Resignations");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Resignations",
        );
      } else {
        toast.error("Something went wrong while fetching Resignations");
      }
      throw new Error("Resignation fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Resignations"], //cache key
    queryFn: fetchAllResignation,
    staleTime: 1000 * 60 * 0, //expoiy time
    retry: 1,
  });
};

/**
 * ➕ Create a new Designation
 */
export const useCreateResignation = () => {
  const queryClient = useQueryClient();

  const createResignation = async (newResignation: ResignationDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(apiRoutes.resigination, newResignation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Resignation");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create Resignation");
      } else {
        toast.error("Something went wrong while creating Resignation");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createResignation,
    onSuccess: () => {
      toast.success("Resignation created successfully");
      queryClient.invalidateQueries({ queryKey: ["Resignations"] });
    },
  });
};

/**
 * ✏️ Edit an existing Designation
 */
export const useEditResignation = () => {
  const queryClient = useQueryClient();

  const editResignation = async (updatedResignation: ResignationDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: ResignationId, ...payload } = updatedResignation;

    const res = await axiosInstance.put(
      `${apiRoutes.resigination}/${ResignationId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Resignation");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editResignation,
    onSuccess: () => {
      toast.success("Resignation updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Resignations"] });
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
export const useDeleteResignation = () => {
  const queryClient = useQueryClient();

  const deleteResignation = async (Resignation: ResignationDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.resigination}/${Resignation.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Resignation");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteResignation,
    onSuccess: () => {
      toast.success("Resignation deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Resignations"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
