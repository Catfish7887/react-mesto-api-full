import { useState } from "react";

function Login({ onSubmit }) {

  const [values, setValues] = useState({});

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });

  };

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      email: values.email,
      password: values.password
    })

  }

  return (
    <section className="authorization">
      <h2 className="authorization__header">Вход</h2>
      <form onSubmit={handleSubmit} className="popup__form" name="login">
        <input onChange={handleChange} name='email' className="popup__input popup__input_white" placeholder="Email" type="email" />
        <input onChange={handleChange} name='password' className="popup__input popup__input_white" placeholder="Пароль" type="password" />
        <button type="submit" className="popup__submit-btn popup__submit-btn_white">Войти</button>
      </form>

    </section>
  )
}

export default Login