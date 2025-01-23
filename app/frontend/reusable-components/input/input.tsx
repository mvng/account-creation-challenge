import React, { ChangeEvent, ReactNode, useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  children?: ReactNode;
}

export function Input({ onChange, label, className, children, ...props }: Props) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /g, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event);
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-slate-500">
        {label}
      </label>
      <input
        id={id}
        className={`border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 block w-full mb-6 ${
          className || ''
        }`}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {children}
    </div>
  );
}