import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { IUpdateProfile } from "../../interfaces/IUpdateProfile";
import { updateProfile } from "../../services/profile.service";
import "./styles.css";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: IUpdateProfile;
}

const EditProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateProfile>({
    defaultValues: initialData,
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<IUpdateProfile> = async (data) => {
    const { token } = JSON.parse(localStorage.getItem("token") || "{}");
    const { status } = await updateProfile(token, data);

    if (status === 200) {
      alert("Perfil atualizado com sucesso!");
    }


  };


  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePicturePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  const handleSubmitForm = (data: IUpdateProfile) => {
    const { image, ...profileData } = data;
    onSubmit({ ...profileData, image: image || initialData.image });
    onClose();
    location.reload();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      border: 'none',
      height: 'fit-content',
      borderRadius: '4px',
      maxWidth: '90%',
      margin: '0 auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div className="modal-container">
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Perfil"
      style={customStyles}
    >
      <h2>Editar Perfil</h2>
      <div className="update-form-container">
        <form onSubmit={handleSubmit(handleSubmitForm)} encType="multipart/form-data" >
          <div className="update-form-photo-preview-container">
            {!profilePicturePreview ? (
              <div className="thumb-photo-preview"></div>
            ) : (
              <img
                src={profilePicturePreview || initialData.image}
                alt="Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>
          <div className="form-inputs-container">
            <div className="update-form-input-wrapper">
              <label>
                Nome:
                <input
                  type="text"
                  {...register("name", { required: "Campo obrigatório" })}
                />
                {errors.name && <span>{errors.name.message}</span>}
              </label>
            </div>
            <div className="update-form-input-wrapper">
              <label>
                Bio:
                <textarea {...register("bio", { required: "Campo obrigatório" })} />
              </label>
            </div>
            <div className="update-form-input-wrapper-double">
              <label>
                Localização:
                <input type="text" {...register("location", { required: "Campo obrigatório" })} />
              </label>
              <label>
                Aniversário:
                <input type="text" {...register("birthday", {
                  required: "Campo obrigatório",
                })} />
              </label>
            </div>
            <div className="update-form-input-wrapper">
              <label>
                Website:
                <input type="text" {...register("website", { required: "Campo obrigatório" })} />
              </label>
            </div>

            <div className="update-form-input-wrapper">
              <label>
                Foto de Perfil:
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
            </div>
          </div>

          <button className="save-btn-update-profile" type="submit">Salvar</button>
        </form>
      </div>
      <button className="close-btn-update-profile" onClick={onClose}>Fechar</button>
    </Modal>
    </div>
  );
};

export default EditProfileModal;
