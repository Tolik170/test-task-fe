export const styles = {
  titleWithDescription: {
    container: {
      textAlign: 'center'
    },
    title: {
      typography: 'h4'
    }
  },
  userInfo: {
    display: 'flex', 
    columnGap: 2, 
    alignItems: 'center',
    mt: 10
  },
  avatar: {
    backgroundColor: 'primary.700'
  },
  inputContainer: {
    display: 'flex', 
    alignItems: 'start', 
    columnGap: 2, 
    mt: 3
  },
  input: {
    maxWidth: '300px', 
    width: '100%'
  },
  messagesContainer: {
    mb: 3, 
    display: 'flex', 
    columnGap: 3 
  },
  messageInfo: {
    title: {
      color: 'primary.900',
      typography: 'subtitle1'
    },
    description: {
      color: 'primary.500',
      typography: 'subtitle2',
      fontSize: '16px'
    }
  },
  shiftInput: {
    maxWidth: '100px', 
    width: '100%'
  },
  addBtn: {
    minWidth: '142px',
    maxHeight: '32px',
    textTransform: 'initial'
  },
  encryptBtn: {
    color: 'primary.500',
    cursor: 'pointer',
    fontWeight: 600,
    userSelect: 'none'
  }
}
