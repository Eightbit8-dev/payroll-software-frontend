import axiosInstance from "../utils/axios";
import axios from "axios";
import type { DepartmentDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";

/**
 * -------------------------------------------
 * Department Service Hooks - CRUD Operations
 * -------------------------------------------
 */

/**
 * 🔍 Fetch all departments
 */
export const useFetchDepartments = () => {
  const fetchAllDepartments = async (): Promise<DepartmentDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.departments, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch departments");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch departments",
        );
      } else {
        toast.error("Something went wrong while fetching departments");
      }
      throw new Error("Department fetch failed");
    }
  };

  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchAllDepartments,
    staleTime: 1000 * 60 * 0,
    retry: 1,
  });
};

/**
 * ➕ Create a new department
 */
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  const createDepartment = async (newDept: DepartmentDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(
        apiRoutes.departments,
        {
          name: newDept.name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (![200, 201].includes(res.status)) {
        throw new Error(res.data?.message || "Failed to create department");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create department",
        );
      } else {
        toast.error("Something went wrong while creating department");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      toast.success("Department created successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

/**
 * ✏️ Edit an existing department
 */
export const useEditDepartment = () => {
  const queryClient = useQueryClient();

  const editDepartment = async (updatedDept: DepartmentDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id, name } = updatedDept;

    const res = await axiosInstance.put(
      `${apiRoutes.departments}/${id}`,
      {
        name,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update department");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editDepartment,
    onSuccess: () => {
      toast.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

/**
 * ❌ Delete a department
 */
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  const deleteDepartment = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(`${apiRoutes.departments}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete department");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      toast.success("Department deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
