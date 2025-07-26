import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center font-semibold rounded-lg transition-colors",
  variants: {
    color: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-700 text-white hover:bg-gray-800",
    },
    size: {
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button: React.FC<ButtonProps> = ({
  className,
  color,
  size,
  ...props
}) => <button className={button({ color, size, className })} {...props} />;
