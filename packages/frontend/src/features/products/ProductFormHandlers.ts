import { ProductData } from "./types/product.types";

export const handleAttributeChange = (
  index: number,
  field: string,
  value: string,
  productData: ProductData,
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>
) => {
  const newAttributes = [...productData.attributes];
  newAttributes[index] = { ...newAttributes[index], [field]: value };
  setProductData({ ...productData, attributes: newAttributes });
};

export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  productData: ProductData,
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>
) => {
  if (e.target.files && e.target.files[0]) {
    setProductData({ ...productData, imageFile: e.target.files[0] });
  }
};
