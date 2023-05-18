import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createMoment } from "../../services/moment.service";
import { MomentFornData } from "../../types/MomentFormData";
import "./style.css";

const MomentForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<MomentFornData>();

  const onSubmit: SubmitHandler<MomentFornData> = async (data) => {
    const { token } = JSON.parse(localStorage.getItem("token") || "{}");
    await createMoment(token, data);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | undefined>(
    undefined
  );

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setValue("photo", file);
    }
  };

  return (
    <div className="new-moment-container">
      <h1>Compartilhe um momento!</h1>
      <div className="form-data-container">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-entries">
            <div className="form-group">
              <label>Título</label>
              <input {...register("title")} type="text" required />
            </div>
            <div className="form-group">
              <label>Legenda</label>
              <textarea
                {...register("caption")}
                placeholder="🗯️"
                maxLength={512}
              />
            </div>
            <div className="form-group">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <div className="cta-share-moment-container">
              <button type="submit">Compartilhar o momento!</button>
            </div>
          </div>
        </form>
        <div>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentForm;
