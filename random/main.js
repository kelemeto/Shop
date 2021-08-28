
const section1 = document.querySelector('.section_1');
const profilePopup = document.querySelector('.profile_popup');
const heading = document.querySelector('.heading');
const categoriesList = document.querySelectorAll('.cat_btn');
let counter = 0;

const itemsInfo = [
    {
        name: 'Runfalcon Shoes Black F36218 01 standard',
        price: 49.99,
        imageSrc: 'Runfalcon_Shoes_Black_F36218_01_standard.jpg',
        categories: 'Shoes',
        stock: 19,
        colors: ['black', 'white'],
        sizes: [40, 42, 43, 44],
        miniImageSrc: '',
    },
    {
        name: 'PG.SEGALAXIE3-LPI01.PZ',
        price: 35.99,
        imageSrc: 'PGSEGALAXIE3-LPI01PZ.jpg',
        categories: 'Shoes',
        stock: 8,
        colors: ['pink', 'gray'],
        sizes: [38, 39, 41, 41.5],
    },
    {
        name: '05668P21',
        price: 64.99,
        imageSrc: '05668P21.jpg',
        categories: 'Jackets',
        stock: 11,
        colors: ['red'],
        sizes: ['S', 'M', 'L'],
    },
];

const cart = [];

function displayItems(items) {
    let counter = 0;
    items.forEach((item, i, arr) => {
        if (item.stock < 1);
        counter++;
        item.hash = Date.now() + counter;
        const html = `
            <a href="#${item.hash}" class="items_info">
                <img src="./img/${item.imageSrc}" alt="shoes img">
                <p class="items_tkst">${item.name}</p>
                <p class="price">$${item.price}</p>
            </a>
        `;
        section1.insertAdjacentHTML('beforeend', html);
        if (i === arr.length - 1)
            counter = 0;
    });
};
displayItems(itemsInfo);


document.querySelector('#cart-btn').addEventListener('click', function (e) {
    if (profilePopup.style.display !== 'flex' && profilePopup.childElementCount > 0) {
        profilePopup.style.display = 'flex';
    } else {
        profilePopup.style.display = 'none';
    }
});

document.querySelector('body').addEventListener('click', function (e) {
    if (!e.target.closest('#btn-cart-id')) profilePopup.style.display = 'none';
});

//////////

window.addEventListener('hashchange', function (e) {
    const [category] = Array.from(categoriesList, el => el.innerHTML).filter(cat => e.currentTarget.location.hash.slice(1) === cat);

    const [targetHash] = itemsInfo.filter(item =>
        item.hash === Number(e.currentTarget.location.hash.slice(1))
    );

    if (e.currentTarget.location.hash.slice(1) === category) {
        removeItems();
        heading.textContent = category;

        itemsInfo.filter(obj => obj.categories.includes(category)).forEach(item => {
            if (item.stock < 1);
            const html = `
                        <a href="#${item.hash}" class="items_info">
                            <img src="./img/${item.imageSrc}" alt="shoes img">
                            <p class="items_tkst">${item.name}</p>
                            <p class="price">$${item.price}</p>
                        </a>
                    `;
            section1.insertAdjacentHTML('beforeend', html);
        });
    } else if (e.currentTarget.location.hash === '') {
        removeItems();
        heading.textContent = 'Featured Items';
        itemsInfo.forEach(item => {
            if (item.stock < 1);
            const html = `
                <a href="#${item.hash}" class="items_info">
                    <img src="./img/${item.imageSrc}" alt="shoes img">
                    <p class="items_tkst">${item.name}</p>
                    <p class="price">$${item.price}</p>
                </a>
            `;

            section1.insertAdjacentHTML('beforeend', html);
        });
    } else if (Number(e.currentTarget.location.hash.slice(1)) === targetHash.hash) {
        removeItems();
        heading.style.display = 'none';
        const bigImg = targetHash.imageSrc.split('.').reduce((acc, cur, i, arr) => {
            return i === arr.length - 1 ? acc + targetHash.colors[0] + '.' + cur : acc + cur;
        });
        const colors = targetHash.colors.reduce((acc, color) => {
            return acc + `<div class="color" id="${color}"></div>`;
        }, ``);
        const sizes = targetHash.sizes.reduce((acc, size) => {
            return acc + `<option value="${size}">${size}</option>`;
        }, ``);
        let miniImg = bigImg.split('.').reduce((acc, cur, i, arr) => {
            return i === arr.length - 1 ? acc + 'mini' + '.' + cur : acc + cur;
        });

        const html = `
        <img src="./img/${bigImg}" alt="shoe img" class="checkout_image">
            <div class="checkout_info">
                <p class="checkout_item">${targetHash.name}</p>
                <div class="line"></div>
                <p class="checkout_price">$${targetHash.price}</p>
                <form action="">
                    <p class="color_tekst">Color</p>
                    <div class="colors">
                        ${colors}
                    </div>
                    <div class="sizes">
                        <label for="product-size" class="size_label">Size</label>
                        <select name="productSize" id="product-size" class="select_size">
                            ${sizes}
                        </select>
                    </div>
                    <div class="quantity">
                        <label for="quantity-label" class="quantity_label">Quantity</label>
                        <div class="quantity_storage">
                            <input type="number" id="quantity-label" class="quantity_input" value="1">
                        </div>
                    </div>
                    <button type="button" class="item_submit">Add To Cart</button>
                </form>
            </div>`;
        section1.insertAdjacentHTML('beforeend', html);
        const image = document.querySelector('.checkout_image');
        const selectSize = document.querySelector('.select_size');
        const selectQuantity = document.querySelector('.quantity_input');
        let selectedColor;
        targetHash.colors.forEach(color => {
            document.querySelector(`#${color}`).style.backgroundColor = color;
            if (image.attributes.src.value.includes(color)) {
                selectedColor = color;
                const activeColor = document.querySelector(`#${selectedColor}`);
                activeColor.style.height = '30px';
                activeColor.style.width = '30px';
            }
        });

        const colorsContainer = document.querySelector('.colors');
        const submitBtn = document.querySelector('.item_submit');
        colorsContainer.addEventListener('click', function (e) {
            if (e.target.id === '') return;
            const imgColor = image.attributes.src.value.includes(e.target.id);
            if (imgColor) return;
            targetHash.colors.forEach(color => {
                const activeColor = document.querySelector(`#${color}`);
                activeColor.style.height = '25px';
                activeColor.style.width = '25px';
            });
            const colorImage = targetHash.imageSrc.split('.').reduce((acc, cur, i, arr) => {
                return i === arr.length - 1 ? acc + e.target.id + '.' + cur : acc + cur;
            });
            miniImg = colorImage.split('.').reduce((acc, cur, i, arr) => {
                return i === arr.length - 1 ? acc + 'mini' + '.' + cur : acc + cur;
            });

            image.attributes.src.value = `./img/${colorImage}`;
            selectedColor = e.target.id;
            const activeColor = document.querySelector(`#${selectedColor}`);
            activeColor.style.height = '30px';
            activeColor.style.width = '30px';
        });

        submitBtn.addEventListener('click', function () {
            const [increaseQuantity] = cart.filter(item => {
                return item.name === targetHash.name && item.price === targetHash.price && item.imageSrc === miniImg && item.color === selectedColor && item.size === selectSize.value;
            });
            if (increaseQuantity) {
                const selectOptions = document.querySelectorAll('option');
                const cartItemContainer = document.querySelectorAll('.item_container');
                cart.forEach(item => {
                    if (item === increaseQuantity) {
                        item.quantity = +selectQuantity.value + +item.quantity;
                        cartItemContainer.forEach(el => {
                            if (+el.id.slice(15) === item.id) {
                                el.querySelector('.cart_quantity').textContent = `Qua. ${item.quantity}`;
                            }
                        });
                        selectSize.value = selectOptions[0].value;
                        selectQuantity.value = 1;
                    }
                });
                return;
            }
            cart.push({
                name: targetHash.name,
                price: targetHash.price,
                imageSrc: miniImg,
                color: selectedColor,
                size: selectSize.value,
                quantity: selectQuantity.value,
                id: counter,
            });
            const html = `
                        <div class="item_container" id="item-container-${counter}">
                            <a href="#${targetHash.hash}" class="cart_itemv2">
                                <img src="./img/${miniImg}" alt="shoe img"
                                    class="cart_imgv2">
                                <div class="cart_tekstv2">
                                    <p class="cart_item_info">
                                        ${targetHash.name}
                                    </p>
                                    <div class="cart_container">
                                      <p class="cart_quantity">Qua. ${selectQuantity.value}</p>
                                      <p class="cart_size">Size ${selectSize.value}</p>
                                      <p class="cart_price">$${targetHash.price}</p>
                                    </div>
                                </div>
                            </a>
                            <button class="btn_delete" id="btn-delete-${counter}">
                                <img src="./img/delete-icon.png" alt="delete item img" class="btn_delete_img">
                            </button>
                        </div>`;
            profilePopup.insertAdjacentHTML('beforeend', html);
            const selectOptions = document.querySelectorAll('option');
            const btnDeleteItem = document.querySelectorAll('.btn_delete');
            selectSize.value = selectOptions[0].value;
            selectQuantity.value = 1;
            counter++;
        });
    }
});

function test() {
    const [category] = Array.from(categoriesList, el => el.innerHTML).filter(cat => window.location.hash.slice(1) === cat);
    if (window.location.hash.slice(1) === category) {
        removeItems();
        heading.textContent = category;

        itemsInfo.filter(obj => obj.categories.includes(category)).forEach(item => {
            if (item.stock < 1);
            const html = `
            <a href="#${item.hash}" class="items_info">
            <img src="./img/${item.imageSrc}" alt="shoes img">
            <p class="items_tkst">${item.name}</p>
            <p class="price">$${item.price}</p>
            </a>
            `;
            section1.insertAdjacentHTML('beforeend', html);
        });
    }
};
test();

function removeItems() {
    heading.style.display = '';
    const itemsInfoDOM = document.querySelectorAll('.items_info');
    itemsInfoDOM.forEach(el => el.remove());
    const checkoutImg = document.querySelector('.checkout_image');
    const checkoutInfo = document.querySelector('.checkout_info');
    if (checkoutInfo, checkoutImg) {
        checkoutImg.remove();
        checkoutInfo.remove();
    }
}

document.addEventListener('click', function (e) {
    if (e.target.closest('.btn_delete')) {
        e.target.closest('.item_container').remove();
        const i = cart.findIndex(item => item.id === +e.target.closest('.btn_delete').id.slice(11));
        cart.splice(i, 1);
    }
    if (profilePopup.childElementCount < 1) profilePopup.style.display = 'none';
});