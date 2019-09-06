// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    // console.log(city);
    let GrenobleLat = 45.166667;
    let GrenobleLong = 5.716667;


    let lat2 = Number(city.latitude);
    let lon2 = Number(city.longitude);
    // console.log(nom, lat, long);


    let R = 6371e3; // metres
    let φ1 = GrenobleLat.toRadians();
    let φ2 = lat2.toRadians();
    let Δφ = (lat2 - GrenobleLat).toRadians();
    let Δλ = (lon2 - GrenobleLong).toRadians();

    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c;
    return d / 1000;

}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    let temp;
    temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {

    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    return (csvData[i].dist < csvData[j].dist);

}


function insertsort() {

    // console.log("avant", csvData[0], csvData[1]);
    // console.log(isLess(0,1));
    // console.log("apres",csvData[0], csvData[1]);
    // console.log(isLess(1,0));

    for (let i = 0; i < csvData.length; i++) {
        for (let j = i; j > 0 && isLess(j, j - 1); j--) {
            swap(j, j - 1);
        }

    }
    return csvData;
}

function selectionsort() {

    for (let i = 0; i < csvData.length; i++) {
        // let k = i;
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i))
                swap(i, j);

        }
    }
    return csvData;
}

function bubblesort() {
    for (let i = 0; i < csvData.length; i++) {
        for (let j = 0; j < csvData.length - (i + 1); j++) {
            if (isLess(j + 1, j)) {
                swap(j + 1, j);
            }
        }
    }
    return csvData;
}

function shellsort() {
    // debugger;
    //choose the better index for array > 1600 length
    let index = 1;
    const espacements = [701, 301, 132, 57, 23, 10, 4, 1];
    let gap = espacements[0];
    while (gap > csvData.length / 2) {
        gap = espacements[index];
        index++;
    }
    //check if data.length > 1600 for calculate optimum gap
    if (csvData.length > 1600) {
        while (gap < csvData.length) {
            gap = Math.round(gap * 2.3)
        }
    }
    while (gap > 0) {
        for (let i = gap; i < csvData.length; i++) {
            for (let j = i; j >= gap && isLess(j, j - gap); j = j - gap) {
                swap(j, j - gap);
            }
        }

        gap = Math.round(gap / 2.3);

    }
    return csvData;
}

// function mergesort(data = csvData) {
//
//     if (data.length > 1) {
//         const middleIndex = Math.floor(data.length / 2);
//         const leftArray = data.slice(0, middleIndex);
//         console.log("leftArray = " + leftArray);
//         mergesort(leftArray);
//         debugger;
//         const rightArray = data.slice(middleIndex, data.length);
//         console.log("rightArray = " + rightArray);
//         mergesort(rightArray);
//
//     }
// }

// function mergesort(low, high) {
//
//     if (low < high) {
//         console.log("low = " + low, "high = " + high);
//         // Get the index of the element witch is in the middle
//         let middle = low + (high - low) / 2;
//         // Sort the left side of the array
//         mergesort(low, middle);
//         //Sort the right side of the array
//         mergesort(middle + 1, high);
//         //Combine them both
//         // merge(low, middle, high);
//     }
// }
//     function merge(leftArray, rightArray) {
// //Copy both parts into the helper array
//         let helper = [];
//         for (let i = low; i <= high; i++) {
//             helper[i] = numbers[i];
//         }
//
//         let i = low;
//         let j = middle + 1;
//         let k = low;
//         //Copy the smallest values from either the left or the right side back to the original array
//         while (i <= middle && i <= high) {
//             if (helper[i] <= helper[j]) {
//                 number[k] = helper[i];
//                 i++;
//             } else {
//                 number[k] = helper[j];
//                 j++;
//             }
//             k++;
//         }
//         //Copy the rest of the left side of the array into the target array
//         while (i <= middle) {
//             number[k] = helper[i]
//             k++;
//             i++;
//         }
//         return csvData;
//     }

function heapsort() {
    console.log("heapsort - implement me !");
}

function partition(left, right) {
    let pivot = right;
    let i = left - 1;
    let j = left;
    while (j < pivot) {
        if (isLess(pivot, j)) {
            j++;
        } else {
            i++;
            swap(i, j);
            j++;
        }
    }
    swap(i+1, pivot);
    return i + 1;
}

function quick(left, right) {
    if (left < right) {
        let pivot = partition(left, right);
        quick(left, pivot - 1);
        quick(pivot + 1, right);
    }
}

function quicksort() {
    quick(0, csvData.length - 1);
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
