import { UserResponse, SnackbarOptions } from '../common.index'

export interface SnackBarContextInterface {
  setAlert: (options: SnackbarOptions) => void
}

export interface AuthContextInterface {
  currentUser: UserResponse | null;
  setCurrentUser: (user: UserResponse | null) => void;
}
