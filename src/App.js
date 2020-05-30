import { Grommet, Main, Tab, Tabs, Box } from 'grommet'
import { grommet } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'
import React from 'react'
import { css } from 'styled-components'
import Tabletop from 'tabletop'
import './App.css'
import TabulatorTable from './tabulators/tabulator-table.js'
import TabulatorTableFerien from './tabulators/tabulator-table-ferien.js'
import Chart from './tabulators/tabulator-chart.js'
import Head from './navigation/header.js'

import { connect } from 'react-redux'

global.groupStartOpen = true

const customTheme = deepMerge(grommet, {
  tabs: {
    margin: 'xsmall',
    gap: 'small',
    header: {
      background: 'light-2',
      extend: ({ theme }) => css`
        // padding: ${theme.global.edgeSize.xsmall};
      `
    }
  },
  textInput: {
    extend: () => `
    background: #ffffff;
  `
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    // PL
    Tabletop.init({
      key: '1K1dAfhWr5eoEEIC7g1iqZLcb0Brk-oqMMFd593tu89A',
      callback: googleData => {
        this.props.updateTableData(googleData.filter(t => t.Aktiv === 'x'))
      },
      simpleSheet: true
    })
    // ferien
    Tabletop.init({
      key: '1EPKKceUNV86ZIWRb2RNDQzRmoQ3jRqbfDSItndX1_9U',
      callback: googleData => {
        this.props.updateFerienTable(googleData)
      },
      simpleSheet: true
    })
  }

  render () {
    const { table } = this.props

    return (
      <Grommet theme={customTheme}>
        <Tabs color='light-4'>
          <Tab title='Auswertung PL'>
            <TabulatorTable data={table.data.pl} />
          </Tab>
          <Tab title='Ferien'>
            <TabulatorTableFerien data={table.data.ferien} />
          </Tab>
          <Tab title='Charts'>
            <Chart data={table.data.pl} />
          </Tab>
          <Box>
            <Head />
          </Box>
        </Tabs>
        <Main />
        {/* <Footer background='light-4' justify='center' pad='small'>
          <Text textAlign='center' size='small'>
            © 2020 KGSG | v.0.3
          </Text>
        </Footer> */}
      </Grommet>
    )
  }
}

export default connect(
  state => ({ table: state.table }),
  dispatch => ({
    updateTableData: dispatch.table.updateData,
    updateFerienTable: dispatch.table.updateFerienData
  })
)(App)
