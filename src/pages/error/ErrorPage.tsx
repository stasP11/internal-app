import './ErrorPage.scss';
import { useMsal } from "@azure/msal-react";

function Error({errorText}: any){
    const { accounts, inProgress, instance } = useMsal();

    const handleLogoutRedirect = () => {
      console.log('logout')
      instance.logoutRedirect().catch((error) => console.log(error));
    };

    return (
    <div className="error-wrapper">
    <div className="error-content">
        <h1 className="error-content__header">Error</h1>
        <p className="error-content__text">{errorText}</p>
        <button className="error-content__button" onClick={handleLogoutRedirect}>
        <span className='error-content__button-text'
        >Sign Out</span></button>
    </div>
    </div>)
}

export default Error;