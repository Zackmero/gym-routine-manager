'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import RoutineForm from "./components/RoutineForm";
import RoutineList from "./components/RoutineList";
import { Routine } from "./components/types";

export default function Dashboard() {

    const router = useRouter();
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        //* Get token from localStorage
        const token = localStorage.getItem('token');

        //* Validate if token exists
        if (!token) {
            router.push('/login');
            return;
        }

        //* Obtain user data
        fetch(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => {
                localStorage.removeItem('token');
                router.push('/login');
            });

        //* Obtain routine data
        fetch(`${API_URL}/routines/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => setRoutines(data))
            .catch(err => console.error(err));

    }, [router]);

    //* Logout Method
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    //* Add new routine
    const handleAddRoutine = (newRoutine: Routine) => {
        setRoutines(prev => [...prev, newRoutine]);
        setShowModal(false);
    }

    //* Edit routine
    const handleEditRoutine = async (updateRoutine: Routine) => {
        setRoutines(prev => prev.map(r => r.id === updateRoutine.id ? updateRoutine : r));
        setShowModal(false);
        setSelectedRoutine(null);
    };

    //* Delete Routine
    const handleDeleteRoutine = async (id: number) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/routines/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            setRoutines(prev => prev.filter(r => r.id !== id));
        }
    }


    return (
        <div className="flex flex-col h-screen">
            <NavBar user={user} onLogout={handleLogout} />
            <div className="flex flex-1">
                <SideBar />
                <main className="flex-1 p-6 bg-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-black">My Routines</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white rounded px-4 py-2 mb-2 hover:bg-gray-700 "
                    >Add Routine</button>
                    <RoutineList
                        routines={routines}
                        onEdit={(routine) => {
                            setSelectedRoutine(routine);
                            setShowModal(true);
                        }}
                        onDelete={handleDeleteRoutine}
                    />
                </main>
            </div>


            {showModal && (
                <div className="fixed bg-gray-900 inset-0 flex justify-center iterm-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 h-100 m-auto shadow-lg">
                        <h3 className="text-lg text-black font-bold mt-4">{selectedRoutine ? 'Edit Routine' : 'New Routine'}</h3>
                        <RoutineForm
                            onAdd={handleAddRoutine}
                            onEdit={handleEditRoutine}
                            initialData={selectedRoutine}
                        />

                        <button
                            onClick={() => {
                                setShowModal(false);
                                setSelectedRoutine(null);
                            }}
                            className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-800"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}