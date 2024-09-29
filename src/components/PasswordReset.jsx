const PasswordReset = () => {
  return (
    <div className="app__login">
      <form action="" className="app__form">
        <p>
          If the email provided below is in our record, password reset link will
          be provided.
        </p>
        <div className="app__input-container">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="app__action">
          <button>Send Me A link</button>
          <button>Cancel</button>
        </div>
        <div className="app__input-container"></div>
        <div className="app__input-container"></div>
      </form>
    </div>
  );
};

export default PasswordReset;
