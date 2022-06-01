const productCard = document.querySelectorAll('.card');
const cart = document.querySelector('.cart-items');
const checkoutInfo = document.querySelector('.checkout__content');
let cartItemsData = [];
let randomID = Math.floor(Math.random() * 100000);
const numberBox = document.querySelectorAll('.number');

productCard.forEach((element) => {
  const addButton = element.querySelector('.shop__btn');
  let itemNumber = 1;
  addButton.addEventListener('click', () => {
    const itemName = element.querySelector('.title').innerHTML;
    const Item = cartItemsData.find((item) => item.name === itemName);
    if (Item) {
      Item.number++;
    } else {
      const newItem = {
        id: randomID + Math.floor(Math.random() * 100000),
        name: itemName,
        number: itemNumber,
        price: Number(element.querySelector('.price span').innerHTML),
        imageSrc: element.querySelector('img').src,
      };
      cartItemsData.unshift(newItem);
    }
    renderCartItems();
  });
});

const renderCartItems = () => {
  let cartUI = cartItemsData.map(
    (element) => `<li class="shoppingCard">
  <figure class="shoppingCard__img">
    <img src="${element.imageSrc}" alt="" />
  </figure>
  <ul class="shoppingCard__content">
    <li class="title">
      <p>${element.name}</p>
      <span>數量: </span>
      <div class="delete"></div>
    </li>
    <li class="price">
      <div class="number">
        <button class="add"></button>
        <input type="text" value="${element.number}" ; />
        <button class="reduce" ></button>
      </div>
      <p>NT$ ${element.price}.00</p>
    </li>
  </ul>
</li>`,
  );
  cart.innerHTML = cartUI.length
    ? cartUI.join('')
    : '<li class="todo-list__not-found">目前沒有商品</li>';
  renderCartInfo();
  deleteItems();
  aditNumber();
};

const aditNumber = () => {
  if (!cartItemsData.length) return;
  const cartItems = document.querySelectorAll('.shoppingCard');

  cartItems.forEach((element, index) => {
    const addButton = element.querySelector('.add');
    const reduceButton = element.querySelector('.reduce');
    addButton.onclick = () => {
      cartItemsData[index].number++;
      renderCartItems();
    };
    reduceButton.onclick = () => {
      cartItemsData[index].number <= 0
        ? (cartItemsData[index].number = 0)
        : cartItemsData[index].number--;
      if (cartItemsData[index].number == 0) {
        const currentID = cartItemsData[index].id;
        cartItemsData = cartItemsData.filter((n) => n.id !== currentID);
        renderCartItems();
      }
      renderCartItems();
    };
  });
};

const renderCartInfo = () => {
  const countNumber = cartItemsData.reduce(
    (prev, current) => prev + current.number,
    0,
  );
  const countPrice = cartItemsData.reduce(
    (prev, current) => prev + current.number * current.price,
    0,
  );
  checkoutInfo.innerHTML = `總價 : NT$ ${countPrice}.00 <br/> <span> 共 ${countNumber} 項商品 </span>`;
};

const deleteItems = () => {
  if (!cartItemsData.length) return;
  const cartItems = document.querySelectorAll('.shoppingCard');

  cartItems.forEach((element, index) => {
    const deleteButton = element.querySelector('.delete');
    deleteButton.onclick = () => {
      const currentID = cartItemsData[index].id;
      cartItemsData = cartItemsData.filter((n) => n.id !== currentID);
      renderCartItems();
    };
  });
};

renderCartItems();
