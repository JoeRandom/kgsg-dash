import { Footer, Grommet, Header, Main, Text, Tab, Box, Tabs, Button, DropButton, TextInput, Calendar, Keyboard, MaskedInput, FormDown } from 'grommet'
import { Print, Schedule } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'
import React from 'react'
import { css } from 'styled-components'
import Tabletop from 'tabletop'
import './App.css'
import TabulatorTable from './tabulators/tabulator-table.js'
import TabulatorTableFerien from './tabulators/tabulator-table-ferien.js'
import Head from './navigation/header.js'

import { connect } from 'react-redux'

global.groupStartOpen = true

const customTheme = deepMerge(grommet, {
  tabs: {
    gap: 'medium',
    header: {
      background: 'light-2',
      extend: ({ theme }) => css`
        padding: ${theme.global.edgeSize.small};
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
        <Tabs
          color='light-4'
          // activeIndex={}
          onActive={console.log('active')}
        >
          <Tab title='Auswertung PL'>
            <TabulatorTable data={table.data.pl} />
          </Tab>
          <Tab title='Ferien'>
            <TabulatorTableFerien data={table.data.ferien} />
          </Tab>
          <Tab title='Charts'>
            <Text>platzhalter chart</Text>
          </Tab>
          <Box irection='row' pad='xsmall' align='right'>
            <Head />
          </Box>
        </Tabs>
        <Main pad='small' />
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
