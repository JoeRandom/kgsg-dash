import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { ReactTabulator } from 'react-tabulator'
import 'react-tabulator/lib/css/semantic-ui/tabulator_semantic-ui.min.css'
import 'react-tabulator/lib/styles.css'
import { Button, Box } from 'grommet'
import { Print } from 'grommet-icons'

import { connect } from 'react-redux'

import debounce from 'lodash.debounce'

const TabulatorTableFerien = (props) => {
  const options = {
    margin: 0,
    layoutColumnsOnNewData: true,
    layout: 'fitColumns', // fit columns to width of table (optional)
    responsiveLayout: 'hide', // hide columns that dont fit on the table
    // tooltips: true, //show tool tips on cells
    history: true, // allow undo and redo actions on the table
    groupBy: 'Werkstatt',
    print: true,
    groupStartOpen: true,
    pagination: 'local', // paginate the data
    paginationSize: 100, // allow 20 rows per page of data
    paginationSizeSelector: [100, 500],
    movableColumns: true, // allow column order to be changed
    persistence: {
      sort: true, // persist column sorting
      filter: true, // persist filter sorting
      group: true, // persist row grouping
      page: true, // persist page
      columns: true // persist columns
    },
    langs: {
      'de-de': {
        pagination: {
          first: 'Zuerst',
          first_title: 'Zuerst Seite',
          last: 'Last',
          last_title: 'Letzte Seite',
          prev: 'Zurück',
          prev_title: 'Zurück Seite',
          next: 'Nächster',
          next_title: 'Nächster Seite'
        }
      }
    },
    dataFiltered: () => {
      if (table) {
        // Get filters.
        const filters = table.table.getHeaderFilters()

        const search = filters.find((filter) => filter.field === 'Werkstatt')

        if (search) {
          props.updateSearch(search.value)
        }
      }
    }
  }

  const columns = [
    {
      title: 'Mitarbeiter',
      field: 'Mitarbeiter',
      headerFilter: 'input'
    },
    {
      title: 'Werkstatt',
      field: 'Werkstatt',
      headerFilter: 'input',
      topCalc: 'count'
    },
    {
      title: 'Aufgabe',
      field: 'Aufgabe',
      headerFilter: 'input'
    },
    {
      title: 'Pensum',
      field: 'Pensum',
      headerFilter: 'input',
      topCalc: 'sum'
    },
    {
      title: 'Start',
      field: 'Start',
      headerFilter: 'input',
      headerFilterFunc: (filter, input, row) => {
        if (!filter) {
          return true
        }

        const endDate = this.props.dates[0][1]

        if (endDate) {
          const start = moment(filter, 'DD/MM/YYYY')
          const end = moment(endDate)

          const current = moment(input, 'DD/MM/YYYY')

          if (
            start.isValid() &&
            end.isValid() &&
            current.isSameOrAfter(start) &&
            current.isSameOrBefore(end)
          ) {
            return true
          }
        }

        if (input.indexOf(filter) !== -1) {
          return true
        }

        return false
      },
      sorter: 'date',
      sorterParams: { format: 'DD/MM/YYYY' }
    },
    {
      title: 'Ende',
      field: 'Ende',
      headerFilter: 'input',
      headerFilterFunc: (filter, input, row) => {
        if (!filter) {
          return true
        }

        const startDate = this.props.dates[0][0]

        if (startDate) {
          const start = moment(startDate)
          const end = moment(filter, 'DD/MM/YYYY')

          const current = moment(input, 'DD/MM/YYYY')

          if (
            start.isValid() &&
            end.isValid() &&
            current.isSameOrAfter(start) &&
            current.isSameOrBefore(end)
          ) {
            return true
          }
        }

        if (input.indexOf(filter) !== -1) {
          return true
        }

        return false
      },
      sorter: 'date',
      sorterParams: { format: 'DD/MM/YYYY' }
    }
  ]

  useEffect(() => {
    if (props.searchWerkstatt) {
      setHeaderSearch(props.searchWerkstatt)
    }

    if (props.dates) {
      setHeaderDates(props.dates[0][0], props.dates[0][1])
    } else {
      table.table.clearHeaderFilter()
    }
    console.log('mount it!')
  }, []) // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  // componentDidMount() {
  //   if (this.props.searchWerkstatt) {
  //     this.setHeaderSearch(this.props.searchWerkstatt);
  //   }

  //   if (this.props.dates) {
  //     this.setHeaderDates(this.props.dates[0][0], this.props.dates[0][1]);
  //   } else {
  //     this.table.table.clearHeaderFilter();
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.searchWerkstatt !== this.props.searchWerkstatt) {
  //     this.setHeaderSearch(this.props.searchWerkstatt);
  //   }

  //   if (this.props.dates) {
  //     this.setHeaderDates(this.props.dates[0][0], this.props.dates[0][1]);
  //   }
  // }

  const setHeaderSearch = debounce((value) => {
    this.table.table.setHeaderFilterValue('Werkstatt', value)
  }, 300)

  const setHeaderDates = debounce((start, end) => {
    this.table.table.setHeaderFilterValue(
      'Start',
      moment(start).format('DD/MM/YYYY')
    )

    this.table.table.setHeaderFilterValue(
      'Ende',
      moment(end).format('DD/MM/YYYY')
    )
  }, 300)

  const printTable = () => {
    if (this.table) {
      this.table.table.print(false, true)
    }
  }

  return (
    <div>
      <Box
        pad='small'
        direction='row'
        align='center'
        justify='center'
      >
        <Button
          align='center'
          color='#777'
          label='Drucken'
          size='small'
          icon={<Print size='small' />}
          gap='small'
          pad='small'
          onClick={printTable}
        />
      </Box>
      <ReactTabulator
        setLocale='de'
        ref={(ref) => (table = ref)}
        data={props.data}
        columns={columns}
        layout='fitDataStretch'
        dataFiltered={function (filters, rows) {
          if (typeof rows === undefined) {
            console.log('waiting for rows')
          } else {
            const results = rows.map((a) => a._row.data)
            global.filteredRows = results
          }
        }}
        options={options}
      />
    </div>
  )
}

export default connect(
  (state) => ({
    searchWerkstatt: state.search.data.werkstatt,
    dates: state.search.data.dates
  }),
  (dispatch) => ({
    updateSearch: dispatch.search.updateSearchField,
    updateDate: dispatch.search.updateDate,
    updateDates: dispatch.search.updateDates
  })
)(TabulatorTableFerien)
