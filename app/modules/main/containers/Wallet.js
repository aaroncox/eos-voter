// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Dimmer, Header, Image, Loader, Segment } from 'semantic-ui-react';

import ContentContainer from './Content';
import MenuContainer from './Menu';
import SidebarContainer from './Sidebar';
import Notifications from '../../../shared/components/Notifications';
import WelcomeContainer from '../../../shared/containers/Welcome';
import { setWalletMode } from '../../../shared/actions/wallet';
import * as ValidateActions from '../../../shared/actions/validate';

import background from '../../../renderer/assets/images/geometric-background.svg';

class WalletContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { actions, connectionStatus, settings } = props;
    if (connectionStatus !== 'SUCCESS' && settings.node) {
      const { validateNode } = actions;
      validateNode(settings.node, settings.chainId, false, true);
      this.state = { initialized: false };
    }
    if (settings.walletInit && settings.walletMode) {
      actions.setWalletMode(settings.walletMode);
    }
  }
  state = { initialized: true };
  componentDidUpdate(prevProps) {
    if (
      !this.state.initialized
      && this.props.connectionStatus !== prevProps.connectionStatus
      && this.props.connectionStatus === 'SUCCESS'
    ) {
      this.setState({ initialized: true });
    }
  }
  render() {
    const {
      settings,
    } = this.props;
    const {
      initialized
    } = this.state;
    // if (!settings.walletInit) {
    //   return (
    //     <WelcomeContainer />
    //   )
    // }
    if (!initialized) {
      return (
        <span>Loading...</span>
      )
    }
    // <React.Fragment>
    //   <div
    //     style={{
    //       zIndex: 1002,
    //       position: 'fixed',
    //       top: 0,
    //       left: 0,
    //       WebkitBoxFlex: 0,
    //     }}
    //   >
    //   </div>
    //   <div
    //     id="test-test"
    //     style={{
    //       flex: '1 1 auto',
    //       WebkitBoxFlex: 1,
    //       paddingTop: '61px',
    //       paddingLeft: '107px'
    //     }}
    //   >
        <Segment basic>
        </Segment>
    //     <MenuContainer />
    //   </div>
    //   <Image
    //     fluid
    //     src={background}
    //     style={{
    //       bottom: 0,
    //       // top: 50,
    //       // transform: 'rotate(0.5turn)',
    //       right: '-1em',
    //       opacity: 0.5,
    //       position: 'fixed',
    //       zIndex: -1
    //     }}
    //   />
    // </React.Fragment>
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'stretch',
        alignItems: 'flex-start',
      }}>
        <div style={{
          flex: '0 1 auto',
          position: 'sticky',
          top: 0,
        }}>
          <SidebarContainer />
        </div>
        <div style={{
          flex: '1 1 auto',
        }}>
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 999
          }}>
            <MenuContainer />
          </div>
          <div style={{
            padding: '1.25em'
          }}>
            <ContentContainer />
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    connectionStatus: state.validate.NODE,
    settings: state.settings,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setWalletMode,
      ...ValidateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));
