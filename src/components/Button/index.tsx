import { dropShadow } from "@src/utils/styles";
import clsx from "clsx";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  children,
  loading,
  disabled = false,
  className,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={dropShadow}
      className={clsx(
        "bg-white rounded-full justify-center p-2.5 items-center",
        isDisabled
          ? "bg-gray-300 border-gray-200 text-gray-400 opacity-40"
          : "",
        className
      )}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};
