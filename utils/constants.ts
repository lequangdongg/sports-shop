export enum TypeProductEnum {
  SportClothes = 'Quần áo thể thao',
  SportsAccessories = 'Phụ kiện thể thao',
  DesignUponRequest = 'Thiết kế quần áo thi đấu theo yêu cầu',
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
    label: TypeProductEnum.SportClothes,
  },
  {
    value: TypeProductEnum.SportsAccessories,
    label: TypeProductEnum.SportsAccessories,
  },
  {
    value: TypeProductEnum.DesignUponRequest,
    label: TypeProductEnum.DesignUponRequest,
  },
];
