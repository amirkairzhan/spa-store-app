import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/product/productSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rate: 0,
    count: 0,
  });

  const [formError, setFormError] = useState<string>("");

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "rate" || name === "count"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.description ||
      !formData.category ||
      !formData.image
    ) {
      setFormError("Все поля обязательны для заполнения.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: {
        rate: formData.rate,
        count: formData.count,
      },
    };

    dispatch(addProduct(newProduct));
    navigate("/");
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className="mb-4 text-light">Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-light">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label text-light">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label text-light">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label text-light">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label text-light">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rate" className="form-label text-light">
            Rating (Rate)
          </label>
          <input
            type="number"
            className="form-control"
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
            step="0.1"
            min="0"
            max="5"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="count" className="form-label text-light">
            Rating (Count)
          </label>
          <input
            type="number"
            className="form-control"
            id="count"
            name="count"
            value={formData.count}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        {formError && <p className="text-danger">{formError}</p>}
        <button type="submit" className="btn btn-primary mb-4">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
