'use client';

import React from 'react';
import { useToastStore } from '@/lib/toast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all animate-in slide-in-from-right-full",
                        t.type === 'success' && "bg-green-50 text-green-900 border border-green-200",
                        t.type === 'error' && "bg-red-50 text-red-900 border border-red-200",
                        t.type === 'info' && "bg-blue-50 text-blue-900 border border-blue-200"
                    )}
                >
                    {t.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {t.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
                    {t.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}

                    <p className="text-sm font-medium">{t.message}</p>

                    <button
                        onClick={() => removeToast(t.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
