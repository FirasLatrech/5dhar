const loginForm = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const error = document.querySelector(".error");
const baseUrl = "https://api5odhra.zitouna.tech";
const arr=[]
alert(` email: random@example.com
password  : RandomPassword123`)
localStorage.setItem("array", JSON.stringify(arr));
async function login(obj) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/local`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json", // Corrected header value
      },
    });

    if (response.status >= 200 && response.status < 300) { // Check for success status codes
      const data = await response.json();
      localStorage.setItem("token", data.jwt);
      location.href = "allProduct.html";
      return data;
    } else {
      const dataError = await response.json();
      const error = document.querySelector(".error"); // Assuming you have an element with class "error"
      error.innerHTML = dataError.message; // Use "message" instead of "error.message"
      error.style.color = "red";
    }
  } catch (error) {
    console.log(error);
  }
}




loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginData = {
    identifier: email.value,
    password: password.value,
  };
  const data = await login(loginData);
});


const register= document.querySelector("#register");
register.addEventListener("click",function(){
  location.href="register.html"
});