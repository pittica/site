import React from 'react';

export default function Textarea({ label, name, placeholder, value, onChange }) {
  return (
    <div className="field">
      <div className="control">
        <label className="label">
          {label}
          <textarea className="textarea" name={name} placeholder={placeholder} onChange={onChange}>
            {value}
          </textarea>
        </label>
      </div>
    </div>
  );
}
