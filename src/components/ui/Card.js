import { memo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva(
  "p-5 my-3 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = ({ className, variant, ...props }) => {
  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
};

export default memo(Card);
