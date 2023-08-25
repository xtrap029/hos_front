import { memo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium focus:outline-none whitespace-nowrap transform active:scale-90 transition-transform",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-700 bg-gray-600 text-gray-100",
        sub: "hover:bg-gray-300 bg-gray-200  text-gray-600",
        success: "hover:bg-lime-600 bg-lime-500 text-gray-100",
      },
      size: {
        default: "py-3 px-4",
        sm: "py-1 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({ className, variant, size, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default memo(Button);
