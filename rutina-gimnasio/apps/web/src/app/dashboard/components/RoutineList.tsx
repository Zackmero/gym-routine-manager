'use client';
import { Routine } from "./types";

interface RoutineListProps {
    routines: Routine[];
    onEdit: (routine: Routine) => void;
    onDelete: (id: number) => void;
}

export default function RoutineList({ routines, onEdit, onDelete }: RoutineListProps) {



    if (routines.length === 0) {
        return <p className="text-black font-bold underline">You have no registered routines.</p>
    }



    return (
        <ul>
            {routines.map(routine => (
                <li key={routine.id} className="bg-white p-4 rounded shadow m-2">
                    <h3 className="text-lg font-bold text-black">{routine.title}</h3>
                    <p className="text-gray-600">{routine.description}</p>
                    <span className="text-sm text-gray-500">Level: {routine.level}</span>
                    <p className="text-sm text-gray-500">Created: {new Date(routine.createdAt).toLocaleDateString()}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { onEdit(routine); }}
                            className="bg-blu-500 text-white px-2 py-1 rounded hover: bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure you want to delete the routine?")) {
                                    onDelete(routine.id);
                                }
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded hover: bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
