import axios from "axios";
import {
  loginConfirmedAction,
  logout,
} from '../store/actions/AuthActions';

const API_URL = "https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/";

const register = (name, medium, emailOrPhone, password, role) => {
  return axios.post(API_URL + "signup", {
    name,
    medium,
    emailOrPhone,
    password,
    role,
  });
};

export function login  (medium, emailOrPhone, password)  {

   const postData = {
      medium,
      emailOrPhone,
      password,
      returnSecureToken:true,
    };
    return axios.post(
      'https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signin', postData,
    );

}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
      new Date().getTime() + tokenDetails.expiresIn * 1000,
  );
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
      dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('userDetails');
  let tokenDetails = '';
  if (!tokenDetailsString) {
      dispatch(logout(history));
      return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
      dispatch(logout(history));
      return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, history);
}


export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
      case 'EMAIL_EXISTS':
          return 'Email already exists';

      case 'EMAIL_NOT_FOUND':
          return 'Email not found';
      case 'INVALID_PASSWORD':
          return 'Invalid Password';
      case 'USER_DISABLED':
          return 'User Disabled';

      default:
          return '';
  }
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm-signup/" + code).then((response) => {
    return response.data;
  });
};

const confirmationCodeValidity = (medium, emailOrPhone) => {
  return axios.post(API_URL + 'get-confirmation-code-validity', {
    medium,
    emailOrPhone

  })
}

const resendConfirmationCode = (medium, emailOrPhone) => {
  return axios.post(API_URL + 'resend-confirmation-code', {
    medium,
    emailOrPhone

  })
}

const confirmSignup = (medium, emailOrPhone, confirmationCode) => {
  return axios.post(API_URL + 'confirm-signup', {
    medium,
    emailOrPhone,
    confirmationCode
  })
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
  confirmationCodeValidity,
  resendConfirmationCode,
  confirmSignup
};
