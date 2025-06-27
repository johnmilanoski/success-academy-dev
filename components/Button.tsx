import { ButtonHTMLAttributes } from "react";

export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 ${className}`}
      {...props}
    />
  );
}
