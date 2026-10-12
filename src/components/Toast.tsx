
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

const toastConfig = {
  success: { icon: CheckCircle, bg: 'bg-green-50 border-green-200', icon_color: 'text-green-600', title_color: 'text-green-800' },
  error: { icon: XCircle, bg: 'bg-red-50 border-red-200', icon_color: 'text-red-600', title_color: 'text-red-800' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 border-amber-200', icon_color: 'text-amber-600', title_color: 'text-amber-800' },
  info: { icon: Info, bg: 'bg-blue-50 border-blue-200', icon_color: 'text-blue-600', title_color: 'text-blue-800' },
};

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => {
        const cfg = toastConfig[toast.type];
        const Icon = cfg.icon;
        return (
          <div key={toast.id} className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${cfg.bg} toast-enter`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cfg.icon_color}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${cfg.title_color}`}>{toast.title}</p>
              {toast.message && <p className="text-xs text-gray-600 mt-0.5">{toast.message}</p>}
            </div>
            <button onClick={() => onRemove(toast.id)} className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
