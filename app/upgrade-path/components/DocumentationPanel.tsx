import React, { useState } from 'react';
import { UpgradePath } from '../types/upgrade';
import DocRenderer from './DocRender';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface DocumentationPanelProps {
  currentStep: UpgradePath;
  className?: string;
  docUrl: string;
  version: string;
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({ version, className, docUrl }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Card className={`${className}`}>
      <div className={`p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {version} - Full Documentation
          </h3>
          <Link
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signoz_robin-500 hover:text-signoz_robin-400 text-sm flex items-center gap-1"
          >
            Open in new tab
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        <Card className="relative h-full max-h-[80vh] min-h-[20vh] overflow-auto"> 
          <div className='p-2 max-h-[80vh] min-h-[20vh] h-full overflow-auto prose prose-slate max-w-none dark:prose-invert'>
          <DocRenderer docUrl={docUrl} setHasError={setHasError} />

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-signoz_slate-400">
              <div className="text-center">
                <div className="mb-3">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto" />
                </div>
                <span className="text-gray-300 mb-2">Unable to load documentation</span>
                <br />
                <Link
                  href={docUrl}
                  target="_blank"
                  className="text-signoz_robin-500 hover:text-signoz_robin-400 text-sm"
                >
                  View in new tab instead
                </Link>
              </div>
            </div>
          )}
          </div>      
        </Card>

        <div className="mt-4 text-xs text-gray-400">
          <span>
            Documentation URL: {' '}
            <Link
              href={docUrl}
              target="_blank"
              className="text-signoz_robin-500 hover:text-signoz_robin-400"
            >
              {docUrl}
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DocumentationPanel;
