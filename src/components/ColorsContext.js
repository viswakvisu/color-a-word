import { createContext } from 'react';

const ColorsContext = createContext(null);

export const ColorsProvider = ColorsContext.Provider;
export default ColorsContext;