import { MdCloudUpload } from "react-icons/md";
import convertToBase64 from "../utils/fileConverter";
import { Audio } from "react-loader-spinner";
import { useState } from "react";
import { API_URI } from "../config/config";
const FileUpload = () => {
  let [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  //get file
  const uploadHandle = async (event) => {
    const file = event.target.files[0];
    const { name } = file;
    const image = await convertToBase64(file).then((data) => {
      setLoading(false);
      return data;
    });
    setImage(image);
    return new Promise((resolve, reject) => {
      setId(name.split(".")[0]);
      resolve(imageUpload());
      reject("upload-error");
    }).then((data) => {
      return data;
    });
  };
  //upload image
  const imageUpload = async () => {
    setLoading(true);
    const reqbody = {
      query: `
    mutation{
    uploadProductImage(id:"${id}",image:"${image}"){
    title
    brand
    description
    images
    }
    }
    `,
    };
    return fetch(import.meta.env.VITE_API_URI, {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setLoading(false);
        if (data) {
          setIsUploaded(true);
        } else {
          setIsUploaded(false);
          return "Not found";
        }
        return data;
      })
      .catch((err) => err);
  };
  //delete one or multiple  image of a product
  //use options for multiple delete.
  const deleteProductImage = (id, option) => {
    const requestbody = {
      query: `
            mutation{
              deleteProductImage(id:"${id}",option:"${option}"){
              id
              description
              price
              images
    }
}
    `,
    };
    fetch(import.meta.env.VITE_API_URI, {
      method: "POST",
      body: JSON.stringify(requestbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  };
  return (
    <div className="app__file-upload">
      <div className="app__action-container">
        <p>{!image && loading ? <Audio /> : <></>}</p>
        <button
          className="btn-primary clear"
          onClick={(event) => {
            event.preventDefault();
            setImage(null);
          }}
        >
          clear
        </button>
      </div>
      <label htmlFor="file-upload" className="app__file-upload--image">
        {!image ? (
          <MdCloudUpload color="white" className="app__file-upload--icon" />
        ) : (
          <div>
            <img src={image} style={{ height: "100%", width: "100%" }} />
            {isUploaded ? (
              <span className="position-top-right">
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Image successfuly uploaded
                </span>
                <button
                  className="btn-primary delete"
                  onClick={() => deleteProductImage(id)}
                >
                  delete
                </button>
              </span>
            ) : null}
          </div>
        )}

        <input
          type="file"
          name="file-upload"
          id="file-upload"
          onChange={uploadHandle}
        />
      </label>
    </div>
  );
};

export default FileUpload;
