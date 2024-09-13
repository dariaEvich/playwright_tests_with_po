export function sortFomLowToHigh(prices) {
    return prices.sort((a, b) => (a - b));
}

export function getRandomArrayElementIndex(arrayLength, elementsCount) {
    const elementIndexes = [];
    while (elementIndexes.length < elementsCount) {
        const elementIndex = Math.floor(Math.random() * (arrayLength - 1));
        if (elementIndexes.indexOf(elementIndex) === -1) elementIndexes.push(elementIndex);
    }
    return elementIndexes;
}
