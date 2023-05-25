import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { IComment } from "../../interfaces/IComment";
import { createComment } from "../../services/comment.service";
import "./styles.css";

Modal.setAppElement("#root");

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comentList: Array<object>;
  momentId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comentList,
  momentId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>({});
  const [comments, setComments] = useState(comentList);

  const onSubmit: SubmitHandler<IComment> = async (info) => {
    const { data } = await createComment(momentId, info);
    setComments([...comments, data]);
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal de Comentários"
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Comentar: </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        <textarea
          className="modal-comment-input"
          {...register("content", { required: "Este campo é obrigatório" })}
          placeholder="Digite seu comentário"
        ></textarea>
        <span>{errors.content && errors.content.message}</span>
        <div className="buttons">
          <button type="submit">Publicar</button>
          <button type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </form>
      <div className="modal-comment-container">
        {comments?.map((coment: any) => (
          <li key={coment.id}>
            <div>
              <p>{coment.content}</p>
              <p>{coment.userId}</p>
            </div>
          </li>
        ))}
      </div>
    </Modal>
  );
};

export default CommentModal;
