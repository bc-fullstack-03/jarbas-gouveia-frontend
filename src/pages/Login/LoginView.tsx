import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import { login } from "../../services/authentication.service";
import { LoginData } from "../../types/LoginData";
import "./style.css";

const LoginView: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();

  const redirect = useNavigate();

  const onSubmit: SubmitHandler<LoginData> = async ({ email, password }: LoginData) => {
    try {
      const { data } = await login(email, password);
      localStorage.setItem("token", JSON.stringify(data));
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-slogan">
          <h1>Moments</h1>
          <h3>Aprecie sem pressão</h3>
          <p>
            Em vez de incentivar o excesso de publicações que colocam pressão na
            busca pela validação dos outros, nosso desejo é promover a
            apreciação de cada <span>momento</span> que represente o melhor - ou
            o pior - do seu dia.
          </p>
        </div>
        <div className="login-form-wrapper">
          <img src={logo} alt="Moments Logo" />
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
              placeholder="Seu email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              placeholder="Sua senha"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input type="submit" value="Apreciar" />
          </form>

          <div className="register-wrapper">
            <p>Ainda não tem uma conta?</p>
            <a href="/cadastrar">Cadastre-se</a>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <p>© 2021 Moments. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default LoginView;
