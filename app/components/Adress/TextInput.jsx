"use client";

import clsx from 'clsx';
import { memo } from 'react';


export default function TextInput ({ string, placeholder, error, onUpdate }) {
  return (
    <>
      <input
        placeholder={placeholder}
        className={clsx(`
                w-full
                bg-white
                text-gray-800
                border
                text-sm
                border-slate-400
                rounded-md
                focus:ring-2
                transition
                p-3
                placeholder-gray-500
                focus:outline-none
            `, error && 'ring-2 ring-red-500')}
        value={string || ""}
        onChange={(event) => onUpdate(event.target.value)}
        type="text"
        autoComplete="off"
      />

      <div className="text-red-500 text-[14px] font-semibold">
        {error ? error : null}
      </div>
    </>
  );
}
