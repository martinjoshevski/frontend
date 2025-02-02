import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import HomeSettings from '../HomeSettings';
import MyTrades from '../MyTrades';
import { AuthenticationActions } from 'store/actions/authentication';
import { GeneralActions } from 'store/actions/general';
import EmailNotifications from 'components/EmailNotifications';
import Preferences from 'components/Preferences';
import Referrals from 'components/Referrals';

const MainMenu = ({
  opened,
  user,
  updateUser,
  setEditVisible,
  handleMyTradesVisible,
  handleEmailNotificationsVisible,
  handlePreferencesVisible,
  handleReferralsVisible,
  editVisible,
  myTradesVisible,
  emailNotificationsVisible,
  preferencesVisible,
  referralsVisible,
  close,
  updateNotificationSettings,
  fetchReferrals,
}) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePicture);

  const profilePictureRefName = useRef(null);

  useEffect(() => {
    setProfilePic(user.profilePicture);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const clickUploadProfilePicture = () => {
    profilePictureRefName.current?.click();
  };

  const history = useHistory();

  const onClickGoToRoute = destinationRoute => {
    history.push(destinationRoute);
  };

  const onClickShowEditProfile = () => {
    setEditVisible(!editVisible);
  };

  const onMyWalletClick = name => {
    // fetchOpenBets();
    // fetchTransactions();
    // setOpenDrawer(name);
    // handleMyTradesVisible(!myTradesVisible);
    fetchReferrals();
    // setOpenMenu(menus.referrals);
  };

  const onEmailNotificationClick = () => {
    handleEmailNotificationsVisible(!emailNotificationsVisible);
  };

  const onPreferencesClick = () => {
    handlePreferencesVisible(!preferencesVisible);
  };

  const onReferralsClick = () => {
    handleReferralsVisible(!referralsVisible);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(name, username, email, profilePic);
    setEditVisible(false);
  };

  const handleProfilePictureUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setProfilePic(base64);
  };

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  const renderMyTradesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !myTradesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleMyTradesVisible(!myTradesVisible)}
          />
          My Trades
        </h2>

        <MyTrades close={close} />
      </div>
    );
  };

  const renderEmailNotificationDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !emailNotificationsVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() =>
              handleEmailNotificationsVisible(!emailNotificationsVisible)
            }
          />
          Email Notification
        </h2>

        <EmailNotifications
          close={close}
          updateNotificationSettings={updateNotificationSettings}
          settings={user.notificationSettings}
        />
      </div>
    );
  };

  const renderPreferencesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !preferencesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handlePreferencesVisible(!preferencesVisible)}
          />
          Preferences
        </h2>

        <Preferences close={close} />
      </div>
    );
  };

  const renderReferralsDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !referralsVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleReferralsVisible(!referralsVisible)}
          />
          Referrals
        </h2>

        <Referrals close={close} />
      </div>
    );
  };

  const editProfileWrapper = () => {
    return (
      <div
        className={classNames(styles.panel, !editVisible && styles.panelHidden)}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => setEditVisible(!editVisible)}
          />
          Edit My Profile
        </h2>
        <div className={styles.editProfileContent}>
          <div className={styles.profilePictureWrapper}>
            <div className={styles.profilePicture}>
              <div
                className={styles.profilePictureUpload}
                onClick={clickUploadProfilePicture}
              >
                {!profilePic ? (
                  <div className={styles.iconContainer}>
                    <Icon
                      className={styles.uploadIcon}
                      iconTheme={IconTheme.white}
                      iconType={IconType.avatarUpload}
                    />
                  </div>
                ) : (
                  <img
                    src={profilePic}
                    className={styles.profileImage}
                    alt="profile pic"
                  />
                )}
                <input
                  ref={profilePictureRefName}
                  type={'file'}
                  accept={'image/*'}
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureUpload}
                />
              </div>
              <p className={styles.profilePictureUploadLabel}>Your avatar</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.profileContent}>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  My Name is...
                </label>
                <input
                  className={styles.profileInput}
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  But you can call me...
                </label>
                <input
                  className={styles.profileInput}
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>E-Mail</label>
                <input
                  className={styles.profileInput}
                  disabled
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <input
                className={styles.profileSubmit}
                type={'submit'}
                value={'Save changes'}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(styles.menu, opened ? styles.menuOpened : null)}>
      <div
        className={classNames(
          styles.panel,
          styles.firstPanel,
          (myTradesVisible ||
            editVisible ||
            emailNotificationsVisible ||
            preferencesVisible ||
            referralsVisible) &&
            styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>My Profile</h2>
        <div className={styles.mainContent}>
          <HomeSettings
            onEditClick={() => onClickShowEditProfile()}
            onReferralsClick={() => onReferralsClick()}
            onEmailNotificationClick={() => onEmailNotificationClick()}
            onPreferencesClick={() => onPreferencesClick()}
            onLogoutClick={() => onClickGoToRoute(Routes.logout)}
            onCloseProfile={() => close()}
          />
        </div>
      </div>
      {editProfileWrapper()}
      {renderMyTradesDrawer()}
      {renderReferralsDrawer()}
      {renderEmailNotificationDrawer()}
      {renderPreferencesDrawer()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    editVisible: state.general.editProfileVisible,
    myTradesVisible: state.general.myTradesVisible,
    emailNotificationsVisible: state.general.emailNotificationsVisible,
    preferencesVisible: state.general.preferencesVisible,
    referralsVisible: state.general.referralsVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, username, email, profilePicture) => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { name, username, email, profilePicture },
        })
      );
    },
    updateNotificationSettings: notificationSettings => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { notificationSettings },
        })
      );
    },
    setEditVisible: bool => {
      dispatch(GeneralActions.setEditProfileVisible(bool));
    },
    handleMyTradesVisible: bool => {
      dispatch(GeneralActions.setMyTradesVisible(bool));
    },
    handleEmailNotificationsVisible: bool => {
      dispatch(GeneralActions.setEmailNotificationsVisible(bool));
    },
    handlePreferencesVisible: bool => {
      dispatch(GeneralActions.setPreferencesVisible(bool));
    },
    handleReferralsVisible: bool => {
      dispatch(GeneralActions.setReferralsVisible(bool));
    },
    fetchReferrals: () => {
      dispatch(AuthenticationActions.fetchReferrals());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
