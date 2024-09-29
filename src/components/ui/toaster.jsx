
import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider duration={1000}>
      {toasts.map(function ({ id, title, description, action,color,iconColor, ...props }) {
        return (
          (<Toast key={id} {...props} className={`${color} font-semibold text-white`}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={`${iconColor}`} />
          </Toast>)
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
