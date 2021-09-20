$(document).ready(function(){
//insert js code here
});
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
        size: "small",
        price: 500,
    },
    {
        size: "medium",
        price: 750,
    },
    {
        size: "large",
        price: 950,
    },
];
const pizzaCrusts = [
    {
        name: "Flatbread",
        price: 100,
    },
    {
        name: "Neapolitan Crust",
        price: 100,
    },
    {
        name: "New Haven Style",
        price: 100,
    },
];
// check toppings later
const pizzaToppings = ["Mushrooms", "Pineapple", "Bacon"];
const pizzaTops = [
    {
        name: "Extra Pepperoni",
        price: 150,
    },
    {
        name: "Extra Chicken Tikka",
        price: 150,
    },
    {
        name: "Extra BBQ Chicken",
        price: 150,
    },
];
const pizzas = [
    { name: "Hawaiian" },
    { name: "Pepperoni" },
    { name: "BBQ Steak" },
    { name: "BBQ Chicken" },
    { name: "Peri Peri Chicken" },
    { name: "Chicken Tikka" },
];

