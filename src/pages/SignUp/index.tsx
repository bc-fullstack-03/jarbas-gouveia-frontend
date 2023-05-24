import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication.service";
import { signup } from "../../services/signup.service";
import { ISignUp } from "../../types/ISignUp";



const SignUp: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm<ISignUp>();

      const redirect = useNavigate();

      const onSubmit: SubmitHandler<ISignUp> = async ({ username, email, password }: ISignUp) => {
        try {
          const { status } = await signup(username, email, password);
            if (status === 201) {
                alert("Conta criada com sucesso!");
                const { data, status } = await login(email, password);

                if(status === 200) {
                    localStorage.setItem("token", JSON.stringify(data));
                    redirect("/create-profile");
                }

            } else {
                alert("Erro ao criar conta!");
            }
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <div className="signup-container">
            <div className="signup-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
              placeholder="Nome de usuário"
              {...register("username", {
                required: "O usuário é obrigatório",
                minLength: {
                    value: 3,
                    message: "O usuário deve ter no mínimo 3 caracteres",
                },
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && <p>{errors.username.message}</p>}
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
            <input type="submit" value="Criar usuário" />
          </form>
            </div>
        </div>

    )
}

export default SignUp;