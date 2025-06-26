"use client";
import { useForm } from "react-hook-form";
import Stepper from "@/components/Stepper";

export default function Step1() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="max-w-xl">
      <Stepper step={0} />
      <h1 className="mb-4 text-2xl font-bold">Course Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="h-28 w-full rounded border px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save & Next
        </button>
      </form>
    </div>
  );
}
