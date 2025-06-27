"use client";
import { useForm } from "react-hook-form";
import Stepper from "@/components/Stepper";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";

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
          <Input {...register("title", { required: true })} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Description</label>
          <Textarea {...register("description", { required: true })} className="h-28" />
        </div>
        <Button type="submit">Save & Next</Button>
      </form>
    </div>
  );
}
