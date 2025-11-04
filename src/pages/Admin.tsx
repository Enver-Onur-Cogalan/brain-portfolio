import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/useAuth"
import AdminLayout from "../components/admin/AdminLayout"

const Admin = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return <AdminLayout />
};

export default Admin;
