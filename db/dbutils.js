const resNumber = (qty, typeNumber) => {
    let maxNum;
    if (typeNumber === 'quantity') {
        maxNum = 1000000;
    } else if (typeNumber === 'filling') {
        maxNum = 100;
    }
    if (qty === true || qty === false || qty === '' ||
        (typeNumber !== 'quantity' && typeNumber !== 'filling')) {
        return 0
    }

    const round = Math.round(Number(qty));
    if (round < 0) {
        return 0
    } else if (round > maxNum) {
        return maxNum
    } else if (isNaN(round)) {
        return 0
    } else {
        return round
    }
};

module.exports = {
    resNumber,

}