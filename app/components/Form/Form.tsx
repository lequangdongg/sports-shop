'use client';
import { useEffect, useRef, useState } from 'react';
import TextArea from '../TextArea';
import Input from '../Input';
import Select from 'react-select';
import UploadFile from '../UploadFile';
import Checkbox from '../Checkbox';
import { Controller, useForm } from 'react-hook-form';
import Attachment from '../Attachment';
import { omit } from 'lodash';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { DataResponse, sizeProduct, typeProduct } from '@/utils/constants';
import { FormProducts, PaginationType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import ListCategory from '../ListCategory';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import {
  paginationCalculation,
  paginationGetItem,
} from '@/app/helpers/pagination';
import { getProducts } from '@/app/services/http';

const uploads = [
  {
    label: 'Tải lên hình ảnh sản phẩm(hình chính)',
    name: 'mainImage',
  },
];

export default function Form() {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormProducts>();
  const router = useRouter();
  const [images, setImages] = useState<Record<string, File>>({});
  const [data, setData] = useState<{
    products: string[];
    pagination: PaginationType;
  }>({
    products: [],
    pagination: {
      currentPage: 1,
      from: 1,
      lastPage: 0,
      perPage: 10,
      to: 10,
      total: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const imageId = useRef<string>('');
  const sizeRef = useRef<any>();
  const categoryRef = useRef<any>();

  const initialize = async (page = 1): Promise<void> => {
    try {
      setLoadingContent(true);
      const data = await getProducts();
      const products = paginationGetItem<string>(data, 10, page);
      const pagination = paginationCalculation(data.length, page);
      const result = {
        products: data,
        pagination,
      };
      setData(result);
    } catch (error) {
      //
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const onSubmit = async (data: FormProducts) => {
    setLoading(true);
    const { isPopular, sizes } = data;
    try {
      await onUpload(images['mainImage']);
      await axios.post(
        `api/sheet`,
        {
          ...data,
          price: +data.price,
          image: imageId.current,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          isPopular: +isPopular,
          sizes: sizes.join(', '),
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );
      toast.success('Thêm mới sản phẩm thành công', {
        duration: 4000,
        position: 'top-center',
      });
      reset({
        title: '',
        slug: '',
      });
      sizeRef.current.clearValue();
      categoryRef.current.clearValue();
      setImages({});
      initialize();
    } catch (error) {
      toast((error as any).message);
    } finally {
      setLoading(false);
      imageId.current = '';
    }
  };

  const onUpload = async (file: File): Promise<void> => {
    try {
      const response = await axios.post(
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
      imageId.current = response.data.id;
    } catch (error) {
      toast((error as any).message);
    }
  };

  const onRemoveImage = (name: string): void => {
    setImages(omit(images, name));
  };

  const onDelete = async (data: string, index: number) => {
    setLoadingContent(true);
    try {
      axios.delete('api/google', {
        params: {
          fileId: data[DataResponse.Image],
        },
      });
      await axios.delete(`api/sheet`, {
        params: {
          index,
        },
      });
      await initialize();
      toast.success('Xoá sản phẩm thành công', {
        duration: 4000,
        position: 'top-center',
      });
    } catch (error) {
      toast((error as any).message);
    } finally {
      setLoadingContent(false);
    }
  };

  const onChangePage = (page: number) => initialize(page);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative mt-10 mb-10 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {loadingContent && (
          <div className="absolute flex items-center justify-center w-full h-full top-0 z-50 left-0 bg-transparent">
            <Spinner />
          </div>
        )}
        {!!data.products.length && (
          <>
            <ListCategory data={data.products} onDelete={onDelete} />
            {/* <Pagination
              pagination={data.pagination}
              onChangePage={onChangePage}
            /> */}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <Input
                  register={register}
                  label="Tên sản phẩm"
                  name="title"
                  rules={{ required: true }}
                  errors={errors}
                />
              </div>
              <div className="col-span-full">
                <Input
                  register={register}
                  label="Đường dẫn sản phẩm lưu ý không dấu(ví dụ: https://sport.com/ao-dep-nè thì đừng dẫn là ao-dep-ne)"
                  name="slug"
                  rules={{
                    pattern: /^[a-zA-Z0-9-]+$/,
                    required: true,
                  }}
                  errors={errors}
                />
              </div>
              {uploads.map((item) => (
                <div className="col-span-full" key={item.name}>
                  <UploadFile
                    label={item.label}
                    name={item.name}
                    onUpload={(file: File, name: string) => {
                      setImages((images) => ({
                        ...images,
                        [name]: file,
                      }));
                    }}
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
                  rules={{ min: 0, valueAsNumber: true, required: true }}
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
                      ref={(ref) => {
                        sizeRef.current = ref;
                      }}
                      required
                      id="size"
                      placeholder="Chọn size"
                      isSearchable={false}
                      closeMenuOnSelect={false}
                      value={sizeProduct.find(
                        (size) => size.value === (value as unknown as string),
                      )}
                      options={sizeProduct}
                      onChange={(data) => {
                        onChange(data.map((item) => item.value));
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chọn loại sản phẩm
                </label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      id="category"
                      ref={(ref) => {
                        categoryRef.current = ref;
                      }}
                      required
                      isSearchable={false}
                      placeholder="Chọn loại"
                      value={typeProduct.find(
                        (product) =>
                          product.value === (value as unknown as string),
                      )}
                      options={typeProduct}
                      onChange={(data) => {
                        onChange(data?.value);
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-full">
                <div className="flex gap-3">
                  <Checkbox
                    register={register}
                    label="Sản phẩm nổi bật"
                    name="isPopular"
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-4 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            onClick={() => router.push('/')}
          >
            Quay lại trang chủ
          </button>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Lưu sản phẩm
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
