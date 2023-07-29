const fs = require('fs');

const readFileName = 'rus-5.txt';
// Угаданная позици букв
const wordPositionLetters = ["", "", "", "", ""];
// Буквы, которых нет в слове
const excludeLetters = [];
// Буквы, которые есть в слове
const includeLetters = [];
// Подходящие слова
let result = [];

// Параметры переданные скрипту
const executeParams = process.argv.slice(2);

const data = fs.readFileSync(readFileName, { encoding: 'utf8', flag: 'r' });
const arr = data.split('\n');

console.log(`Слов из 5 букв в словаре: ${arr.length}.\r\n`);

if(executeParams.length > 0) {
    const reDigit = new RegExp(/^\d/);
    const reInclude = new RegExp(/^\+/);
    const reExclude = new RegExp(/^-/);

    executeParams.forEach(param => {
        if (reDigit.test(param)) {
            wordPositionLetters[param.charAt(0) - 1] = param.charAt(1);
        }
        if (reInclude.test(param)) {
            includeLetters.push(param.charAt(1));
        }
        if (reExclude.test(param)) {
            excludeLetters.push(param.charAt(1));
        }
    });
}

console.log(`Позиция букв в слове: | ${ wordPositionLetters.join(' | ') } |`);
console.log(`Слово содержит букву: ${ includeLetters.join(', ') }`);
console.log(`Слово не содержит букв: ${ excludeLetters.join(', ') }\r\n`);

const isEmptyWordPositionLetters = wordPositionLetters.every( val => val === "");
const startTime = performance.now();
result = arr.filter( word => {
    let isCorrectPosition = false;
    if (!isEmptyWordPositionLetters) {
        isCorrectPosition = wordPositionLetters.every((letter, index) => {
            if (letter === "") return true;

            return word.charAt(index) === letter;
        });

        if (!isCorrectPosition) {
            return false;
        }
    }

    const wordLettersArray = Array.from(word);

    const isIncludeLetters =
        includeLetters.every(letter => wordLettersArray.includes(letter));

    const isExcludeLetters =
        excludeLetters.every(letter => !wordLettersArray.includes(letter));

    return isIncludeLetters && isExcludeLetters;
})
const endTime = performance.now();

console.log(`Время поиска: ${ (endTime - startTime).toFixed(3) }мс`)
if (result.length > 50) {
    console.log(`Найдено слишком много совпадений (${result.length}).`);
    return 0;
}

if (result.length === 0) {
    console.log(`Совпадений не найдено.`);
    return 0;
}

console.log(`Подходящие слова: `, result);