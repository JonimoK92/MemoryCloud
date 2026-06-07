import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Memories from "../pages/Memories";
import CreateMemory from "../pages/CreateMemory";
import UpdateMemory from "../pages/UpdateMemory";
import Groups from "../pages/Groups";
import CreateGroup from "../pages/CreateGroup";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>

                <Route path="/create/memory" element={<CreateMemory />} />
                <Route path="/update/memory/:id" element={<UpdateMemory />} />
                <Route path="/memories" element={<Memories />} />

                <Route path="/create/group" element={<CreateGroup />} />
                <Route path="/group" element={<Groups />} />
            </Route>
        </Routes>
    );
}