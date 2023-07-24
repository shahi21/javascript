let shoppingCart = document.getElementById("shopping-cart")
let select_del = document.querySelectorAll(".bx.bx-x-circle")

let data = [
  {
    id:"item-1",
    name:"PUMA Sneakers",
    price:200,
    img:"../images/bag.png",
  },
  {
    id:"item-2",
    name:"Black Sneakers",
    price:300,
    img:"../images/bag2.png",
  },
  {
    id:"item-3",
    name:"Sneakers",
    price:185,
    img:"../images/bag3.png",
  },
  {
    id:"item-4",
    name:"PUMA",
    price:210,
     img:"../images/bag4.png",
  },
  {
    id:"item-5",
    name:"Pole star bag",
    price:200,
    img:"../images/bag5.png",
  },
  {
    id:"item-6",
    name:"Nike Air",
    price:500,
    img:"../images/bag6.png",
  },
  {
    id:"item-7",
    name:"Shoes",
    price:350,
    img:"../images/bag7.png",
  },
  {
    id:"item-8",
    name:"White Sneakers",
    price:150,
    img:"../images/bag8.png",
  }
]


function addToCart(itemId) {
  const item = document.getElementById(itemId);
  let basket = JSON.parse(localStorage.getItem("data")) || [];
  let search = basket.find((x) => x.id === itemId);

  if (search === undefined) {
    basket.push({
      id: itemId,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
}

/*******************************CART PAGE*****************************************/
let generateItems = () => {
  let basket = JSON.parse(localStorage.getItem("data")) || [];

  if (basket.length !== 0) {
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = data.find((y) => y.id === id) || [];
        return `
          <div class="cart-item">
            <img width=100 src=${search.img} alt="/" />
            <div class="details">
              <div class="title-price">
                <h4>${search.name}</h4>
                <h4>$${search.price}</h4>
                <i class='bx bx-x-circle' data-item-id="${id}"></i>
              </div>
              <div class="qty">
                <input type="number" value="${item}" data-item-id="${id}">
              </div>
              <h4 class="final_cost">0</h4>
            </div>
          </div>
         `;
      })
      .join("");

    // Add event listener to the circle icons for deletion
    const deleteIcons = document.querySelectorAll(".bx.bx-x-circle");
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const itemId = icon.dataset.itemId;

        // Remove the item from the basket array
        basket = basket.filter((item) => item.id !== itemId);

        // Update the local storage with the modified basket array
        localStorage.setItem("data", JSON.stringify(basket));

        // Remove the cart item from the DOM
        icon.closest(".cart-item").remove();
      });
    });

    // Add event listener to the input number tags for quantity change
    const quantityInputs = document.querySelectorAll(".qty input");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const itemId = input.dataset.itemId;
        const quantity = parseInt(input.value);

        let search = data.find((y) => y.id === itemId) || [];
        const unitPrice = search.price;

        // Calculate the new total price
        const totalPrice = unitPrice * quantity;

        // Find the corresponding "final_cost" h4 tag and update it with the new total price
        const cartItem = input.closest(".cart-item");
        const finalCostElement = cartItem.querySelector(".final_cost");
        finalCostElement.textContent = `$${totalPrice}`;
      });
    });
  } else {
    shoppingCart.innerHTML = `
      <center><h1>Cart is Empty</h1></center>`;
  }
};

generateItems();

let submit=()=>{
  alert("Your order is placed successfully")
}