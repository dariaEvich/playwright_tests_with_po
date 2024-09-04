export function sortFomLowToHigh(prices) {
    return prices.sort((a, b) => parseFloat(a.slice(1)) - parseFloat(b.slice(1)));
}
