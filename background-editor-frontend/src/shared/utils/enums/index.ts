enum EModalKeys {
  MODAL_REGISTER = 'register-modal',
  MODAL_LOGIN = 'login-modal',
  MODAL_RECOVER_PASSWORD = 'recover-password-modal',
  MODAL_RECOVER_PASSWORD_LETTER = 'recover-password-modal-letter',
  MODAL_RESET_PASSWORD = 'reset-password-modal',
  MODAL_RESET_PASSWORD_SUCCESS = 'reset-password-success-modal',

  MODAL_UPLOAD_FILES = 'upload-files-modal',
  MODAL_UPLOAD_FILES_PREVIEW = 'upload-files-modal-preview',

  MODAL_CHANGE_EMAIL = 'modal-change-email',
  MODAL_CHANGE_PASSWORD = 'modal-change-password'
}

enum ECookieValues {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  NEXT_LOCALE = 'NEXT_LOCALE'
}

enum EQueryValues {
  GET_ME = 'GET_ME',
  REFRESH_TOKEN = 'REFRESH_TOKEN',

  GET_WORKING_AREA = 'GET_WORKING_AREA',
  UPDATE_WORKING_AREA = 'UPDATE_WORKING_AREA',

  URL_TO_FILE = 'URL_TO_FILE',

  ML_REMOVE_BG = 'ML_REMOVE_BG',
  ML_REPLACE_BG = 'ML_REPLACE_BG',

  GET_HISTORY = 'GET_HISTORY'
}

export { EModalKeys, ECookieValues, EQueryValues };
