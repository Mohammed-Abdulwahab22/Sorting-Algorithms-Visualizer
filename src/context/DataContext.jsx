import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
    const [arraySize, setArraySize] = useState(10);
    const [animationSpeed, setAnimationSpeed] = useState(20);
    const [sortingAlgorithm, setSortingAlgorithm] = useState('');
    const [isSorting, setIsSorting] = useState(false);
    const sortTimeouts = useRef([]);

    const location = useLocation();




    useEffect(() => {
        if (isSorting) {
            setIsSorting(false);
            sortTimeouts.current.forEach(timeout => clearTimeout(timeout));
            sortTimeouts.current = [];
        }

        setSortingAlgorithm(location.pathname);


    }, [location.pathname])

    const getRandomHeight = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const bars = Array.from({ length: arraySize }, () => getRandomHeight(20, 300));

    const handleArraySliderChange = (event) => {
        setArraySize(parseInt(event.target.value));
    }


    const handleAnimationSpeed = (event) => {
        setAnimationSpeed(parseInt(event.target.value));
    }
    function updateBars() {
        const barElements = document.querySelectorAll('.bar');

        for (let i = 0; i < bars.length; i++) {
            barElements[i].style.height = `${bars[i]}px`;
        }
    }

    const bubbleSort = (bars) => {
        if (isSorting) return;

        setIsSorting(true);
        const length = bars.length;
        let i = 0;
        let j = 0;
        const sortStep = () => {

            if (i < length) {
                if (j < length - i - 1) {
                    if (bars[j] > bars[j + 1]) {
                        let temp = bars[j];
                        bars[j] = bars[j + 1];
                        bars[j + 1] = temp;


                        updateBars();
                    }

                    j++;
                    const timeoutId = setTimeout(sortStep, animationSpeed);
                    sortTimeouts.current.push(timeoutId);
                } else {
                    j = 0;
                    i++;
                    const timeoutId = setTimeout(sortStep, animationSpeed);
                    sortTimeouts.current.push(timeoutId);
                }

            }
            else {
                setIsSorting(false);
            }
        };

        sortStep();
    };

    const selectionSort = (bars) => {
        if (isSorting) return;
        setIsSorting(true);

        let i = 0;
        const length = bars.length;

        const sortStep = () => {
            if (i < length - 1) {
                let minIndex = i;

                for (let j = i + 1; j < length; j++) {
                    if (bars[j] < bars[minIndex]) {
                        minIndex = j;
                    }
                }

                if (minIndex !== i) {
                    let temp = bars[i];
                    bars[i] = bars[minIndex];
                    bars[minIndex] = temp;
                    updateBars();
                }

                i++;
                const timeoutId = setTimeout(sortStep, animationSpeed);
                sortTimeouts.current.push(timeoutId);
            } else {
                setIsSorting(false);
            }
        };

        sortStep();
    };

    const insertionSort = (bars) => {
        if (isSorting) return;
        setIsSorting(true);

        let i = 1;
        const length = bars.length;

        const sortStep = () => {
            if (i < length) {
                let key = bars[i];
                let j = i - 1;

                while (j >= 0 && bars[j] > key) {
                    bars[j + 1] = bars[j];
                    j--;
                    updateBars();
                }
                bars[j + 1] = key;
                updateBars();

                i++;
                const timeoutId = setTimeout(sortStep, animationSpeed);
                sortTimeouts.current.push(timeoutId);
            } else {
                setIsSorting(false);
            }
        };

        sortStep();
    };

    // const merge =(left,right) => {
    //     const result =[];
    //     let leftIndex = 0;
    //     let rightIndex = 0;
    //     while(leftIndex < left.length && rightIndex < right.length){
    //         if(left[leftIndex] < right[rightIndex]){
    //             result.push(left[leftIndex]);
    //             leftIndex++
    //         }else{
    //             result.push(right[rightIndex])
    //             rightIndex++
    //         }

    //     }

    //     return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    // }

    // const mergeSort = (bars) =>{
    //     if(isSorting) return;
    //     setIsSorting(true);

    //     const length = bars.length;
    //     const middle = Math.floor(length/2)
    //     const left = bars.slice(0,middle)
    //     const right = bars.slice(middle)

    //     return merge(
    //         mergeSort(left),
    //         mergeSort(right),
    //         setIsSorting(false)
    //     )



    // };

    const merge = async (left, right) => {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        const updateAndWait = async () => {
            bars.splice(0, bars.length, ...result, ...left.slice(leftIndex), ...right.slice(rightIndex));
            updateBars();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
            await updateAndWait();
        }

        const merged = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        bars.splice(0, bars.length, ...merged);
        updateBars();

        return merged;
    }

    const mergeSort = async (bars) => {
        if (isSorting) return;

        setIsSorting(true);

        const sort = async (array) => {
            if (array.length <= 1) return array;

            const middle = Math.floor(array.length / 2);
            const left = array.slice(0, middle);
            const right = array.slice(middle);

            const sortedLeft = await sort(left);
            const sortedRight = await sort(right);

            return await merge(sortedLeft, sortedRight);
        }

        await sort(bars);

        setIsSorting(false);
    }



    return (
        <DataContext.Provider value={{
            arraySize, setArraySize, handleArraySliderChange, bars, isSorting,
            animationSpeed, setAnimationSpeed, handleAnimationSpeed,
            bubbleSort, sortingAlgorithm,
            selectionSort,
            insertionSort,
            mergeSort

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;