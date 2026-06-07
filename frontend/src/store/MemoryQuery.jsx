import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom';


export function useMemories() {
    const token = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["memories"],
        queryFn: async () => {
            const response = await fetch("/api/memories", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Erreur chargement souvenirs");
            }
            return response.json();
        }
    });
}

export function useMemory(id) {
    const token = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["memory", id],
        queryFn: async () => {
            const response = await fetch(`/api/memories/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Erreur chargement souvenirs");
            }
            return response.json();
        }
    });
}

export function useCreateMemory() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch("/api/memories", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur API");
            }
            return data;

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["memories"],
            });
        },
        onError: (err) => {
            console.log("FULL ERROR:", err.response?.data);
            console.log("MUTATION ERROR:", err);
        }
    })
}

export function useUpdateMemory() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const response = await fetch(`/api/memories/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur changement souvenirs");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["memories"],
            });
        },
        onError: (err) => {
            console.log("MUTATION ERROR:", err);
        }
    })
}

export function useDeleteMemory() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`/api/memories/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error("Erreur chargement souvenirs");
            }
            //navigate("/memories")
            return response.json()

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["memories"],
            });
        },
        onError: (err) => {
            console.log("MUTATION ERROR:", err);
        }
    });
}


