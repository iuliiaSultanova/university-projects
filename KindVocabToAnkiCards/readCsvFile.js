const fs = require('fs')
const { parse } = require('csv-parse')

const data = []

let rawdata = fs.readFileSync('jmdict-eng-3.5.0.json')
let dictionary = JSON.parse(rawdata)
let entries = dictionary['words']

fs.createReadStream('大事なことほど小声でささやく.csv')
  .pipe(
    parse({
      delimeter: ',',
      columns: true,
      ltrim: true
    })
  )
  .on('data', function (row) {
    data.push(row)
  })
  .on('error', function (error) {
    console.log(error.message)
  })
  .on('end', function () {
    console.log('finished parsing')
    data.forEach(row => (row.meaning = ''))
    data.forEach(row => findDefinition(row))
    //console.log(data)
    generateOutputFile(data)
  })

//here goes a function to match words with definitions
function findDefinition (row) {
  let result = []
  for (let entry of entries) {
    for (let elem of entry['kana']) {
      if (elem['text'] == row.word) {
        result.push(entry['sense'][0]['gloss'][0]['text'])
        row.meaning = result[0]
      } else {
        for (let char of entry['kanji']) {
          if (char['text'] == row.word) {
            result.push(entry['sense'][0]['gloss'][0]['text'])
            row.meaning = result[0]
          }
        }
      }
    }
  }
}

function generateOutputFile (data) {
  const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = Object.keys(data[0])
  const csv = [
    header.join(','),
    ...data.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(',')
    )
  ].join('\r\n')

  fs.writeFile('output.csv', csv, err => {
    if (err) throw err
    console.log('The file has been saved!')
  });
};
