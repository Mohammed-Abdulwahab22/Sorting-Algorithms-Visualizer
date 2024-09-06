import React, { useContext } from 'react'
import AnimationSpeedSlider from './AnimationSpeedSlider'
import ArraySizeSlider from './ArraySizeSlider'
import DataContext from './context/DataContext'

export default function Footer() {
  const { bars, sortingAlgorithm, isSorting, bubbleSort, selectionSort, insertionSort, mergeSort } = useContext(DataContext);


  const handleSort = () => {
    if (sortingAlgorithm === "/BubbleSort") {
      bubbleSort(bars);
    }
    if (sortingAlgorithm === "/SelectionSort") {
      selectionSort(bars)
    }
    if (sortingAlgorithm === "/InsertionSort") {
      insertionSort(bars)
    }
    if (sortingAlgorithm === "/MergeSort") {
      mergeSort(bars)
    }

  };


  return (
    <footer>
      <ArraySizeSlider />
      <button
        className={`Sort-button ${isSorting ? 'sorting' : ''}`}
        onClick={handleSort}
        disabled={isSorting}
      >
        {isSorting ? 'Sorting...' : 'Sort'}
      </button>
      <AnimationSpeedSlider />
    </footer>
  )
}
