import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export function AnimatedButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary:
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline:
      "border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={`rounded-md px-6 py-2.5 font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
