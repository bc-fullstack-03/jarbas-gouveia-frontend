import React, { useEffect, useState } from "react";
import UserCard from "../../components/userCard";
import { IUser } from "../../interfaces/IUser";
import { getUserNotFollowed } from "../../services/user.service";
import "./style.css";

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { token } = JSON.parse(localStorage.getItem("token") || "null");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data, status } = await getUserNotFollowed(token);
        if (status === 200) {
          setUsers(data);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="users-container">
      <div className="users-title">
        <h1>Descubra quem compartilha momentos</h1>
      </div>
      <div className="users-list-container">
        <ul>
          {
            users?.length ? users?.map((user) => <UserCard key={user.id} {...user} />) : <h2 className="user-list-empty">Nenhum usuário disponível encontrado</h2>
          }
        </ul>
      </div>
    </div>
  );
};

export default Users;
