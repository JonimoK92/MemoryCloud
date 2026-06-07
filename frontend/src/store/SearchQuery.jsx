import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom';


export function useSearchUsers(search) {
    const token = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["users", search],
        enabled: !!search,
        queryFn: async () => {
            const response = await fetch(`/api/search/users?search=${search}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Aucun utilisateur ne correspond");
            }
            return response.json();
        }
    });
}