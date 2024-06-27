import './ErrorPage.scss';


function Error({errorText}: any){
      console.log(errorText, 'errorText')
    return (
    <div className="error-wrapper">
    <div className="error-content">
        <h1 className="error-content__header">Error</h1>
        <p className="error-content__text">{errorText}</p>
    </div>
    </div>)
}

export default Error;