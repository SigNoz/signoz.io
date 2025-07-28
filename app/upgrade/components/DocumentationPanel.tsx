import React, { useState } from 'react';
import { UpgradePath } from '../types/upgrade';
import DocRenderer from './DocRender';

interface DocumentationPanelProps {
  currentStep: UpgradePath;
  className?: string;
  docUrl: string;
  version: string;
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({ version, className, docUrl }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`bg-signoz_ink-500 border border-primary-600 rounded-lg p-6 h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {version} - Full Documentation
        </h3>
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-signoz_robin-500 hover:text-signoz_robin-400 text-sm flex items-center gap-1"
        >
          Open in new tab
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="relative h-96 border border-primary-600 rounded-lg overflow-scroll prose prose-slate max-w-none py-6 dark:prose-invert p-2">       
        <DocRenderer docUrl={docUrl} setHasError={setHasError} />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-signoz_slate-400">
            <div className="text-center">
              <div className="mb-3">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-gray-300 mb-2">Unable to load documentation</span>
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-signoz_robin-500 hover:text-signoz_robin-400 text-sm"
              >
                View in new tab instead
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <span>
          Documentation URL: {' '}
          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signoz_robin-500 hover:text-signoz_robin-400"
          >
            {docUrl}
          </a>
        </span>
      </div>
    </div>
  );
};

export default DocumentationPanel;
