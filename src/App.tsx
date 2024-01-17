
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './App.css'; // Import your Tailwind CSS here

// Import your images from assets
import johnDoeImage from './assets/john_doe.png';
import janeSmithImage from './assets/jane_smith.png';
import bobJohnsonImage from './assets/bob_johnson.jpg';
import nickGiannopoulosImage from './assets/nick_giannopoulos.png';

interface Chip {
  id: number;
  type: 'name' | 'email'; // Add type information to distinguish between name and email chips
  value: string;
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

  const handleItemClick = (item: string, type: 'name' | 'email') => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), type, value: item }]);
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
              className={`cursor-pointer rounded-full p-1 mr-1 flex items-center ${chip.id === highlightedChip ? 'bg-yellow-200' : 'bg-blue-500 text-white'}`}
            >
              {chip.type === 'name' && (
                <img
                  src={chip.value === 'John Doe' ? johnDoeImage : ( chip.value === 'Jane Smith' ? janeSmithImage : ( chip.value === 'Bob Johnson' ? bobJohnsonImage : nickGiannopoulosImage) ) }
                  alt={chip.value}
                  className="w-8 h-7 rounded-full mr-2 ml-2"
                />
              )}
                {chip.value}
                
                <span className="text-gray-600 ml-3">{chip.value.toLowerCase().replace(/\s/g, '_')}@email.com</span>
              
              <button
                onClick={() => {
                  setChips((prevChips) => prevChips.filter((c) => c.id !== chip.id));
                  setHighlightedChip(null);
                }}
                className="ml-2 mr-2 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="border p-3 ml-2 rounded" // Set the width to 800px
        />
      </div>
      <div className="container mx-auto pt-4 flex justify-center relative">
        <ul className="mt-4 list-none bg-white border border-gray-300 rounded w-800px">
          {items
            .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
            .filter((item) => !chips.some((chip) => chip.value === item))
            .map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item, 'name')} // 'name' type for names
                className="cursor-pointer p-3 hover:bg-gray-200 flex items-center"
              >
                <img
                  src={item === 'John Doe' ? johnDoeImage : ( item === 'Jane Smith' ? janeSmithImage : (item === 'Bob Johnson' ? bobJohnsonImage : nickGiannopoulosImage ) ) }
                  alt={item}
                  className="w-9 h-8 rounded-full mr-4"
                />
                {item}
                <span className="text-gray-500 ml-8">{item.toLowerCase().replace(/\s/g, '_')}@email.com</span>
              </li>
            ))}
        </ul>
        </div>
    </div>
  );
};

export default App;
