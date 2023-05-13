import { useForm } from "react-hook-form";
import logo from "../../assets/moments.png";
import "./style.css";

export default function LoginView() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => console.log(data);
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
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName?.type === "required" && (
              <p role="alert">First name is required</p>
            )}

            <input
              placeholder="Sua senha"
              {...register("mail", { required: "Email Address is required" })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {errors.mail && <p role="alert">{errors.mail?.message}</p>}
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
