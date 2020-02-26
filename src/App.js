
import React, { Component } from 'react'
import { Grommet, Box, Tab, Tabs, Text, Footer, Header, Main, Grid , Nav, Anchor, CheckBox} from 'grommet'
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { css } from "styled-components";

import './App.css';
import Tabletop from 'tabletop';
// import ChartLeft from './ChartLeft'
import TabulatorTable from './tabulator-table.js.js'

global.groupStartOpen = true

const customTheme = deepMerge(grommet, {
  tabs: {
    gap: "medium",
    header: {
      background: "light-1",
      extend: ({ theme }) => css`
        padding: ${theme.global.edgeSize.small};
        // box-shadow: ${theme.global.elevation.light.medium};
      `
    },   
  }
});

class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: '1K1dAfhWr5eoEEIC7g1iqZLcb0Brk-oqMMFd593tu89A',
      callback: googleData => {
        this.setState(state => ({
          data: googleData.filter(t => t.Aktiv === "x")
        }));
      },
      simpleSheet: true
    })
  }

  render() {
    const { data } = this.state
    return (
      <Grommet theme={customTheme}>
        <Header 
          gridArea='nav'
          background="light-4" pad="small">
          <Text size="medium">Auswertung PL</Text>
        </Header>
        <Main pad="small">
        <TabulatorTable data={data} />
        </Main>
        <Footer background="light-4" justify="center" pad="small">
          <Text textAlign="center" size="small">
            © 2020 KGSG | v.0.1
          </Text>
        </Footer>
      </Grommet>
    )}
  }


export default App;
