import React, { Component  } from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_simple.min.css'; 

const columns = [
    // { title: "ID", field: "ID" },
    { title: "Beschreibung", field: "Beschreibung", headerFilter:"input", topCalc:"count" },
    { title: "Aufgabe", field: "Aufgabe", headerFilter:"input", topCalc:"count" },
    { title: "Werkstatt", field: "Werkstatt", headerFilter:"input" },
    { title: "Projectcode", field: "Projectcode", headerFilter:"input" },
    { title: "Stunden", field: "Stunden", headerFilter:"input", topCalc:"sum" },
    { title: "PL", field: "PL", headerFilter:"input" },
    { title: "Start", field: "Start", headerFilter:"input", sorter: "date", sorterParams: {format:"DD/MM/YYYY"}},
    { title: "Ende", field: "Ende", headerFilter:"input", sorter: "date", sorterParams: {format:"DD/MM/YYYY"}},
  ];

global.groupStartOpen = false

class TabulatorTable extends Component {

render () {
    const options = {
      layoutColumnsOnNewData: true,
      layout: "fitColumns", //fit columns to width of table (optional)
      responsiveLayout: "hide", //hide columns that dont fit on the table
      // tooltips: true, //show tool tips on cells
      // addRowPos: "top", //when adding a new row, add it to the top of the table
      history: true, //allow undo and redo actions on the table
      // groupBy: "Werkstatt",
      print:true,
      groupStartOpen: global.groupStartOpen,
      pagination: "local", //paginate the data
      paginationSize: 50, //allow 20 rows per page of data
      paginationSizeSelector: [50, 100, 500],
      movableColumns: true, //allow column order to be changed
      // resizableRows: true, //allow row order to be changed
      persistence:{
        sort:true,
        filter:true,
        columns:true
      }
    };

return <div>

          <ReactTabulator
            data={this.props.data}
            columns={columns}
            layout={"fitDataStretch"}
            dataFiltered= {
              function(filters, rows){
                if (typeof rows === undefined) {
                  console.log('waiting for rows')
                } else {
                  let results = rows.map(a => a._row.data);
                  global.filteredRows=results
                  console.log(`logging rows from tabulator filter: ${results}`)
                  // this.print()
                }
              }
            }
            options={options}
          >
          </ReactTabulator>
        </div> 
  }
}

export default TabulatorTable
