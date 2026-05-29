import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import { AuthProvider } from "../store/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()
console.log("ROOT:", document.getElementById("root"));

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
);

