const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage === '') {
      return null
    }
  
    const mstyle = {
        textAlign: 'center',
        border: '2px solid red',
        fontWeight: 'bold',
        fontSize: 16,
        // padding: '10px', 
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        color: 'red'
      };

    return (
      <div className="error" style={mstyle}>
        <p>{errorMessage}</p>
      </div>
    )
  }
  
  export default ErrorNotification