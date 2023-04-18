import { useContext, useState, useCallback, useEffect, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { AuthContext } from '~/context/auth-context'
import { MessageService } from '~/services/message-service'
import useAxios from '~/hooks/use-axios'

import { AuthContextInterface, MessageBody, MessageResponse, UpdateMessageBody } from '~/types'
import { styles } from '~/pages/home/Home.styles'

type Response = Pick<MessageResponse, 'message'>

const Home = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [shift, setShift] = useState<number>(1)
  const { currentUser } = useContext(AuthContext) as AuthContextInterface

  const addNewMessage = useCallback(
    () => MessageService.addMessage({ message: inputValue, userId: currentUser?.id }),
    [inputValue, currentUser]
  )
  const getMessages = useCallback((userId?: number) => MessageService.getMessages(userId), [])
  const updateUserMessage = useCallback((body?: UpdateMessageBody) => MessageService.updateMessage(body), [])
  const deleteUserMessages = useCallback((userId?: number) => MessageService.deleteMessages(userId), [])

  const {
    response,
    loading,
    fetchData: addMessage
  } = useAxios<Pick<MessageResponse, 'id' | 'message'>, MessageBody>({ service: addNewMessage, fetchOnMount: false })

  const { response: messages, fetchData } = useAxios<MessageResponse[], number>({
    service: getMessages,
    fetchOnMount: false
  })

  const { response: updatedMessage, fetchData: updateMessage } = useAxios<Response, UpdateMessageBody>({
    service: updateUserMessage,
    fetchOnMount: false
  })

  const { response: deletedMessage, fetchData: deleteMessages } = useAxios<Response, number>({
    service: deleteUserMessages,
    fetchOnMount: false
  })

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onShiftChange = (e: any) => {
    setShift(e.target.value)
  }

  const encrypt = (id: number, shift: number) => {
    updateMessage({ id, method: 'encrypt', shift })
  }

  const decrypt = (id: number, shift: number) => {
    updateMessage({ id, method: 'decrypt', shift })
  }

  useEffect(() => {
    currentUser && fetchData(currentUser.id)
  }, [currentUser, fetchData, response, updatedMessage, deletedMessage])

  const userInfo = currentUser && (
    <Box sx={ styles.userInfo }>
      <Avatar sx={ styles.avatar } variant='square' />

      <TitleWithDescription description={ `Email: ${currentUser.email}` } title={ `Username: ${currentUser.userName}` } />
    </Box>
  )

  const messagesBlock = messages.length ? (
    messages.map((item: MessageResponse) => (
      <Box key={ item.id } sx={ styles.messagesContainer }>
        <TitleWithDescription description={ item.message } sx={ styles.messageInfo } title={ 'Your Message:' } />

        <Typography
          onClick={ () => encrypt(item.id, shift) }
          sx={ styles.encryptBtn }
          variant='subtitle1'
        >
          { 'Encrypt' }
        </Typography>

        <Typography
          onClick={ () => decrypt(item.id, shift) }
          sx={ styles.encryptBtn }
          variant='subtitle1'
        >
          { 'Decrypt' }
        </Typography>
      </Box>
    ))
  ) : (
    <Box sx={ { color: 'primary.500' } }>
      { 'No messages found!' }
    </Box>
  )

  return (
    <Container>
      <TitleWithDescription
        description='Method in which each letter in the plaintext is replaced by a letter some fixed number of positions down the
            alphabet.'
        sx={ styles.titleWithDescription }
        title='Caesar cipher: Encode and decode online'
      />

      { userInfo }

      <Box sx={ styles.inputContainer }>
        <AppTextField
          disabled={ messages.length >= 2 }
          inputProps={ { maxLength: 55 } }
          label='Type something...'
          maxRows='5'
          minRows='2'
          multiline
          onChange={ onInputChange }
          sx={ styles.input }
          type='text'
          value={ inputValue }
        />

        <Box sx={ { display: 'flex', flexDirection: 'column', rowGap: '15px' } }>
          <AppButton
            disabled={ !inputValue }
            loading={ loading }
            onClick={ () => addMessage() }
            size='small'
            sx={ styles.addBtn }
            variant='contained'
          >
            { 'Add Message' }
          </AppButton>

          <AppButton
            disabled={ !messages.length }
            onClick={ () => deleteMessages(currentUser?.id) }
            size='small'
            sx={ styles.addBtn }
            variant='contained'
          >
            { 'Delete Messages' }
          </AppButton>
        </Box>

        <AppTextField
          label='Enter shift'
          maxRows='1'
          onChange={ onShiftChange }
          sx={ styles.shiftInput }
          type='number'
          value={ shift }
        />
      </Box>

      { messagesBlock }
    </Container>
  )
}

export default Home
