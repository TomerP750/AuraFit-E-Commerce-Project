// UserCrud.tsx
import "./UserCrud.css";
import { JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {UserDTO} from "../../../../Models/DTOS/UserDTO.ts";
// import { CreateUserForm } from "../../CreateForms/CreateUserForm/CreateUserForm.tsx";

export function UserCrud(): JSX.Element {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allUsers()
            .then(setUsers)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteUser = (id: number) => {
        // if (confirm("Delete user?")) {
        //     adminService
        //         .deleteUser(id)
        //         .then(() => setUsers(prev => prev.filter(u => u.id !== id)))
        //         .catch(err => toast.error(err.response?.data || err.message));
        // }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                {/*<CreateUserForm*/}
                {/*    onSave={() => setFormOpen(false)}*/}
                {/*    setFormOpen={() => setFormOpen(false)}*/}
                {/*/>*/}
            </div>
        );
    }

    const fields = ["Id", "First Name", "Last Name", "Email", "Role", "Actions"];

    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Users</h1>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-6 place-items-center bg-gray-100 py-2">
                    {fields.map((f, i) => (
                        <span key={i} className="text-sm font-medium text-gray-700">
              {f}
            </span>
                    ))}
                </div>
                {users.map(u => (
                    <div key={u.id} className="grid grid-cols-6 place-items-center py-2 border-b">
                        <span>{u.id}</span>
                        <span>{u.firstName}</span>
                        <span>{u.lastName}</span>
                        <span>{u.email}</span>
                        <span>{u.role}</span>
                        <div className="flex gap-2">
                            <p
                                className="cursor-pointer"
                                onClick={() => navigate(`/user/edit/${u.id}`)}
                            >Edit</p>
                            <p
                                className="cursor-pointer"
                                onClick={() => deleteUser(u.id)}
                            >Delete</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {users.map(u => (
                    <div key={u.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {u.id}</p>
                        <p><strong>First Name:</strong> {u.firstName}</p>
                        <p><strong>Last Name:</strong> {u.lastName}</p>
                        <p><strong>Email:</strong> {u.email}</p>
                        <p><strong>Role:</strong> {u.role}</p>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => navigate(`/user/edit/${u.id}`)}
                                className="text-sm underline"
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteUser(u.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
