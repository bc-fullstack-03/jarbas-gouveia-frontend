import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormData } from '../../types/FormData';

const MomentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const previewImage = document.getElementById('previewImage') as HTMLImageElement;
      if (previewImage) {
        previewImage.src = event.target?.result as string;
      }
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Título</label>
        <input {...register('title', { required: true })} type="text" />
        {errors.title && <span>O campo título é obrigatório.</span>}
      </div>
      <div>
        <label>Legenda</label>
        <input {...register('caption')} type="text" />
      </div>
      <div>
        <label>Foto</label>
        <input
          {...register('photo', {
            validate: (value) => value && value.length > 0,
          })}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {errors.photo && <span>O campo foto é obrigatório.</span>}
      </div>
      <div>
        <img id="previewImage" alt="Preview" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MomentForm;
