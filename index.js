function serialize(input) {
    let buffer = '';

    input.forEach((num) => {
        let mod = Math.floor(num / 127);
        let div = num % 127

        buffer += `${mod}${String.fromCharCode(div)}`
    });

    return buffer;
}

function deserialize(serialized) {
    let output = [];

    for (let i = 0; i < serialized.length; i+=2) {
        let mod = serialized[i];
        let code = serialized[i+1];

        output.push(mod * 127 + code.charCodeAt(0))
    }

    return output;
}

function createRandomArray(length) {
    let array = [];

    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 299) + 1)
    }

    return array;
}

function createEdgesArray(min, max) {
    let array = [];

    for (let i = min; i < max; i++) {
        array.push(i)
    }

    return array;
}

let testCases = [
   ['Простейшие', [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    ['Случайные 50', createRandomArray(50)],
    ['Случайные 100', createRandomArray(100)],
    ['Случайные 500', createRandomArray(500)],
    ['Случайные 1000', createRandomArray(1000)],
    ['Граничные 1го знака', createEdgesArray(1, 10)],
    ['Граничные 2х знаков', createEdgesArray(10, 100)],
    ['Граничные 3х знаков', createEdgesArray(100, 301)],
    ['Граничные каждого числа по 3', [...createEdgesArray(1, 301), ...createEdgesArray(1, 301)], ...createEdgesArray(1, 301)],
];

testCases.forEach((testCase) => {
    let serialized = serialize(testCase[1]);
    let stringify = testCase[1].toString();
    let compressPercent = serialized.length / stringify.length * 100;
    let deserialized = deserialize(serialized);
    let success = testCase[1].toString() === deserialized.toString();

    console.group(`____________________________________ТЕСТ: ${testCase[0]}________________________________`);
        console.log('Исходная строка:', stringify);
        console.log('Сжатая строка:', serialized);
        console.log('Коэффициент сжатия:', compressPercent, '%');
        console.log('Успех:', success);
        console.log('______________________________________________________________________________________________');
    console.groupEnd();
});