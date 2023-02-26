import './Login.css';

function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
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