const productDetail = document.querySelector(".produictDetails"); 
const clickedProduct =  JSON.parse(localStorage.getItem("clickedProduct"));
const array = JSON.parse(localStorage.getItem("array"))
console.log(array)
const NumberOfCommend = document.querySelector(".NumberOfCommend");

const totalCommend = array.reduce((total, item) => total + Number(item.numberComend), 0);
    NumberOfCommend.innerHTML = totalCommend;
const productHtml2 = `
  <div class="productContainer">
    <div class="imageContainer">
      <span>${clickedProduct.attributes.type}</span>
      <img src="${clickedProduct.attributes.image.data.attributes.url}" alt="">
    </div>
    <div class="textContainer">
      <h1>${clickedProduct.attributes.name}</h1>
      <span class="stars">${Array(clickedProduct.attributes.rating)
        .fill(1)
        .map(() => {
          return '<img src="./icons/star.svg" alt="star" />';
        }).join("")}</span>
      <div class="price">
        <div class="beforeDiscountPrice">
          $${clickedProduct.attributes.priceBeforeDiscount}.00
        </div>
        <div class="afterDiscountPrice">
          $${clickedProduct.attributes.priceAfterDiscount}.00
        </div>
      </div>
      <p>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
      <div class="others">
        Quantity: <input type="text" placeholder="0" class="text"> <input type="submit" value="Add To Cart" class="submit"><img src="media/Aerrow.svg" alt="" class="media">
      </div>
    </div>
  </div>
`;
productDetail.innerHTML=productHtml2;
const submit = document.querySelector(".submit");
const text = document.querySelector(".text");

submit.addEventListener("click", function() {
  const valeur = parseInt(text.value); // Parse the input value as an integer
  
  if (valeur > 0) { // Check if the input value is valid
    const array = JSON.parse(localStorage.getItem("array")) || []; // Initialize an empty array if "array" doesn't exist in localStorage

    const data = {
      "productName": clickedProduct.attributes.name,
      "numberComend": valeur,
      "productImg":clickedProduct.attributes.image.data.attributes.url,
      "price":clickedProduct.attributes.priceAfterDiscount,
    };

    array.push(data);

    localStorage.setItem("array", JSON.stringify(array)); 

    const totalCommend = array.reduce((total, item) => total + Number(item.numberComend), 0);
    NumberOfCommend.innerHTML = totalCommend;
  }
});
const cartNumber=document.querySelector(".cartNumber");
cartNumber.addEventListener("click",function(){
        location.href = "cart.html";
})