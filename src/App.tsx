// Updated App.tsx
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './App.css'; // Import your Tailwind CSS here

interface Chip {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [items, setItems] = useState<string[]>(['John Doe', 'Jane Smith', 'Bob Johnson', 'Nick Giannopoulos']);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item: string) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), name: item }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && highlightedChip === null) {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        // Toggle highlighting on and off
        setHighlightedChip((prevChip) => (prevChip === lastChip.id ? null : lastChip.id));
      }
    } else if (event.key === 'Backspace' && highlightedChip !== null) {
      // Remove the highlighted chip when Backspace is pressed again
      setChips((prevChips) => prevChips.filter((chip) => chip.id !== highlightedChip));
      setHighlightedChip(null);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="container mx-auto pt-12 flex justify-center relative">
        <div className="flex flex-wrap space-x-1">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className={`rounded p-2 flex items-center ${chip.id === highlightedChip ? 'bg-yellow-200' : 'bg-blue-500 text-white'}`}
            >
              {chip.name}
              <button
                onClick={() => {
                  setChips((prevChips) => prevChips.filter((c) => c.id !== chip.id));
                  setHighlightedChip(null);
                }}
                className="ml-2 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <ul className="mt-2 absolute top-24 list-none bg-white border border-gray-300 rounded w-800px">
          {items
            .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
            .filter((item) => !chips.some((chip) => chip.name === item))
            .map((item) => (
              <li key={item} onClick={() => handleItemClick(item)} className="cursor-pointer p-2 hover:bg-gray-200">
                {item}
              </li>
            ))}
        </ul>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="border p-3 rounded w-800px" // Set the width to 800px
        />
      </div>
    </div>
  );
};

export default App;
