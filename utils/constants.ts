export enum TypeProductEnum {
  SportClothes = 'Quần áo thể thao',
  SportsAccessories = 'Phụ kiện thể thao',
}

export const sizeProduct = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
];

export const typeProduct = [
  {
    value: TypeProductEnum.SportClothes,
    label: 'Quần áo thể thao',
  },
  {
    value: TypeProductEnum.SportsAccessories,
    label: 'Phụ kiện thể thao',
  },
];
