import { useState, useEffect } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetProductsQuery } from "../../store/product/product.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductsList() {
  const { data: apiProducts, isLoading, error } = useGetProductsQuery(20);
  const navigate = useNavigate();

  const localProducts = useSelector(
    (state: RootState) => state.localProducts.products
  );
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});
  const [deletedItems, setDeletedItems] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<"all" | "favorites" | "deleted">("all");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  useEffect(() => {
    if (apiProducts) {
      const combinedProducts = [
        ...localProducts.filter(
          (localProduct) =>
            !apiProducts.some((apiProduct) => apiProduct.id === localProduct.id)
        ),
        ...apiProducts,
      ];
      setAllProducts(combinedProducts);
    }
  }, [apiProducts, localProducts]);

  const toggleLike = (id: number) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deleteItem = (id: number) => {
    setDeletedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCardClick = (e: React.MouseEvent, id: number) => {
    if (
      (e.target as HTMLElement).closest(".like-btn") ||
      (e.target as HTMLElement).closest(".delete-btn")
    ) {
      return;
    }
    navigate(`/product/${id}`);
  };

  const filteredProducts = allProducts.filter((product) => {
    const isCategoryMatch = categoryFilter
      ? product.category === categoryFilter
      : true;

    const isFavoriteMatch =
      filter === "favorites"
        ? likedItems[product.id] && !deletedItems[product.id]
        : true;

    const isDeletedMatch =
      filter === "deleted"
        ? deletedItems[product.id]
        : !deletedItems[product.id];

    const isSearchMatch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      isCategoryMatch && isFavoriteMatch && isDeletedMatch && isSearchMatch
    );
  });

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
        "Error"
      ) : (
        <>
          <div className="main">
            <div className="left-side">
              {/* Поиск */}
              <div className="search">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input form-control"
                />
              </div>

              {/* Фильтры: Все, Избранные, Удаленные */}
              <div className="filters">
                <button
                  onClick={() => setFilter("all")}
                  className={filter === "all" ? "active" : ""}
                >
                  Products
                </button>
                <button
                  onClick={() => setFilter("favorites")}
                  className={filter === "favorites" ? "active" : ""}
                >
                  Favorite
                </button>
                <button
                  onClick={() => setFilter("deleted")}
                  className={filter === "deleted" ? "active" : ""}
                >
                  Deleted
                </button>
              </div>

              <button
                className="create-product"
                onClick={() => navigate("/create-product")}
              >
                Create Product
              </button>

              {/* Фильтрация по категории */}
              <div className="category-filter">
                <label htmlFor="category">Category: </label>
                <select
                  className="form-select"
                  id="category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  value={categoryFilter || ""}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Список товаров */}
            <ul className="product__list">
              {filteredProducts.map((product) => (
                <li
                  className="product"
                  key={product.id}
                  onClick={(e) => handleCardClick(e, product.id)}
                >
                  <div className="product__image">
                    <img src={product.image} alt="product-image" />
                  </div>
                  <div className="product__text">
                    <h2 className="product__title">{product.title}</h2>
                    <p className="product__price">Price: ${product.price}</p>

                    <button
                      className="like-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                    >
                      {likedItems[product.id] ? (
                        <FcLike size={24} />
                      ) : (
                        <FcLikePlaceholder size={24} />
                      )}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(product.id);
                      }}
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default ProductsList;
