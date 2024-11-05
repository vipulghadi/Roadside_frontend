import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isLoading, loadingText = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm font-medium text-gray-700">{loadingText}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
