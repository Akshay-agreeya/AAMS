// src/context/ProfileContext.js
import { createContext, useState } from 'react';

export const ProfileContext = createContext({
  imageSrc: null,
  setImageSrc: () => {},   // placeholder – real function comes from the provider
});

export const ProfileProvider = ({ children })=> {
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <ProfileContext.Provider value={{ imageSrc, setImageSrc }}>
      {children}
    </ProfileContext.Provider>
  );
}
