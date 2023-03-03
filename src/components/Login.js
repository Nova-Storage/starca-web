import './Login.css';



function Login(props) {
  
  function handleSubmit(){
    //TODO: Call server to check if user exists and retreive user
    props.authenticated();
  }
  
  return (
      <div>
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="text" name="name" />
            </label>
            <label>
              Password:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Login" />
          </form>
      </div>);
}

export default Login;