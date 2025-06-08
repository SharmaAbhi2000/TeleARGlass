import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("TeleAR 118X");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureText, setFeatureText] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
     // formData.append("sizes", JSON.stringify(sizes));
      formData.append("features", JSON.stringify(features));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        // setSizes([]);
        setFeatures([]);
        setFeatureText("");
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const toggleSize = (size) => {
  //   setSizes((prev) =>
  //     prev.includes(size)
  //       ? prev.filter((item) => item !== size)
  //       : [...prev, size]
  //   );
  // };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter" && featureText.trim()) {
      e.preventDefault();
      if (!features.includes(featureText.trim())) {
        setFeatures([...features, featureText.trim()]);
      }
      setFeatureText("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, idx) => {
            const setImage = [setImage1, setImage2, setImage3, setImage4][idx];
            return (
              <label key={idx} htmlFor={`image${idx + 1}`}>
                <img
                  className="w-20"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={`image${idx + 1}`}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            value={category}
          >
            <option value="TeleAR 269X">TeleAR 269X</option>
            <option value="TeleAR 156X">TeleAR 156X</option>
            <option value="TeleAR 118X">TeleAR 118X</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      {/* <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="w-full">
        <p className="mb-2">Features</p>
        <input
          type="text"
          placeholder="Type a feature and press Enter"
          value={featureText}
          onChange={(e) => setFeatureText(e.target.value)}
          onKeyDown={handleFeatureKeyDown}
          className="w-full max-w-[500px] px-3 py-2 mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-slate-200 px-3 py-1 rounded-full"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(feature)}
                className="ml-2 text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
