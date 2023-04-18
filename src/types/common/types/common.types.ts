export type UserBody = {
  userName?: string
  email: string
  password: string
}

export type MessageBody = {
  message: string
  userId?: number
}

export type UpdateMessageBody = {
  id: number
  method: string
  shift: number
}

export type MessageResponse = {
  id: number
  message: string
  userId: number
  createdAt: string
}

export type Validations = {
  [key: string]: (value: string) => string
}

export type SnackbarOptions = {
  severity: string
  message: string
  duration?: number
}

export type UserResponse = {
  id: number
  userName: string
  email: string
  password: string
}
