"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { routineCreateSchema, RoutineFormDataCreate } from "../../../../../backend/src/validations/routinesValidations";
import { Routine } from "./types";

interface RoutineFormProps {
  onAdd: (routine: Routine) => void;
  onEdit: (routine: Routine) => void;
  initialData?: Routine | null; //* if it's null => add method
}

export default function RoutineForm({ onAdd, onEdit, initialData }: RoutineFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoutineFormDataCreate>({
    resolver: zodResolver(routineCreateSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          level: initialData.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
        }
      : {
          title: "",
          description: "",
          level: "BEGINNER" as "BEGINNER",
        },
  });

  const onSubmit = async (data: RoutineFormDataCreate) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (initialData) {
      //* Edit Mode
      const res = await fetch(`http://localhost:4000/routines/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      onEdit(response.routine);
    } else {
      //* Add Mode
      const res = await fetch("http://localhost:4000/routines", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      onAdd(response.routine);
      reset(); //* Reset the form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-3">
      <div>
        <input
          type="text"
          placeholder="Routine title"
          {...register("title")}
          className="border px-3 py-2 rounded w-full text-black"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          {...register("description")}
          className="border px-3 py-2 rounded w-full text-black"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <select {...register("level")} className="border px-3 py-2 rounded w-full text-black">
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        {initialData ? "Update Routine" : "Add Routine"}
      </button>
    </form>
  );
}
