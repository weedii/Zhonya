import { twMerge } from "tailwind-merge";

interface SpinningLoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
  title?: string;
}

export default function Loader({
  size = "medium",
  className,
  title,
}: SpinningLoaderProps = {}) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <div className={twMerge("", className)}>
      <div className={twMerge("relative", sizeClasses[size])}>
        <div className="absolute inset-0 border-4 border-t-yellow-400 border-r-black border-b-white border-l-black rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-black border-r-white border-b-yellow-400 border-l-white rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-4 border-t-white border-r-yellow-400 border-b-black border-l-yellow-400 rounded-full animate-spin-slower"></div>
      </div>

      <p className="text-center">{title}</p>
    </div>
  );
}
