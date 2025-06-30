import axiosInstance from "../utils/axios";
import axios from "axios";
import type { AttendanceDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";
import type { DropdownOption } from "../components/common/DropDown";

// addon for getting attednace types
export const useFetchAttendancesTypes = () => {
  const fetchAllAttendanceTypes = async (): Promise<DropdownOption[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.attendanceTypes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Attendances");
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
        toast.error("Something went wrong while fetching Attendance types");
      }
      throw new Error("Attendance types fetch failed");
    }
  };

  return useQuery({
    queryKey: ["AttendanceTypes"],
    queryFn: fetchAllAttendanceTypes,
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
 * 🔍 Fetch all Attendances
 */
export const useFetchAttendances = () => {
  const fetchAllAttendances = async (): Promise<AttendanceDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.attendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Attendances");
      }

      toast.success(res.data);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Attendances",
        );
      } else {
        toast.error("Something went wrong while fetching Attendances");
      }
      throw new Error("Attendance fetch failed");
    }
  };

  return useQuery({
    queryKey: ["Attendances"],
    queryFn: fetchAllAttendances,
    staleTime: 0,
    retry: 1,
  });
};

/**
 * ➕ Create a new Attendance
 */
export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  const createAttendance = async (newAttendance: AttendanceDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(
        apiRoutes.attendance,
        newAttendance,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Attendance");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create Attendance",
        );
      } else {
        toast.error("Something went wrong while creating Attendance");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createAttendance,
    onSuccess: () => {
      toast.success("Attendance created successfully");
      queryClient.invalidateQueries({ queryKey: ["Attendances"] });
    },
  });
};

/**
 * ✏️ Edit an existing Attendance
 */
export const useEditAttendance = () => {
  const queryClient = useQueryClient();

  const editAttendance = async (updatedAttendance: AttendanceDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: attendanceId, ...payload } = updatedAttendance;

    const res = await axiosInstance.put(
      `${apiRoutes.attendance}/${attendanceId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Attendance");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editAttendance,
    onSuccess: () => {
      toast.success("Attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Attendances"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete an Attendance
 */
export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  const deleteAttendance = async (attendance: AttendanceDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(
      `${apiRoutes.attendance}/${attendance.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Attendance");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteAttendance,
    onSuccess: () => {
      toast.success("Attendance deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Attendances"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
