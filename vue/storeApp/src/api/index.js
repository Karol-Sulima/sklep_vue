import axios from "axios";

const get = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log("data", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 500 + Math.random() * 1000);
  });

const post = (url, userObject) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post(url, userObject, { withCredentials: true })
        .then((response) => {
          console.log("data", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            // Obsługa błędu 409 (użytkownik już istnieje)
            reject({ status: 409, message: "User already exists" });
          } else {
            reject(error);
          }
        });
    }, 1000);
  });

const getPromotion = (id) => get(`http://localhost:3000/promotion/${id}`);
const getPromotions = () => get("http://localhost:3000/promotions");
const getProduct = (id) => get(`http://localhost:3000/product/${id}`);
const getProducts = () => get(`http://localhost:3000/products`);
const getCategories = () => get(`http://localhost:3000/categories`);
const registerUser = (userObject) =>
  post(`http://localhost:3000/createUser`, userObject);
const loginUser = (userObject) =>
  post(`http://localhost:3000/loginUser`, userObject);
const logoutUser = () => post(`http://localhost:3000/logoutUser`);
const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);
export {
  getPromotions,
  getPromotion,
  getProduct,
  getProducts,
  getCategories,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
