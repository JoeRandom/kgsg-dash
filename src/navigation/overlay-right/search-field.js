import React from 'react'

import { Box, Grommet, TextInput } from 'grommet'
import { grommet } from 'grommet/themes'

const SearchField = () => {
  const [value, setValue] = React.useState('')

  const onChange = event => setValue(event.target.value)

  return (
    <Grommet theme={grommet}>
      <Box>
        <TextInput value={value} placeholder='Werkstatt' onChange={onChange} />
      </Box>
    </Grommet>
  )
}

export default SearchField
