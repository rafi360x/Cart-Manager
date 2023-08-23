//refarances All Element 
let product_btn = document.querySelectorAll(".prd_1")
let cart_button = document.querySelector(".cart_button"),
    cart_viewer = document.querySelector('.cart_viewer'),
    cart_view_btn = document.querySelector(".cart_view_btn"),
    delete_btn = document.querySelector(".delete_btn")

// Add Events 
cart_button.addEventListener("click", Cart_Chaker)
// Handle Events 
window.onload = AddToCart()
product_btn.forEach((value, index) => {
    value.addEventListener("click", (e) => {
        let item = e.target;
        let price = item.previousElementSibling.textContent;
        let discription = item.previousElementSibling.previousElementSibling.textContent;
        let name = item.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        AddToLocalStroge(name, discription, price)
    })
})
delete_btn.addEventListener("click", () => {
    cart_viewer.style.display = "none"
    delete_btn.style.visibility = "hidden"
})
// Dom Functions
function Cart_Chaker() {
    delete_btn.style.visibility = "visible"
    cart_viewer.style.display = "block"
    cart_viewer.style.top = "10%"
}

// Utility Functions

/**
 * 
 * @param {string} name 
 * @param {string} discription 
 * @param {string} price 
 */
function AddToLocalStroge(name, discription, price) {
    // Example usage:
    const myObject = { name: name, discription: discription, price: price };
    addToLocalStorageIfNotExists("myKey", myObject);
    AddToCart()
}

/**
 * 
 * @param {string} key 
 * @param {object} objectToAdd 
 */
function addToLocalStorageIfNotExists(key, objectToAdd) {

    if (localStorage.getItem(key)) {

        const existingObjects = JSON.parse(localStorage.getItem(key));

        
        const isObjectInArray = existingObjects.some(existingObject => {
             
            return JSON.stringify(existingObject) === JSON.stringify(objectToAdd);
        });

        if (isObjectInArray) {
            
            alert("Object already exists in Your Cart");
        } else {
           
            existingObjects.unshift(objectToAdd);
            localStorage.setItem(key, JSON.stringify(existingObjects));
        }
    } else {
    
        localStorage.setItem(key, JSON.stringify([objectToAdd]));
    }
}

function AddToCart() {
    let myKey;
    if (localStorage.getItem("myKey") === null) {
        myKey = []
    } else {
        myKey = JSON.parse(localStorage.getItem("myKey"))
    }
    let html = ""
    myKey.forEach((value, index) => {
        let name = value["name"],
            dis = value["discription"],
            price = value["price"]
        html += `<div class="cart_content"><div class="prd_img"><span>${name}</span></div><div class="utility_area"><p class="prd_des">${dis}</p><p class="prd_price"><span>Price:-</span>${price}</p><button class="prd_btn btn">Buy Now</button><button class="del_btn btn" onclick="myFunction(${index})">Del</button></div></div>`

        ShowData(html)
        
    })
}


/**
 * 
 * @param {string} html 
 */
function ShowData(html) {
    document.querySelector(".cart_viewer").innerHTML = html
}

/**
 * 
 * @param {object} parent 
 */
function removeChildren(parent) {
    let child = parent.lastElementChild;
    console.log(parent)
    while (child) {
        parent.removeChild(child)
        child = parent.lastElementChild
    }
}

/**
 * 
 * @param {number} index 
 */
function myFunction(index) {
    let myKey;
    if (localStorage.getItem("myKey") === null) {
        myKey = []
    } else {
        myKey = JSON.parse(localStorage.getItem("myKey"))
    }
    myKey.splice(index, 1);
    removeChildren(cart_viewer)
    localStorage.setItem("myKey", JSON.stringify(myKey));
    if(myKey == ![]){
        cart_viewer.innerHTML = `<p>Empty Cart</p>`
    }
    AddToCart()
}
