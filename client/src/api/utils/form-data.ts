interface FormDataObject {
  [key: string]: any;
}

export const setFormData = <T extends FormDataObject>(data: T) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value !== "undefined") {
      formData.set(key, value);
    }
  });
  return formData;
};
