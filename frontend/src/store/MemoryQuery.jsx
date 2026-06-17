import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom';
import api from "../js/api";


export function useMemories() {
    return useQuery({
        queryKey: ["memories"],
        queryFn: async () => {
            const { data } = await api.get("/api/memories");
            return data;
        }
    });
}

export function useMemory(id) {
    return useQuery({
        queryKey: ["memory", id],
        queryFn: async () => {
            const { data } = await api.get(`/api/memories/${id}`);
            return data;
        }
    });
}

export function useCreateMemory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            await api.get("/sanctum/csrf-cookie");
            const { data } = await api.post("/api/memories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["memories"]);
        },
        onError: (err) => {
            console.log("CREATE MEMORY ERROR:", err.response?.data || err.message);
        }
    });
}

export function useUpdateMemory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, formData }) => {
            await api.put("/sanctum/csrf-cookie");
            const { data } = await api.post(`/api/memories/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["memories"]);
        },
        onError: (err) => {
            console.log("UPDATE MEMORY ERROR:", err.response?.data || err.message);
        }
    })
}

export function useDeleteMemory() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (id) => {
            await api.get("/sanctum/csrf-cookie");
            const { data } = await api.delete(`/api/memories/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["memories"]);
        },
        onError: (err) => {
            console.log("DELETE MEMORY ERROR:", err.response?.data || err.message);
        }
    });
}


