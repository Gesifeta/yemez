//convert file to base64
export const convertToBase64 = (file) => {
  //read file
  const reader = new FileReader();
  
  file && reader.readAsDataURL(file);
  //checke if file is read
  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
};

export default convertToBase64;
