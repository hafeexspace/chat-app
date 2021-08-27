const { useState } = require("react");
const supabase = require("../utils/supabase");

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordhange(event) {
    setPassword(event.target.value);
  }

  function handleSignIn(event) {
    event.preventDefault();
    supabase.auth
      .signIn({ email: email, password: password })
      .then(function (data) {
        console.log(data);
      });
  }

  function handleSignUp(event) {
    event.preventDefault();
    supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then(function (data) {
        console.log(data);
      });
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordhange}
        />
        <input type="submit" value="Log in" onClick={handleSignIn} />
        <input type="submit" value="Sign Up" onClick={handleSignUp} />
      </form>
    </div>
  );
}

module.exports = SignUp;
