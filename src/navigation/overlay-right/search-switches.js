import React, { useState } from 'react'

import { Box, Grommet, CheckBox } from 'grommet'
import { grommet } from 'grommet/themes'

const SearchSwitches = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp)
  const [checked2, setChecked2] = useState(!!checkedProp)

  const onChange = event => setChecked(event.target.checked)
  const onChange2 = event => setChecked2(event.target.checked2)

  return (
    <Grommet theme={grommet}>
      <Box align='left' pad='xsmall'>
        <CheckBox toggle label='In Planung' checked={checked} onChange={onChange} />
      </Box>
      <Box align='left' pad='xsmall'>
        <CheckBox toggle label='Option2' checked={checked2} onChange={onChange2} />
      </Box>
    </Grommet>
  )
}

export default SearchSwitches
