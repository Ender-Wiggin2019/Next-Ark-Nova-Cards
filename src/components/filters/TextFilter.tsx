import React, { useState } from 'react';

interface TextFilterProps {
  onTextChange: (newText: string) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({ onTextChange }) => {
  const [text, setText] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <input
      type='text'
      value={text}
      onChange={handleChange}
      placeholder='Filter text...'
    />
  );
};
