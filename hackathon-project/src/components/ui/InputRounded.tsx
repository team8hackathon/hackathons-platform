import { cva, VariantProps } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";
import { forwardRef } from "react";

const inputRounded = cva(["bg-transparent", "rounded-lg", "shadow-md", "p-3", "w-full"], {
  variants: {
    intent: {
      // TODO
      // Check color variables
      primary: ["border-neutral-900", "focus:ring-primary-400", "focus:border-primary-400"],
      // TODO
      // Change red with error
      error: ["text-red-600", "border-red-600", "focus:ring-red-500", "focus:border-red-500", "placeholder:text-red-600"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputRounded> {
  id: string;
  children: React.ReactNode;
  type: "text" | "email" | "password" | "url" | "tel" | "number";
  errorMessage: string;
  placeholder: string;
  hideLabel?: boolean;
  leadingIcon: React.ReactNode;
  placeholderOffset: string;
}

const InputRounded = forwardRef<HTMLInputElement, Props>(({ id, children, intent, errorMessage, hideLabel, placeholder, leadingIcon, placeholderOffset, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {hideLabel && (
          <label className="block font-medium" htmlFor={id}>
            {children}
          </label>
        )}
      </div>

      <div className="relative">
        <input ref={ref} id={id} className={`${inputRounded({ intent })} ${placeholderOffset}`} placeholder={placeholder} {...props} />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">{leadingIcon}</div>

        {intent === "error" && <IconExclamationCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600" />}
      </div>

      <div>{intent === "error" && <span className="font-medium text-red-500">{errorMessage}</span>}</div>
    </div>
  );
});

InputRounded.displayName = "InputRounded";

export default InputRounded;
