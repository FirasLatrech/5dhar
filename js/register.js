const registerForm = document.querySelector(".register-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const baseUrl = "https://api5odhra.zitouna.tech";
const error = document.querySelector(".error");


const registerr= document.querySelector("#register");
registerr.addEventListener("click",function(){
  location.href="index.html"
});
async function register(obj) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/local/register`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 200 && response.status < 300) { 
      const data = await response.json();
      localStorage.setItem("token", data.jwt);
      location.href = "allProducts.html";
      return data;
      
    } else {
      const dataError = await response.json();
      const error = document.querySelector(".error"); 
      error.innerHTML = dataError.message; 
      error.style.color = "red";
    }
  } catch (error) {
    console.log(error);
  }
}


// async function main() {

// }

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const registerData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  const data = await register(registerData);
  console.log(data);
});


