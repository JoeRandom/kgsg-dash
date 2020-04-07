import React from 'react'

import { Calendar, Grommet, Box } from 'grommet'

const CalendarPicker = () => (
  <Grommet>
    <Box fill='horizontal' color='red'>
      <Calendar
        size='medium'
        range
        // date={(new Date()).toISOString()}
        onSelect={(date) => { console.log(date) }}
      />
    </Box>
  </Grommet>
)

export default CalendarPicker
