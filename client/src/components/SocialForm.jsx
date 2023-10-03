import React, { memo, useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { BsFacebook } from "../utils/icon";
import { gapi } from "gapi-script";
import {
  authSelect,
  socialLoginThunkAction,
} from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const SocialForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authSelect);

  const onSuccess = async (response) => {
    try {
      if (!response.profileObj && !response.accessToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const data = response.profileObj || response;
      const user = {
        displayName: data.name || `${data.familyName} ${data.givenName}`,
        email: data.email,
        avatar: data.imageUrl,
      };

      if (data.googleId) user.googleId = data.googleId;
      if (data.userID) user.facebookId = data.userID;

      const res = await dispatch(socialLoginThunkAction(user));
      if (res && res.payload && res.payload.success) {
        toast.success("Đăng nhập thành công !");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onFailure = (res) => {
    setIsLoading(false);
  };

  const onRequest = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "profile",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Continue with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        onRequest={onRequest}
        cookiePolicy={"single_host_origin"}
        className="w-full shadow-md rounded-full overflow-hidden flex items-center justify-center"
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad
        buttonText="Log in with Google"
        fields="name,email,picture"
        onClick={onRequest}
        callback={onSuccess}
        render={(renderProps) => (
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full bg-blue-700 shadow-md w-full py-[9px]"
            onClick={renderProps.onClick}
          >
            <span className="text-white">
              <BsFacebook size={24} />
            </span>
            <span className="text-sm text-white font-semibold">
              Continue with Facebook
            </span>
          </button>
        )}
      />
    </div>
  );
};

export default memo(SocialForm);
