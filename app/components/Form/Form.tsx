import { useRef, useState } from 'react';
import TextArea from '../TextArea';
import Input from '../Input';
import Select from 'react-select';
import UploadFile from '../UploadFile';
import Checkbox from '../Checkbox';
import { Controller, useForm } from 'react-hook-form';
import Attachment from '../Attachment';
import { omit } from 'lodash';
import axios from 'axios';

const uploads = [
  {
    label: 'Tải lên hình ảnh sản phẩm(hình chính)',
    name: 'mainImage',
  },
  {
    name: 'secondImage',
    label:
      'Tải lên hình ảnh sản phẩm(hình phụ hiển thị trong chi tiết từng sản phẩm)',
  },
];

export default function Example() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState<Record<string, File>>({});

  const onSubmit = (data) => {
    console.log(data);
  };

  const onUpload = async (file: File, name: string) => {
    const response = axios.post(
      'api/google',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response);
    setImages((images) => ({
      ...images,
      [name]: file,
    }));
  };

  const onRemoveImage = (name: string): void => {
    setImages(omit(images, name));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <Input
                  register={register}
                  label="Tên sản phẩm"
                  name="title"
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <Input
                  register={register}
                  label="Đường dẫn sản phẩm"
                  name="slug"
                  rules={{ pattern: /^[a-z]+(-[a-z]+)*$/ }}
                  errors={errors}
                />
              </div>
              {uploads.map((item) => (
                <div className="col-span-full" key={item.name}>
                  <UploadFile
                    label={item.label}
                    name={item.name}
                    onUpload={onUpload}
                  />
                  {images[item.name] && (
                    <Attachment
                      file={images[item.name]}
                      onRemove={() => onRemoveImage(item.name)}
                    />
                  )}
                </div>
              ))}

              <div className="col-span-full">
                <Input
                  register={register}
                  label="Giá sản phẩm"
                  name="price"
                  type="number"
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <TextArea
                  register={register}
                  label="Mô tả sơ lược sản phẩm"
                  name="description"
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <TextArea
                  register={register}
                  label="Các điểm nổi bật sản phẩm"
                  name="highlights"
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <TextArea
                  register={register}
                  label="Mô tả chi tiết sản phẩm"
                  name="descriptionDetail"
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chọn sizes sản phẩm
                </label>
                <Controller
                  name="sizes"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isMulti
                      placeholder="Chọn size"
                      closeMenuOnSelect={false}
                      value={[
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' },
                      ].find((a) => a.value === value)}
                      options={[
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' },
                      ]}
                      onChange={(data) => {
                        onChange(data.map((item) => item.value));
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-full">
                <Checkbox
                  register={register}
                  label="Công khai sản phẩm"
                  name="isPublish"
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
