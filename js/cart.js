const allCartCheckOutTextContiner=document.querySelector(".allCartCheckOutTextContiner");
const allCartCheckOut=document.querySelector(".allCartCheckOut");
const allCartCheckOutInputContiner =document.querySelector(".allCartCheckOutInputContiner")
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




s=0
const clickedProduct =  JSON.parse(localStorage.getItem("clickedProduct"));
const array = JSON.parse(localStorage.getItem("array"));




const NumberOfCommend = document.querySelector(".NumberOfCommend");
const totalCommend = array.reduce((total, item) => total + Number(item.numberComend), 0);
NumberOfCommend.innerHTML = totalCommend;



console.log(array)
const productHtml=`<div class="checkOutTextContiner">
<h1>Shopping Continue</h1>
<img src="media/Line 2.png" alt="">
<h3>Shopping cart</h3>
<p>You have ${array.length} item in your cart</p>`
allCartCheckOutTextContiner.innerHTML=productHtml;
const htmlProducts =  array.map((product) => {
  
s=s+product.numberComend *product.price;
const srcd =`
<div class="cartCheckOut">
<img src="${product.productImg}" alt="">

<div class="textContinerCheckOut">
  <h3>${product.productName}</h3>
  <p>Extra cheese and toping</p>
</div>
<span class="Number">${product.numberComend} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M20 8.57143L10 0L0 8.57143H20Z" fill="#393939"/>
  <path d="M20 11.4286L10 20L0 11.4286H20Z" fill="#393939"/>
</svg></span>
<span class="sommOf">$${product.numberComend *product.price}.00
</span>
<img src="media/Trash Can.svg" alt="">
</div>



`
return srcd


}).join("");
console.log(s)

const allcart=document.querySelector(".allCart");
allCartCheckOut.innerHTML=htmlProducts;

const finalresalt=`

<div class="chekOutInputContiner">
<h1>Have a Coupon?
</h1>
<input type="email" placeholder="Input your email here">
<button>Apply</button>
<h3>Cart Totals</h3>
<table>
  <tr>
    <td>Subtotal</td>
    <td>$${s}.00</td>
  </tr>
  <tr>
    <td>Shipping     </td>
    <td>Free Shipping <br><br>Shipping to Sidney</td>
  </tr>
  <tr >
    <td>Total    </td>
    <td>$${s}.00</td>
  </tr>
</table>
<button>Checkout</button>
</div>`
allCartCheckOutInputContiner.innerHTML=finalresalt;
