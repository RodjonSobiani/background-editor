interface IModalOptions {
  'register-modal': never;
  'login-modal': never;
  'recover-password-modal': never;
  'recover-password-modal-letter': never;
  'reset-password-modal': never;
  'reset-password-success-modal': never;
  'upload-files-modal': File[];
  'upload-files-modal-preview': {
    files: File[];
    successLabel?: string;
    handleSuccess?: (files: File[]) => void;
    handleClose?: () => void;
  };
  'modal-change-email': never;
  'modal-change-password': never;
}

export type { IModalOptions };
