import moment from "moment";
import React, { Component } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/semantic-ui/tabulator_semantic-ui.min.css";
import "react-tabulator/lib/styles.css";
import { Button } from "grommet";
import { Print } from "grommet-icons";


import { useStoreState } from "easy-peasy";

const options = {
  layoutColumnsOnNewData: true,
  layout: "fitColumns", //fit columns to width of table (optional)
  responsiveLayout: "hide", //hide columns that dont fit on the table
  // tooltips: true, //show tool tips on cells
  history: true, //allow undo and redo actions on the table
  groupBy: "Mitarbeiter",
  print: true,
  groupStartOpen: true,
  pagination: "local", //paginate the data
  paginationSize: 100, //allow 20 rows per page of data
  paginationSizeSelector: [100, 500],
  movableColumns: true, //allow column order to be changed
  persistence: {
    sort: true, //persist column sorting
    filter: true, //persist filter sorting
    group: true, //persist row grouping
    page: true, //persist page
    columns: true, //persist columns
  },
  langs:{
    "de-de":{ 
        "pagination":{
            "first":"Zuerst",
            "first_title":"Zuerst Seite",
            "last":"Last",
            "last_title":"Letzte Seite",
            "prev":"Zurück",
            "prev_title":"Zurück Seite",
            "next":"Nächster",
            "next_title":"Nächster Seite",
        },
    },
}}

class TabulatorTableFerien extends Component {
  // I know this should have been stored in the state.
  // But calling this.setState hundreds of times in a render is not a good idea.
  // This is fine though as we don't want to re-render if these value changes.
  startDate = "";
  endDate = "";

  columns = [
    {
      title: "Mitarbeiter",
      field: "Mitarbeiter",
      headerFilter: "input",
    },
    {
      title: "Werkstatt",
      field: "Werkstatt",
      headerFilter: "input",
      topCalc: "count"
    },
    { 
     title: "Aufgabe",
     field: "Aufgabe",
     headerFilter: "input" 
    },
    {
      title: "Pensum",
      field: "Pensum",
      headerFilter: "input",
      topCalc: "sum"
    },
    {
      title: "Start",
      field: "Start",
      headerFilter: "input",
      headerFilterFunc: (filter, input, row) => {
        if (!filter) {
          return true;
        }

        this.startDate = filter;

        if (this.endDate) {
          const start = moment(filter, "DD/MM/YYYY");
          const end = moment(this.endDate, "DD/MM/YYYY");

          const current = moment(input, "DD/MM/YYYY");

          if (
            start.isValid() &&
            end.isValid() &&
            current.isSameOrAfter(start) &&
            current.isSameOrBefore(end)
          ) {
            return true;
          }
        }

        if (input.indexOf(filter) !== -1) {
          return true;
        }

        return false;
      },
      sorter: "date",
      sorterParams: { format: "DD/MM/YYYY" }
    },
    {
      title: "Ende",
      field: "Ende",
      headerFilter: "input",
      headerFilterFunc: (filter, input, row) => {
        if (!filter) {
          return true;
        }

        this.endDate = filter;

        if (this.startDate) {
          const start = moment(this.startDate, "DD/MM/YYYY");
          const end = moment(filter, "DD/MM/YYYY");

          const current = moment(input, "DD/MM/YYYY");

          if (
            start.isValid() &&
            end.isValid() &&
            current.isSameOrAfter(start) &&
            current.isSameOrBefore(end)
          ) {
            return true;
          }
        }

        if (input.indexOf(filter) !== -1) {
          return true;
        }

        return false;
      },
      sorter: "date",
      sorterParams: { format: "DD/MM/YYYY" }
    }
  ];

  printTable = () => {
    if (this.table) {
      this.table.table.print(false, true);
    }
  };

  render() {
    return (
      <div>
        <Button
          color="#777"
          label="Drucken"
          size="small"
          icon={<Print />}
          onClick={this.printTable}
         />
        <ReactTabulator
          setLocale={"de"}
          ref={ref => (this.table = ref)}
          data={this.props.data}
          columns={this.columns}
          layout={"fitDataStretch"}
          dataFiltered={function(filters, rows) {
            if (typeof rows === undefined) {
              console.log("waiting for rows");
            } else {
              let results = rows.map(a => a._row.data);
              global.filteredRows = results;
              // console.log(`logging rows from tabulator filter: ${results}`);
            }
          }}
          options={options}
        ></ReactTabulator>
      </div>
    );
  }
}

export default TabulatorTableFerien;
