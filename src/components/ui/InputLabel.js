import { memo } from "react";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputLabelVariants = cva(
  "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-8 z-10 origin-[0] right-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
  {
    variants: {
      variant: {
        default: "",
        error: "text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const InputLabel = forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(inputLabelVariants({ variant, className }))}
      {...props}
    />
  );
});

export default memo(InputLabel);
