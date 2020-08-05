export interface SnackbarProviderValue {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {string} [type] the type of massage you want to show
   * @param {string} [variant]  variants are available – outlined, and filled:
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   */
  showMessage(
    message: string,
    action?: string,
    handleAction?: () => void,
    customParameters?: any,
    type: string,
    variant: string
  );
}

declare const SnackbarContext: React.Context<SnackbarProviderValue>;
export default SnackbarContext;
