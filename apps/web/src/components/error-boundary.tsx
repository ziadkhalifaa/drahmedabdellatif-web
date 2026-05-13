'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2">Something went wrong</h2>
              <p className="text-[var(--muted)] text-sm">
                An unexpected error occurred. Please try refreshing the page.
              </p>
            </div>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="gap-2 rounded-xl font-bold"
            >
              <RefreshCw size={16} /> Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
