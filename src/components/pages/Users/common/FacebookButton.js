// Dependencies
import FacebookLogin from 'react-facebook-login'

export const FacebookButton = ({ responseFacebook }) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      callback={responseFacebook}
      cssClass="button-submit facebook-button"
      textButton={<span>Login with Facebook</span>}
      icon="fa-facebook"
    />
  )
}
