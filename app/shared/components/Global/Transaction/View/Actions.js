// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Header } from 'semantic-ui-react';

import GlobalTransactionViewAction from './Action';

export class GlobalTransactionViewActions extends Component<Props> {
  render() {
    const {
      actions,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header>
          {t('global_transaction_actions_details_title')}
          <Header.Subheader>
            {t('global_transaction_actions_details_content')}
          </Header.Subheader>
        </Header>
        {actions.map((action, idx) => (
          <GlobalTransactionViewAction
            action={action}
            key={idx}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default withTranslation('global')(GlobalTransactionViewActions);
