import { useStoreActions, useStoreState } from 'easy-peasy'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import React from 'react'

const SearchSwitches = ({ checked: checkedProp, ...rest }) => {
  const state = useStoreState((state) => state.search.data)

  const updateCheckbox = useStoreActions(
    (actions) => actions.search.updateCheckbox
  )

  const onChange = (event) => {
    const { name, checked } = event.target
    updateCheckbox({ name, checked })
  }

  return (
    <Grommet theme={grommet}>
      {/* <Box align='start' pad='xsmall'>
        <CheckBox
          toggle
          label='In Planung'
          checked={state.option1}
          onChange={onChange}
          name='option1'
        />
      </Box> */}

      {/* <Box align='start' pad='xsmall'>
        <CheckBox
          toggle
          label='Option2'
          checked={state.option2}
          onChange={onChange}
          name='option2'
        />
      </Box> */}
    </Grommet>
  )
}

export default SearchSwitches
