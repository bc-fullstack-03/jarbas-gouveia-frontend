import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import { login } from "../../services/authentication.service";
import "./style.css";

export default function LoginView() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const redirect = useNavigate();



  const onSubmit = (data: any) => {

    const t = async () => login(data.email, data.password);

    t().then((res) => {
      localStorage.setItem("token", JSON.stringify(res));
      return redirect("/");
    });

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
              onError={(e) => console.log(e)}
              placeholder="Seu email"
              {...register("email", {
                required: {
                  value: true,
                  message: "O email é obrigatório",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.email && errors.email.message}

            <input
              placeholder="Sua senha"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p>A senha é obrigatória</p>
            )}
            {errors.password?.type === "minLength" && (
              <p>A senha deve ter no mínimo 6 caracteres</p>
            )}
            <input type="submit" value="Apreciar" />
          </form>

          <div className="register-wrapper">
            <p>Ainda não tem uma conta?</p>
            <a href="/register">Cadastre-se</a>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <p>© 2021 Moments. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
