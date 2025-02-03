import React, { createContext, ReactNode, useState } from 'react';

function generateRandomId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export interface Person {
  id: string;
  name: string;
  likedPersons: Person[];
}

interface PersonContextType {
  persons: Person[];
  addPerson: (text: string, parentId?: string) => void;
  deletePerson: (id: string, parentId?: string) => void;
  addLikedPersons: (id: string, likedPersons: Person[]) => void;
  clearPersons: () => void;
}

export const PersonContext = createContext<PersonContextType | undefined>(undefined);

export const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  const addPerson = (name: string) => {
    const newPerson: Person = { id: generateRandomId(10), name, likedPersons: [] };
    setPersons([...persons, newPerson]);
  };

  const addLikedPersons = (id: string, likedPersons: Person[]) => {
    setPersons(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, likedPersons: likedPersons } : item
      ))
  }

  const deletePerson = (id: string, parentId?: string) => {
    if (parentId) {
      setPersons(prevPersons =>
        prevPersons.map(person =>
          person.id === parentId ? { ...person, subPersons: person.likedPersons.filter(likedPerson => likedPerson.id !== id) } : person
        )
      );
    } else {
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
    }
  };

  const clearPersons = () => {
    setPersons([]);
  }

  return (
    <PersonContext.Provider value={{ persons, addPerson, deletePerson, addLikedPersons, clearPersons }}>
      {children}
    </PersonContext.Provider>
  );
};