import { useState } from "react";


const menuItems = [
  {
    id: 1,
    name: "Gujarati Thali",
    category: "Meals",
    price: 220,
    description: "A traditional Gujarati meal with roti, sabzi, dal, rice and salad.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  
  
  {
    id: 4,
    name: "Masala Dosa",
    category: "Breakfast",
    price: 120,
    description: "Crispy South Indian dosa filled with spiced potato masala, served with chutney.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Veg Sandwich",
    category: "Snacks",
    price: 100,
    description: "Fresh bread filled with vegetables, chutney and delicious seasoning.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  
  {
    id: 7,
    name: "Masala Chai",
    category: "Beverages",
    price: 35,
    description: "Hot Indian tea prepared with milk and aromatic spices.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80"
  },
  
];

const categories = [
  "All",
  "Breakfast",
  "Meals",
  "Snacks",
  "Beverages",
  
];

export default function FoodMenu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="food-page">
      <section className="food-hero text-center">
        <div className="container py-5">
          <h1>Our Food Menu</h1>
          <p>Delicious food for a comfortable stay!</p>
        </div>
      </section>

      <div className="container py-5">
        <h2 className="text-center mb-4">Explore Our Menu</h2>

        <input
          type="search"
          className="form-control mb-4"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "btn btn-dark"
                  : "btn btn-outline-dark"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredItems.map((item) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
              <div className="card food-card h-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="food-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=Food+Image";
                  }}
                />

                <div className="card-body">
                  <span className="food-category">
                    {item.category}
                  </span>

                  <h5 className="mt-2">{item.name}</h5>

                  <p className="text-muted">
                    {item.description}
                  </p>

                  <p className="food-price">₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center mt-4">
            No food items found.
          </p>
        )}

        <p className="text-center text-muted mt-5">
          Please contact hotel reception to order food.
        </p>
      </div>
    </div>
  );
}