"use client";

import { useState, useRef, useEffect } from "react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export default function SearchableSelect({
  id,
  name,
  value,
  options,
  onChange,
  placeholder = "-- Pilih --",
  error = false,
  className = "",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`w-full px-4 py-3 rounded-xl border ${
          error
            ? "border-rose-500 focus-within:ring-rose-500"
            : "border-zinc-300 dark:border-zinc-700 focus-within:ring-indigo-600"
        } bg-zinc-50 dark:bg-zinc-800/50 text-sm focus-within:outline-none focus-within:ring-2 transition-all cursor-pointer ${className}`}
        onClick={handleInputClick}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <IconSearch size={16} className="text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={isOpen ? searchTerm : selectedOption?.label || ""}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <IconChevronDown
            size={16}
            className={`text-zinc-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">
              Tidak ada hasil
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                  option.value === value
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                }`}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
