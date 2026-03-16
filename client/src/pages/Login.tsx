function Login() {
  return (
    <form action="">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
    </form>
  );
}

export default Login;
