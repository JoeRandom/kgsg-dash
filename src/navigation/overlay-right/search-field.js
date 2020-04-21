import React from 'react'

import { Box, Grommet, TextInput } from 'grommet'
import { grommet } from 'grommet/themes'

import { useStoreActions, useStoreState } from 'easy-peasy'

const SearchField = () => {
  const value = useStoreState((state) => state.search.data.werkstatt)

  const setValue = useStoreActions(
    (actions) => actions.search.updateSearchField
  )

  const onChange = (event) => setValue(event.target.value)
  const onSelect = event => setValue(event.suggestion)

  const suggestions = [
    'Werkhalle 2',
    'Extern',
    'Termin',
    'Digitale Werkstatt',
    'Giesserei',
    'Metallwerkstatt',
    'Baustelle',
    'Holzwerkstatt',
    'Restaurierung',
    'Projektleitung',
    'Shanghai',
    'Werkstatt'
  ]

  return (
    <Grommet theme={grommet}>
      <Box>
        <TextInput
          value={value}
          placeholder='Werkstatt'
          onChange={onChange}
          onSelect={onSelect}
          suggestions={suggestions}
          dropProps={{ height: 'big' }}
        />
      </Box>
    </Grommet>
  )
}

export default SearchField
