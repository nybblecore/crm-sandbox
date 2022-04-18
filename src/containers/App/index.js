import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { root, utils, cordova } from 'sq-core/web';

import templates from '../../templates';
import routes from '../../ui-routes';
import ErrorBoundry from '../ErrorBoundry';

import BaseContainer from '../BaseContainer';
import './app.scss';

const { Snackbar, Dialog, Progress } = root;
const {
  redirect: { setCustomHandlers }
} = utils;
const { isApp } = cordova;

@inject('userStore', 'commonStore', 'authStore')
@withRouter
@observer
class SandboxApp extends BaseContainer {
  constructor() {
    super();
    this.handlePopupRedirect = this.handlePopupRedirect.bind(this);
  }

  async componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.commonStore.showScreen && this.props.commonStore.closeScreen();
      this.props.commonStore.setAppLoaded();
    });
    this.props.commonStore.setAppLoaded();
    setCustomHandlers({
      popup: this.handlePopupRedirect
    });
  }

  handlePopupRedirect(screen, params, options) {
    this.props.commonStore.openScreen(screen, params.title, {}, params);
  }

  render() {
    const { location, ...rest } = this.props;
    const userData = {
      loggedIn: !!this.props.userStore.currentUser
    };
    const { screenName } = this.props.commonStore;
    const RouterComponent = routes[screenName] && routes[screenName].container;
    const { ...Routerprops } = routes[screenName] || {};
    if (this.props.commonStore.appLoaded) {
      return (
        <React.Fragment>
          {!RouterComponent && this.props.commonStore.isLoading && <Progress style="fixed" />}
          <Snackbar
            open={this.props.commonStore.showNotification}
            anchorOrigin={{
              vertical: isApp() ? 'bottom' : 'top'
            }}
            message={this.props.commonStore.notificationMessage}
            onClose={() => this.props.commonStore.closeNotify()}
            severity={this.props.commonStore.notificationType}
          />
          <Dialog
            open={this.props.commonStore.showPopup}
            classes={{
              body: 'sq-dialog__content-body--auto'
            }}
            closeButton={false}
            style="ios"
            content={this.props.commonStore.popupMessage}
            title={this.props.commonStore.popupTitle}
            actions={this.props.commonStore.popupActions || [{ buttonText: 'Ok', actionType: 'close' }]}
            onClose={() => this.props.commonStore.closePopup()}
            onAction={() => this.props.commonStore.closePopup()}
            severity={this.props.commonStore.popupType}
          />
          {RouterComponent && (
            <Dialog
              open={this.props.commonStore.showScreen}
              style="ios"
              isLoading={this.props.commonStore.isLoading}
              fullScreen={this.props.commonStore.breakpointDown('sm')}
              content={
                <ErrorBoundry>
                  <RouterComponent
                    key={`dialog-${screenName}`}
                    dataPacket={{
                      ...userData,
                      hasDialog: true
                    }}
                    {...this.props}
                    {...Routerprops}
                    events={this.props.commonStore.screenEvents}
                    {...this.props.commonStore.screenProps}
                  />
                </ErrorBoundry>
              }
              title={this.props.commonStore.screenTitle}
              onClose={() => this.props.commonStore.closeScreen()}
              onAction={() => this.props.commonStore.closeScreen()}
            />
          )}
          <div className="sq-app__root">
            <div className="sq-app__main">
              <Switch>
                {Object.keys(routes).map((key, idx) => {
                  return (
                    <Route
                      key={key}
                      path={key}
                      render={(props) => {
                        let Compn;
                        let Template = '';
                        const { container, template, ...restProps } = routes[key] || {};
                        if (typeof routes[key] === 'object' && routes[key].container) {
                          Compn = routes[key].container;
                        }
                        if (routes[key].template && templates[routes[key].template]) {
                          Template = templates[routes[key].template];
                        } else {
                          Template = templates['default'];
                        }
                        return (
                          <Template {...rest} {...restProps} routeName={key}>
                            <ErrorBoundry>
                              <Compn dataPacket={{ ...userData }} key={`route-${idx}`} {...rest} {...props} {...restProps} routeName={key} />
                            </ErrorBoundry>
                          </Template>
                        );
                      }}
                    />
                  );
                })}
                <Redirect from="/" to={'/content/en/home'} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Progress />
        </React.Fragment>
      );
    }
  }
}

SandboxApp.propTypes = {
  userStore: PropTypes.object,
  commonStore: PropTypes.object,
  authStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default SandboxApp;
