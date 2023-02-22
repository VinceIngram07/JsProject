const fs = require('fs');
const csv = require('csv-parser');

// set the input and output file paths
// Change inputFilePath value!
const inputFilePath = 'organizations-100.csv';
const outputFilePath = 'outputData.csv';

// set the columns to select from the input file
// Change selectedColumn array to desired names!
const selectedColumns = ['Index', 'Organization Id', 'Name', 'Website'];

// create an array to hold the selected data
const selectedData = [];

// read the input CSV file and select the desired columns
fs.createReadStream(inputFilePath)
	.pipe(csv())
	.on('data', (row) => {
		const selectedRow = {};
		selectedColumns.forEach((col) => {
			selectedRow[col] = row[col];
		});
		selectedData.push(selectedRow);
	})
	.on('end', () => {

		// write the selected data to the output CSV file 
		const csvWriter = require('csv-writer').createObjectCsvWriter({
			path: outputFilePath,
			header: selectedColumns.map((col) => ({ id: col, title: col })),
		});
		csvWriter.writeRecords(selectedData)
			.then(() => {
				console.log('Selected data columns written to output file.');
			});
	});
