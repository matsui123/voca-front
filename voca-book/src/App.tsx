import { VocaBook } from '../src/pages/vocaBook';
import { createContext, useState } from 'react';

export const AllData = createContext<any>(null);

function App(){
  const [data, setData] = useState<any[]>();
  const value = {data, setData};

  return(
    <AllData.Provider value={value}>
      <VocaBook></VocaBook>
    </AllData.Provider>
  );
}

export default App;
