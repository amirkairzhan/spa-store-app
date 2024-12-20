import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IProduct } from "../../store/product/product.types";
import { addProduct } from "../../store/product/productSlice";
import "./ProductPage.css";

async function fetchProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const products = useSelector(
    (state: RootState) => state.localProducts.products
  );

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const foundProduct = products.find(
      (product) => product.id === parseInt(id)
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      const loadProductData = async () => {
        try {
          const data = await fetchProduct(id);

          const isProductInRedux = products.some(
            (product) => product.id === data.id
          );

          if (!isProductInRedux) {
            dispatch(addProduct(data));
          }

          setProduct(data);
        } catch (err) {
          setError("Произошла ошибка при загрузке данных");
        } finally {
          setLoading(false);
        }
      };

      loadProductData();
    }
  }, [id, products, dispatch]);

  console.log("Products in Redux:", products);

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : product ? (
        <>
          <div className="product__content-id">
            <div className="product__image-id">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product__data">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>
                <span>Price:</span> ${product.price}
              </p>
              <p>
                <span>Category:</span> {product.category}
              </p>
              <p>
                <span>Rating:</span> {product.rating.rate} (
                {product.rating.count} reviews)
              </p>
              <button onClick={() => navigate("/")}>Back to Main</button>
            </div>
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
}

export default ProductPage;
