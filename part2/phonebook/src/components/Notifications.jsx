const Notification = ({ message }) => {
    if (message === '') {
      return null
    }
  
    const mstyle = {
        textAlign: 'center',
        border: '2px solid green',
        fontWeight: 'bold',
        fontSize: 16,
        // padding: '10px', 
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        color: 'green'
      };

    return (
      <div className="error" style={mstyle}>
        <p>{message}</p>
      </div>
    )
  }
  
  export default Notification