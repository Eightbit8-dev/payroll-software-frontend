import axiosInstance from "../utils/axios";
import axios from "axios";
import type { ShiftDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * -------------------------------------------
 * Shift Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all Shifts
 *  - Create a new Shift
 *  - Edit an existing Shift
 *  - Delete a Shift
 *
 * Handles authentication, API errors, and notifications
 */

const API_ROUTE = "/api/admin/shift";

/**
 * 🔍 Fetch all Shifts
 */
export const useFetchShifts = () => {
  const fetchAllShifts = async (): Promise<ShiftDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(API_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Shifts");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch Shifts");
      } else {
        toast.error("Something went wrong while fetching Shifts");
      }
      throw new Error("Shift fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Shifts"], //cache key
    queryFn: fetchAllShifts,
    staleTime: 1000 * 60 * 0, //expiry time
    retry: 1,
  });
};

/**
 * ➕ Create a new Shift
 */
export const useCreateShift = () => {
  const queryClient = useQueryClient();

  const createShift = async (newShift: ShiftDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(API_ROUTE, newShift, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Shift");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create Shift");
      } else {
        toast.error("Something went wrong while creating Shift");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createShift,
    onSuccess: () => {
      toast.success("Shift created successfully");
      queryClient.invalidateQueries({ queryKey: ["Shifts"] });
    },
  });
};

/**
 * ✏️ Edit an existing Shift
 */
export const useEditShift = () => {
  const queryClient = useQueryClient();

  const editShift = async (updatedShift: ShiftDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: ShiftId, ...payload } = updatedShift;

    const res = await axiosInstance.put(`${API_ROUTE}/${ShiftId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Shift");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editShift,
    onSuccess: () => {
      toast.success("Shift updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Shifts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a Shift
 */
export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  const deleteShift = async (Shift: ShiftDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(`${API_ROUTE}/${Shift.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Shift");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteShift,
    onSuccess: () => {
      toast.success("Shift deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Shifts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
