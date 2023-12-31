import React from 'react';
import { formatBytes } from '@/app/helpers/cover-byte';

const Attachment: React.FC<{ file: File; onRemove: () => void }> = ({
  file,
  onRemove,
}) => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 rounded-md border border-gray-200 mt-6"
    >
      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
        <div className="flex w-0 flex-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="h-5 w-5 flex-shrink-0 text-gray-400"
          >
            <g fill="currentColor">
              <path d="M18.986 16.471a4.596 4.596 0 0 0 3.748-1.331l7.405-7.405a4.585 4.585 0 0 0 1.356-3.231a4.478 4.478 0 0 0-1.316-3.222a4.473 4.473 0 0 0-3.188-1.317h-.033a4.587 4.587 0 0 0-3.23 1.356l-7.405 7.405a4.601 4.601 0 0 0-1.269 4.157a.536.536 0 0 0 1.049-.209a3.53 3.53 0 0 1 .976-3.192l7.405-7.405a3.521 3.521 0 0 1 2.482-1.043c.975 0 1.805.35 2.458 1.003s1.01 1.527 1.004 2.458a3.525 3.525 0 0 1-1.044 2.482l-7.405 7.405a3.546 3.546 0 0 1-2.879 1.024a.538.538 0 0 0-.588.475a.534.534 0 0 0 .474.59zm-3.846 6.802a4.57 4.57 0 0 0 1.229-4.334a.53.53 0 0 0-.646-.394a.534.534 0 0 0-.394.645a3.51 3.51 0 0 1-.946 3.328l-7.405 7.405a3.521 3.521 0 0 1-2.482 1.043a3.373 3.373 0 0 1-2.458-1.003a3.413 3.413 0 0 1-1.003-2.458a3.528 3.528 0 0 1 1.043-2.483l7.405-7.405a3.516 3.516 0 0 1 2.906-1.021a.546.546 0 0 0 .592-.471a.536.536 0 0 0-.471-.592a4.592 4.592 0 0 0-3.783 1.327l-7.405 7.405a4.589 4.589 0 0 0-1.356 3.231a4.478 4.478 0 0 0 1.316 3.222c.85.85 1.98 1.317 3.188 1.317h.033a4.587 4.587 0 0 0 3.23-1.356l7.407-7.406z" />
              <path d="M22.734 8.872a.534.534 0 0 0-.756 0l-13.5 13.5a.534.534 0 1 0 .756.756l13.5-13.5a.534.534 0 0 0 0-.756z" />
            </g>
          </svg>
          <div className="ml-4 flex min-w-0 flex-1 gap-2">
            <span className="truncate font-medium">{file.name}</span>
            <span className="flex-shrink-0 text-gray-400">
              {formatBytes(file.size, 2)}
            </span>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            aria-label='remove-image'
            onClick={onRemove}
            className="bg-red rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Attachment;
