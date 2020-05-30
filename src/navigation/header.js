import React from 'react'
import SearchField from './overlay-right/search-field'
import CalendarPicker from './overlay-right/calendar'
import SearchSwitches from './overlay-right/search-switches'
import { connect } from 'react-redux'
import { useStoreActions, useStoreState } from 'easy-peasy'

import {
  SearchAdvanced,
  Close
} from 'grommet-icons'

import {
  Box,
  Button,
  Grommet,
  Heading,
  Layer
} from 'grommet'

const Head = () => {
  const [open, setOpen] = React.useState(false)

  const resetDates = useStoreActions(
    (actions) => actions.search.resetDates
  )

  const onOpen = () => setOpen(true)

  const onClose = () => setOpen(undefined)

  return (
    <Grommet>
      <Box pad='xsmall'>
        <Button
          pad='xsmall'
          icon={<SearchAdvanced />}
          onClick={onOpen}
        />
      </Box>
      {open && (
        <Layer
          position='right'
          full='vertical'
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            as='form'
            fill='vertical'
            overflow='auto'
            width='auto'
            pad='medium'
            onSubmit={onClose}
          >
            <Box flex={false} direction='row' justify='between'>
              <Heading level={3} margin='none'>
                  Daten filtern
              </Heading>
              <Button icon={<Close />} onClick={onClose} />
            </Box>
            <SearchField pad={{ vertical: 'medium' }} />
            <CalendarPicker />
            <SearchSwitches />
            <Box flex='grow' overflow='auto' pad={{ vertical: 'medium' }} />
            <Box direction='row' flex={false} as='footer' align='start'>
              {/* <Button
                type='submit'
                label='Sichern'
                onClick={onClose}
                primary
              /> */}
              <Box pad='xsmall' />
              <Button
                color='orange'
                label='Reset'
                onClick={resetDates}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Grommet>
  )
}

export default Head
