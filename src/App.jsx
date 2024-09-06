import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';

import Title from './Title';
import Nav from './Nav';
import Footer from './Footer';
import BubbleSort from './BubbleSort'
import NoneSelected from './NoneSelected';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import MergeSort from './MergeSort'
function App() {

  return (
    <>
      <DataProvider>
        <Title />
        <Nav />
        <Routes>
          <Route exact path='/BubbleSort' element={<BubbleSort />} />
          <Route exact path='/SelectionSort' element={<SelectionSort />} />
          <Route exact path='/InsertionSort' element={<InsertionSort />} />
          <Route exact path='/MergeSort' element={<MergeSort />} />
          <Route path='*' element={<NoneSelected />} />
        </Routes>
        <Footer />
      </DataProvider>
    </>
  )
}

export default App
