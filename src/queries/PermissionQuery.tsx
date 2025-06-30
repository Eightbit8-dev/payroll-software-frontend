import axiosInstance from "../utils/axios";
import axios from "axios";
import type { PermissionDetails } from "../types/apiTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRoutes } from "../routes/apiRoutes";
import type { DropdownOption } from "../components/common/DropDown";

export const useFetchPermissionTypes = () => {
  const fetchAllPermissionTypes = async (): Promise<DropdownOption[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(apiRoutes.permissionTypes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(
          res.data?.message || "Failed to fetch permsission types",
        );
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
        toast.error("Something went wrong while fetching permission types");
      }
      throw new Error("permission types fetch failed");
    }
  };

  return useQuery({
    queryKey: ["permissionTypes"],
    queryFn: fetchAllPermissionTypes,
    staleTime: 60 * 1000,
    retry: 1,
  });
};

/**
 * -------------------------------------------
 * Permission Service Hooks - CRUD Operations
 * -------------------------------------------
 * This file contains React Query hooks to:
 *  - Fetch all Permissions
 *  - Create a new Permission
 *  - Edit an existing Permission
 *  - Delete a Permission
 *
 * Handles authentication, API errors, and notifications
 */

const API_ROUTE = apiRoutes.permissions;

/**
 * 🔍 Fetch all Permissions
 */
export const useFetchPermissions = () => {
  const fetchAllPermissions = async (): Promise<PermissionDetails[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.get(API_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to fetch Permissions");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch Permissions",
        );
      } else {
        toast.error("Something went wrong while fetching Permissions");
      }
      throw new Error("Permission fetch failed"); //Force throw the error so the react query handles it
    }
  };

  return useQuery({
    queryKey: ["Permissions"], //cache key
    queryFn: fetchAllPermissions,
    staleTime: 1000 * 60 * 0, //expiry time
    retry: 1,
  });
};

/**
 * ➕ Create a new Permission
 */
export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  const createPermission = async (newPermission: PermissionDetails) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized to perform this action.");

      const res = await axiosInstance.post(API_ROUTE, newPermission, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data?.message || "Failed to create Permission");
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create Permission",
        );
      } else {
        toast.error("Something went wrong while creating Permission");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createPermission,
    onSuccess: () => {
      toast.success("Permission created successfully");
      queryClient.invalidateQueries({ queryKey: ["Permissions"] });
    },
  });
};

/**
 * ✏️ Edit an existing Permission
 */
export const useEditPermission = () => {
  const queryClient = useQueryClient();

  const editPermission = async (updatedPermission: PermissionDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const { id: PermissionId, ...payload } = updatedPermission;

    const res = await axiosInstance.put(
      `${API_ROUTE}/${PermissionId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to update Permission");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: editPermission,
    onSuccess: () => {
      toast.success("Permission updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Permissions"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    },
  });
};

/**
 * ❌ Delete a Permission
 */
export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  const deletePermission = async (Permission: PermissionDetails) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized to perform this action.");

    const res = await axiosInstance.delete(`${API_ROUTE}/${Permission.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Failed to delete Permission");
    }

    return res.data;
  };

  return useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      toast.success("Permission deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Permissions"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    },
  });
};
