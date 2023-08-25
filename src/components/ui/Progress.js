import { memo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva("w-full rounded-md", {
  variants: {
    variant: {
      default: "bg-gray-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const innerProgressVariants = cva(
  "text-sm font-medium text-center p-1 leading-none rounded-md h-full transition-all duration-500 ease-out",
  {
    variants: {
      innerVariant: {
        default: "bg-gray-500 text-gray-200",
        success: "bg-lime-500 text-lime-100",
        error: "bg-rose-600 text-rose-100",
      },
    },
    defaultVariants: {
      innerVariant: "default",
    },
  }
);

const Progress = ({ className, variant, innerVariant, ...props }) => {
  return (
    <div className={cn(progressVariants({ variant }))}>
      <div
        className={cn(innerProgressVariants({ innerVariant, className }))}
        {...props}
      />
    </div>
  );
};

export default memo(Progress);
