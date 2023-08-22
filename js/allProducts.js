const allProductsContainer = document.querySelector(".all-products-container");
const produictDetailes=document.querySelector(".products-Detalis");


const baseUrl = "https://api5odhra.zitouna.tech";
const error = document.querySelector(".error");
async function fetchAllProducts() {
  try {
    const response = await fetch(`${baseUrl}/api/products?populate=deep,4`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const dataError = await response.json();
      error.innerHTML = dataError.error.message;
      error.style.color = "red";
      console.log(dataError);
    }
  } catch (error) {
    console.log(error);
  }
}

async function showProducts() {
  const allProductsContainer = document.querySelector(".all-products-container");
  const data = await fetchAllProducts();
  const products = data.data;

   const htmlProducts =  products.map((product) => {
    const productHtml = `
    <section class="product-container">
      <div class="top-product">
        <span class="type">${product.attributes.type}</span>
        <span> <img src="./icons/Cart Icon.svg" alt="Icon Cart" class="cartIcon" /> </span>
      </div>
      <div class="product-img">
        <img class="image" src="${product.attributes.image.data.attributes.url}" alt="${product.attributes.image.data.attributes.name}" />
      </div>
      <h3 class="product-name">${product.attributes.name}</h3>
      <svg class="hr-line" xmlns="http://www.w3.org/2000/svg" width="275" height="2" viewBox="0 0 275 2" fill="none">
        <path d="M0 1L274.988 0.999976" stroke="#DEDDDD"/>
      </svg>
      <div class="product-info">
        <div class="price">
          <span class="price-before-discount">$${product.attributes.priceBeforeDiscount}.00</span>
          <span class="price-after-discount">$${product.attributes.priceAfterDiscount}.00</span>
        </div>
        <div class="rating">${Array(product.attributes.rating)
          .fill(1)
          .map(() => {
            return '<img src="./icons/star.svg" alt="star" />';
          }).join("")}</div>
      </div>
    </section>
  `;
    return productHtml;
  });

  allProductsContainer.innerHTML = htmlProducts.join("");

  // Attach the event listener to all product images
  const images = document.querySelectorAll(".image");
  images.forEach((image) => {
    image.addEventListener("click", function (e) {
      console.log("A product image was clicked.");
      const clickedSrc = e.target.src;

      const clickedProduct = products.find((product) =>
        product.attributes.image.data.attributes.url === clickedSrc
      );

      if (clickedProduct) {
        localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));


        location.href = "productDetails.html";

        

      }
    });
  });
}

showProducts();

document.addEventListener("DOMContentLoaded", () => {
  // This code will run when the DOM is fully loaded
  
  // Access the "array" from localStorage and update the NumberOfCommend element
  const arrayy = JSON.parse(localStorage.getItem("array")) || [];
  const NumberOfCommend = document.querySelector(".NumberOfCommend");
  const totalCommand = arrayy.reduce((total, item) => total + Number(item.numberComend), 0);
  NumberOfCommend.innerHTML = totalCommand;
  
  // Other code related to your application
});
document.addEventListener("DOMContentLoaded", () => {
const cartNumber=document.querySelector(".cartNumber");
cartNumber.addEventListener("click",function(){
        location.href = "cart.html";
})});