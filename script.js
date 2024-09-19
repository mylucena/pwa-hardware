document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const quantity = document.getElementById('quantity').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${quantity}x ${productName}`;

    const shoppingList = document.getElementById('shopping-list');
    shoppingList.appendChild(listItem);

    document.getElementById('form').reset();
});

document.addEventListener('DOMContentLoaded', function() {
    const cameraButton = document.getElementById('camera-button');
    const imageUpload = document.getElementById('image-upload');
    const form = document.getElementById('form');
    const shoppingList = document.getElementById('shopping-list');

    cameraButton.addEventListener('click', function() {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function() {
        if (imageUpload.files.length > 0) {
            const listItem = document.createElement('li');

            const productName = document.getElementById('product-name').value;
            const quantity = document.getElementById('quantity').value;
            const text = document.createElement('span');
            text.textContent = `${quantity}x ${productName}`;

            listItem.appendChild(text);

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '5px';
                img.style.marginRight = '10px';

                listItem.prepend(img);
            };
            reader.readAsDataURL(imageUpload.files[0]);

            shoppingList.appendChild(listItem);

            form.reset();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }
  