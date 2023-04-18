import { axiosClient } from '~/plugins/axiosClient'
import { MessageBody, UpdateMessageBody } from '~/types'

export const MessageService = {
  addMessage: (messageData: MessageBody) => {
    return axiosClient.post('/message/add-message', messageData)
  },
  getMessages: (userId?: number) => {
    return axiosClient.get(`/message/get-messages/${userId}`)
  },
  updateMessage: (messageBody?: UpdateMessageBody) => {
    return axiosClient.patch(`/message/update-messages/${messageBody?.id}`, messageBody)
  }, 
  deleteMessages: (userId?: number) => {
    return axiosClient.delete(`/message/delete-messages/${userId}`)
  }
}
