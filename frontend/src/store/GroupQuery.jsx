import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom';


export function useGroups() {
    const token = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["group"],
        queryFn: async () => {
            const response = await fetch("/api/group", {
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

export function useGroup(id) {
    const token = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["group", id],
        queryFn: async () => {
            const response = await fetch(`/api/group/${id}`, {
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

export function useCreateGroup() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch("/api/group", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur chargement souvenirs");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["group"],
            });
        },
        onError: (err) => {
            console.log("MUTATION ERROR:", err);
        }
    })
}

export function useUpdateGroup() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const response = await fetch(`/api/group/${id}`, {
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
                queryKey: ["group"],
            });
        },
        onError: (err) => {
            console.log("MUTATION ERROR:", err);
        }
    })
}

export function useDeleteGroup() {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`/api/group/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error("Erreur chargement groupe");
            }
            //navigate("/group")
            return response.json()

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["group"],
            });
        },
        onError: (err) => {
            console.log("MUTATION ERROR:", err);
        }
    });
}


