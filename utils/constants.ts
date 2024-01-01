export enum TypeProductEnum {
  SportClothes = 'Quần áo thể thao',
  SportsAccessories = 'Phụ kiện thể thao',
  DesignUponRequest = 'Thiết kế quần áo thi đấu theo yêu cầu',
  SportShorts = 'Quần thể thao',
  ClothesSports = 'Áo thể thao',
  SportsWear = 'Đồ bộ thể thao',
  JacketSports = 'Áo khoác thể thao',
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
    value: TypeProductEnum.SportShorts,
    label: TypeProductEnum.SportShorts,
  },
  {
    value: TypeProductEnum.ClothesSports,
    label: TypeProductEnum.ClothesSports,
  },
  {
    value: TypeProductEnum.SportsWear,
    label: TypeProductEnum.SportsWear,
  },
  {
    value: TypeProductEnum.JacketSports,
    label: TypeProductEnum.JacketSports,
  },
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


export enum DataResponse {
  Id = 0,
  Title,
  Slug,
  Price,
  Description,
  Image,
  isPopular,
  Sizes,
  Category,
  CreatedAt,
  UpdatedAt,
  Sold,
  ProductHot
}