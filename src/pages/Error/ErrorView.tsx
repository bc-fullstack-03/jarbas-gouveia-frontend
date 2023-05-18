import Header from "../../components/header/Header";

export default function ErrorPage({ error }: any) {
  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Oops! Algo deu errado.</h1>
        <p>
          Erro: {error.statusText == "Not Found" && "Página não encontrada"}.
        </p>
        <p>Status: {error.status}</p>
      </div>
    </>
  );
}
