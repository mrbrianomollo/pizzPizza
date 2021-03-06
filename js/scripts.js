function Pizza(name) {
  this.name = name;
  this.price = 0;
  this.quantity = 1;
  this.toppings = [];
}

Pizza.prototype.setSize = function (size) {
  const pizzaSize = pizzaSizes.find((pizzaSize) => pizzaSize.size == size);
  if (pizzaSize) {
    this.size = pizzaSize;
    this.calculateTotal();
  }
};
Pizza.prototype.setCrust = function (name) {
  const pizzaCrust = pizzaCrusts.find((pizzaCrust) => pizzaCrust.name == name);
  if (pizzaCrust) {
    this.crust = pizzaCrust;
    this.calculateTotal();
  }
};

Pizza.prototype.setTopings = function (toppings) {
  this.toppings = toppings;
  this.calculateTotal();
};

Pizza.prototype.setQuantity = function (quantity) {
  this.quantity = +quantity;
  this.calculateTotal();
};
Pizza.prototype.calculateTotal = function () {
  const toppingPrice = 50;

  if (this.size) {
    this.price = this.size.price;
  }

  if (this.crust) {
    this.price = this.price + this.crust.price;
  }

  this.price += this.toppings.length * toppingPrice;

  this.price *= this.quantity;
};
const pizzaSizes = [
  {
    size: "Small",
    price: 500,
  },
  {
    size: "Medium",
    price: 750,
  },
  {
    size: "Large",
    price: 950,
  },
];
const pizzaCrusts = [
  {
    name: "Flatbread",
    price: 100,
  },
  {
    name: "Vegan-friendly",
    price: 100,
  },
  {
    name: "New Haven Style",
    price: 100,
  },
];
const pizzaToppings = 
["Extra Pepperoni-150", "Extra Chicken Tikka-150", "Extra BBQ Chicken-150"];
const pizzas = [
  { name: "Hawaiian" },
  { name: "Pepperoni" },
  { name: "BBQ Steak" },
  { name: "BBQ Chicken" },
  { name: "Peri Peri Chicken" },
  { name: "Chicken Tikka" },
];

$(function () {
  pizzas.forEach((pizza) => {
    $("#pizza").append(`<option value="${pizza.name}">${pizza.name}</option>`);
  });
  pizzaSizes.forEach((pizzaSize) => {
    $("#size").append(
      `<option value="${pizzaSize.size}">${pizzaSize.size}-${pizzaSize.price}</option>`
    );
  });
  pizzaCrusts.forEach((pizzaCrust) => {
    $("#crust").append(
      `<option value="${pizzaCrust.name}">${pizzaCrust.name}-${pizzaCrust.price}</option>`
    );
  });
  pizzaToppings.forEach((topping) => {
    $(".toppings").append(`<div class="col-md-6">
        <div class="form-check">
          <input class="form-check-input" name="toppings[]" type="checkbox" id="${topping}" value="${topping}">
          <label class="form-check-label" for="${topping}">
              ${topping}
          </label>
          </div>
        </div>`);
  });

  function calculateGrandTotal() {
    let total = 0;
    cart.forEach((pizza) => {
      total += pizza.price;
    });

    $(".grand-total").html(`Ksh <span class="text-bold">${total}</span> `);
  }
  const cart = [];
  if (cart.length == 0) {
    $(".empty-cart").show();
    $(".delivery-button").hide();
  } else {
    $(".empty-cart").hide();
  }
  $("#order-form").on("submit", function (e) {
    //prevent default action
    e.preventDefault();

    const selectedPizzaName = $("#pizza").val();
    const selectedSize = $("#size").val();
    const selectedCrust = $("#crust").val();
    const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    if (
      !selectedPizzaName ||
      !selectedSize ||
      !selectedCrust ) 
      {
      $("#error").text(
        "(*) required to proceed!"
      );
      return;
    } else {
      $("#error").text("");
    }
    const cartPizza = cart.find((pizza) => {
      const sameToppings =
        JSON.stringify(pizza.toppings) == JSON.stringify(selectedToppings);

      return (
        pizza.name == selectedPizzaName &&
        pizza.size.size == selectedSize &&
        sameToppings
      );
    });
    if (cartPizza) {
      cartPizza.setQuantity(cartPizza.quantity + 1);
    } else {
      const pizza = new Pizza(selectedPizzaName);
      pizza.setSize(selectedSize);
      pizza.setCrust(selectedCrust);
      pizza.setTopings(selectedToppings);

      cart.push(pizza);
    }
    $(".order-table tbody").html("");
    cart.forEach((pizza, cartIndex) => {
      $(".order-table tbody").append(`
            <tr>
                <td>${pizza.name}</td>
                <td>${pizza.size.size}</td>
                <td>${pizza.crust.name}</td>
                <td>${pizza.toppings.join(", ")}</td>
                <td>
                    <input type="number" min="1" class="input-sm form-control pizza-quantity" data-cart-index="${cartIndex}" value="${
        pizza.quantity
      }" />
                </td>
                <td>Ksh ${pizza.price}</td>
            </tr>
        `);
      $(".delivery-button").show();
      calculateGrandTotal();
    });
  });
  $("body").on("change", ".pizza-quantity", function () {
    const quantity = $(this).val();
    const cartIndex = $(this).data("cart-index");
    const pizza = cart[cartIndex];

    if (quantity > 0) {
      pizza.setQuantity(quantity);
      $(this)
        .parent()
        .next()
        .html(`KES <span class="text-bold">${pizza.price}</span> `);
    }

    calculateGrandTotal();
  });
    $("#delivery-form").on("submit", function (e) {
        e.preventDefault();
        const selectd = $("input[name='deliveryMethod']:checked");
        if (selectd.val() == undefined) {
            $(".delivery-option").html("<p class='text-danger'>** Please select the delivery method **</p>");
            return;
        } else {
            $(".delivery-option").text("");
            if (selectd.val() == "delivery") {
                $("#location-input-details").show();
                const customerName = $("#customerName").val();
                const customerPhone = $("#customerPhone").val();
                const customerLocation = $("#customerLocation").val();
                const additionalInfo = $("#additionalInfo").val();
                if (!customerName || !customerPhone || !customerLocation) {
                    $(".error-delivery-location").text("(*) required to proceed!")
                    return;
                } else {
                    $(".error-delivery-location").text("");
                }
                function calculateGrandTotal() {
                    let total = 0;
                    cart.forEach((pizza) => {
                        total += pizza.price;
                    });
                    const getTotalPlusDeliveryFee = total + 200;
                    console.log(getTotalPlusDeliveryFee);
                    console.log(cart);
                    $("#select-delivery-method").hide();
                    $(".delivery-head").append(`
                    <div class="alert alert-success" role="alert">Order place successfuly. It will be prepared and delivered to ${customerLocation}. Thank you ${customerName} for choosing PizzPizza</div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5>Order Summary</h5>
                            </div>
                            <div>
                                <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                            </div>
                        </div>
                    `);
                    cart.forEach((pizza, cartIndex) => {
                        $(".delivery-bottom").append(`
                        <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ol class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">${pizza.name}(${pizza.size.size})</div>
                                            Crust - ${pizza.crust.name} <br>
                                            Toppings - ${pizza.toppings.join(", ")}
                                        </div>
                                        <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                       </div>
                        `);
                    });

                }
                calculateGrandTotal()
            } else if (selectd.val() == "pickup") {
                function calculateGrandTotal() {
                    let total = 0;
                    cart.forEach((pizza) => {
                        total += pizza.price;
                    });
                    const getTotalPlusDeliveryFee = total;
                    console.log(getTotalPlusDeliveryFee);
                    $("#select-delivery-method").hide();
                    $(".delivery-head").append(`
                    <div class="alert alert-success" role="alert">Your order has been placed successfuly. It will be prepared and you'll be notified once it's read for pickup. Thank you for choosing PizzPizza</div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5>Order Summary</h5>
                            </div>
                            <div>
                                <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                            </div>
                        </div>
                    `);
                    cart.forEach((pizza, cartIndex) => {
                        $(".delivery-bottom").append(`
                        <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ol class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            ${pizza.name} <br> ${pizza.size.size} <br> ${pizza.crust.name} <br> ${pizza.toppings.join(", ")}
                                        </div>
                                        <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                    </li>
                                </ol>
                                KES.${getTotalPlusDeliveryFee} 
                            </div>
                            
                        </div>
                        
                       </div>
                        `);
                    });

                }
                calculateGrandTotal()
            }
        }

    })
});
