import React from 'react'

import { Calendar, Grommet, Box } from 'grommet'

import { useStoreActions, useStoreState } from 'easy-peasy'

const CalendarPicker = () => {
  const data = useStoreState((state) => state.search.data)

  // const setDate = useStoreActions((actions) => actions.search.updateDate)
  const setDates = useStoreActions((actions) => actions.search.updateDates)

  return (
    <Grommet>
      <Box fill='horizontal' color='red'>
        <Calendar
          firstDayOfWeek={1}
          size='medium'
          range
          // date={data.date}
          dates={data.dates}
          onSelect={(date) => {
            if (Array.isArray(date)) {
              console.log(date)
              setDates(date)
            } else {
              console.log(date)
              // setDate(date)
            }
          }}
        />
      </Box>
    </Grommet>
  )
}

export default CalendarPicker
