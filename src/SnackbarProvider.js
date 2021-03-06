import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import SnackbarContext from "./SnackbarContext";
import Alert from "@material-ui/lab/Alert";

function DefaultSnackbar({
  message,
  type,
  variant,
  action,
  ButtonProps,
  SnackbarProps,
  customParameters,
}) {
  return (
    <Snackbar
      {...SnackbarProps}
      action={
        action != null && (
          <Button color="secondary" size="small" {...ButtonProps}>
            {action}
          </Button>
        )
      }
    >
      <Alert severity={type} variant={variant}>
        {message || ""}
      </Alert>
    </Snackbar>
  );
}

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false,
  };

  constructor(props) {
    super(props);
    this.contextValue = {
      showMessage: this.showMessage,
    };
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [type] the type of massage you want to show
   * @param {string} [variant]  variants are available – outlined, and filled:
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   * @public
   */
  showMessage = (
    message,
    type,
    variant,
    action,
    handleAction,
    customParameters
  ) => {
    this.setState({
      open: true,
      message,
      type,
      variant,
      action,
      handleAction,
      customParameters,
    });
  };

  handleActionClick = () => {
    this.handleClose();
    this.state.handleAction();
  };

  handleClose = () => {
    this.setState({ open: false, handleAction: null });
  };

  render() {
    const {
      action,
      message,
      type,
      variant,
      open,
      customParameters,
    } = this.state;

    const {
      ButtonProps = {},
      children,
      SnackbarProps = {},
      SnackbarComponent = DefaultSnackbar,
    } = this.props;

    return (
      <>
        <SnackbarContext.Provider value={this.contextValue}>
          {children}
        </SnackbarContext.Provider>
        <SnackbarComponent
          message={message}
          type={type}
          variant={variant}
          action={action}
          ButtonProps={{ ...ButtonProps, onClick: this.handleActionClick }}
          SnackbarProps={{ ...SnackbarProps, open, onClose: this.handleClose }}
          customParameters={customParameters}
        />
      </>
    );
  }
}

SnackbarProvider.propTypes = {
  /**
   * Props to pass through to the action button.
   */
  ButtonProps: PropTypes.object,
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Custom snackbar component.
   * Props: open, message, action, ButtonProps, SnackbarProps
   */
  SnackbarComponent: PropTypes.elementType,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object,
};
