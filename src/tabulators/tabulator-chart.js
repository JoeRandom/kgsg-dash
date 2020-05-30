import React from 'react'

import { Bar } from '@nivo/bar'
import { connect } from 'react-redux'
import { Box, Table } from 'grommet'
import { AutoSizer } from 'react-virtualized'

function TodoList ({ table }) {
  return (
    table
  )
}

const Chart = (table) => (
  <Box
    height={{ min: '400px' }} width={{ min: '400px' }}

  >
    <AutoSizer>
      {({ height, width }) => (
        <Bar
          height={height}
          width={width}
          data={table.table.data.pl}
          keys={['Stunden']}
          indexBy='Aufgabe'
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'fries'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'sandwich'
              },
              id: 'lines'
            }
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Abteilung',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Stunden',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
          onClick={console.log(table)}
        />
      )}
    </AutoSizer>

  </Box>

)

export default connect(
  state => ({ table: state.table }),
  dispatch => ({
    updateTableData: dispatch.table.updateData,
    updateFerienTable: dispatch.table.updateFerienData
  })
)(Chart)
