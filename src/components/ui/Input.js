import { memo } from "react";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "rounded-lg block w-full p-3 focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-slate-100",
      },
      status: {
        default: "",
        error: "border-red-600 border-2"
      },
    },
    defaultVariants: {
      variant: "default",
      status: "default",
    },
  }
);

const Input = forwardRef(({ className, variant, status, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, status, className }))}
      {...props}
    />
  );
});

export default memo(Input);
