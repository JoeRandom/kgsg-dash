import React from 'react'

import { Trash } from 'grommet-icons'

import { Box, Button, Grommet, Heading, Layer, Text } from 'grommet'
import { grommet } from 'grommet/themes'

const Modal = () => {
  const [open, setOpen] = React.useState()

  const onOpen = () => setOpen(true)

  const onClose = () => setOpen(undefined)

  return (
    <Grommet theme={grommet} full>
      <Box fill align='center' justify='center'>
        <Button
          icon={<Trash />}
          label={
            <Text>
              <strong>Remove</strong>
            </Text>
          }
          onClick={onOpen}
          plain
        />
      </Box>
      {open && (
        <Layer position='center' modal onClickOutside={onClose} onEsc={onClose}>
          <Box pad='medium' gap='small' width='medium'>
            <Heading level={3} margin='none'>
              Confirm
            </Heading>
            <Text>Are you sure you want to delete?</Text>
            <Box
              as='footer'
              gap='small'
              direction='row'
              align='center'
              justify='end'
              pad={{ top: 'medium', bottom: 'small' }}
            >
              <Button
                label={
                  <Text color='white'>
                    <strong>Delete</strong>
                  </Text>
                }
                onClick={onClose}
                primary
                color='status-critical'
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Grommet>
  )
}

export default Modal
