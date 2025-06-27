import { TextareaHTMLAttributes } from "react";

export default function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded border border-border bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}
