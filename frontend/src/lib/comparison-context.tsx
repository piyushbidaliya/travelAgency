'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination } from './types';

interface ComparisonContextType {
  comparedDestinations: Destination[];
  addToComparison: (dest: Destination) => boolean;
  removeFromComparison: (id: number) => void;
  clearComparison: () => void;
  isComparing: (id: number) => boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType>({
  comparedDestinations: [],
  addToComparison: () => false,
  removeFromComparison: () => {},
  clearComparison: () => {},
  isComparing: () => false,
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparedDestinations, setComparedDestinations] = useState<Destination[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToComparison = (dest: Destination): boolean => {
    if (comparedDestinations.some((d) => d.id === dest.id)) {
      removeFromComparison(dest.id);
      return false;
    }
    if (comparedDestinations.length >= 3) {
      alert('You can compare a maximum of 3 destinations at a time.');
      return false;
    }
    setComparedDestinations((prev) => [...prev, dest]);
    return true;
  };

  const removeFromComparison = (id: number) => {
    setComparedDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const clearComparison = () => {
    setComparedDestinations([]);
    setIsModalOpen(false);
  };

  const isComparing = (id: number) => {
    return comparedDestinations.some((d) => d.id === id);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparedDestinations,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparing,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
