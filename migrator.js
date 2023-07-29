const fs = require('fs');

const readFileName = process.argv[2];
const writeFileName = process.argv[3];

if (!(readFileName && writeFileName)) {
    console.log('Укажите файл словаря и файл назначения!');
    console.log('Например: node migrator.js russian_nouns.txt rus-5.txt');
}

fs.open(writeFileName, 'w+', function (err, fWrite) {
    console.log(`Записываем в файл: ${ writeFileName }`);
    if (err) {
        return console.error(err);
    }

    const data = fs.readFileSync(readFileName, { encoding: 'utf8', flag: 'r' });
    console.log(`Читаем из файла: ${ readFileName }\n`);

    const lineDivider =
        (data.indexOf('\r') === -1 ? '' : '\r') +
        (data.indexOf('\n') === -1 ? '' : '\n');

    const arr = data.split(lineDivider);
    console.log(`Словарь содержит слов: ${arr.length}`);

    const arr5 = arr.filter((val) => val.length === 5);
    console.log(`Словарь содержит слов из 5 букв: ${ arr5.length }\n`);

    fs.write(fWrite, arr5.join('\n'), (err, bytes)=> {
        if(err) {
            console.log(err.message);
            return;
        }

        console.log(bytes +' bytes written');
    })
});