const resNumber = (qty, typeNumber) => {
    let maxNum;
    if (typeNumber === 'quantity') {
        maxNum = 1000000;
    } else if (typeNumber === 'filling') {
        maxNum = 100;
    }
    if (qty === true || qty === false || qty === '' ||
        (typeNumber !== 'quantity' && typeNumber !== 'filling')) {
        return false
    }

    const round = Math.round(Number(qty));
    if (round < 0) {
        return false
    } else if (round > maxNum) {
        return false
    } else if (isNaN(round)) {
        return false
    } else {
        return round
    }
};

module.exports = {
    resNumber,

}