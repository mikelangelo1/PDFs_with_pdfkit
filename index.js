const fs = require("fs");
const PDFDocument = require("pdfkit-table");

// Start pdf document
let doc = new PDFDocument({ margin: 10, size: "A5" });

// to save file on storage
// TODO
// save file on AWS S3
doc.pipe(fs.createWriteStream("./document.pdf"));

// -----------------------------------------------------------------------------------------------------
// Simple Table with Array
// -----------------------------------------------------------------------------------------------------

const tableArray = {
  headers: ["Country", "Conversion rate", "Trend"],
  rows: [
    ["switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
    ["Nigeria", "67%", "-0.98%"],
    ["USA", "33%", "+4.44%"],
  ],
};

doc.table(tableArray, { width: 200 }); // A2. Width of A2

// move to down
doc.moveDown(); // separatee tables

// -----------------------------------------------------------------------------------------------------
// Complex Table with Object
// -----------------------------------------------------------------------------------------------------

const table = {
  headers: [
    { label: "Name", property: "name", width: 60, renderer: null },
    {
      label: "Description",
      property: "description",
      width: 150,
      renderer: null,
    },
    { label: "Price 1", property: "price1", width: 100, renderer: null },
    { label: "Price 2", property: "price2", width: 100, renderer: null },
    { label: "Price 3", property: "price3", width: 80, renderer: null },
    {
      label: "Price 4",
      property: "price4",
      width: 63,
      renderer: (value, indexColumn, indexRow, row) => {
        return `U$ ${Number(value).toFixed(2)}`;
      },
    },
  ],
  datas: [
    {
      name: "Keyboard",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ",
      price1: "$1",
      price3: "$ 3",
      price2: "$2",
      price4: "4",
    },
    {
      name: "bold:Name 2",
      description: "bold:Lorem ipsum dolor.",
      price1: "bold:$1",
      price3: "$3",
      price2: "$2",
      price4: "4",
      options: { fontSize: 10, separation: true },
    },
    {
      name: "bold:Name 3",
      description: "Lorem ipsum dolor.",
      price1: "bold:$1",
      price4: "4.111111",
      price2: "$2",
      price3: { label: "PRICE $3", options: { fontSize: 12 } },
    },
  ],

  rows: [
    [
      "Apple",
      "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
      "$ 105,99",
      "$ 105,99",
      "$ 105,99",
      "105.99",
    ],
    [
      "Tire",
      "Donec ac tincidunt nisi, sit amet tincidunt mauris. Fusce venenatis tristique quam, nec rhoncus eros volutpat nec. Donec fringilla ut lorem vitae maximus. Morbi ex erat, luctus eu nulla sit amet, facilisis porttitor mi.",
      "$ 105,99",
      "$ 105,99",
      "$ 105,99",
      "105.99",
    ],
  ],
};

doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'blue' : 'green'), 0.15);
    }
});

doc.moveDown(1);

const tableArrayColor = {
    headers: ["Country", "Conversion rate", "Trend"],
    rows: [
        ["Switzerland", "12%", "+1.12%"],
        ["France", "67%", "-0.98%"],
        ["Brazil", "88%", "2.77%"],
      ],
};
doc.table(tableArrayColor, {
    width: 150,
    x: 150,
    columnsSize: [100, 50, 50],

    prepareRow: (row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(10);
        indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'red' : 'green'), 0.5);
    }
});


// if your run express.js server:
// HTTP response only to show pdf
// doc.pipe(res);

// done
doc.end();