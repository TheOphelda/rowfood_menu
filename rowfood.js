const menuBtns = document.querySelectorAll('.menu-btn');
const foodItems = document.querySelectorAll('.food-item'); 

let activeBtn = "featured";

showFoodMenu(activeBtn);

menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        resetActiveBtn();
        showFoodMenu(btn.id);
        btn.classList.add('active-btn');
    });
});

function resetActiveBtn(){
    menuBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}

function showFoodMenu(newMenuBtn){
    activeBtn = newMenuBtn;
    foodItems.forEach((item) => {
        if(item.classList.contains(activeBtn)){
            item.style.display = "grid";
        } else {
            item.style.display = "none";
        }
    });
}




// Récupérer les éléments du DOM
const quantityInputs = document.querySelectorAll('.quantity-input');
const btnMinus = document.querySelectorAll('.btn-minus');
const btnPlus = document.querySelectorAll('.btn-plus');
const btnOrder = document.getElementById('btnOrder');
const orderSummaryContainer = document.getElementById('order-summary');

// Ajouter des gestionnaires d'événements aux boutons
btnMinus.forEach((btn, index) => {
  btn.addEventListener('click', () => decreaseQuantity(index));
});

btnPlus.forEach((btn, index) => {
  btn.addEventListener('click', () => increaseQuantity(index));
});

// Fonction pour diminuer la quantité
function decreaseQuantity(index) {
  const currentValue = parseInt(quantityInputs[index].value);
  if (currentValue > 0) {
    quantityInputs[index].value = currentValue - 1;
  }

  updateOrderButtonStatus();
}

// Fonction pour augmenter la quantité
function increaseQuantity(index) {
  const currentValue = parseInt(quantityInputs[index].value);
  quantityInputs[index].value = currentValue + 1;

  updateOrderButtonStatus();
}

// Fonction pour mettre à jour l'état du bouton de commande
function updateOrderButtonStatus() {
  const totalQuantity = Array.from(quantityInputs).reduce((total, input) => total + parseInt(input.value), 0);
  btnOrder.disabled = totalQuantity === 0;
}

// Gestionnaire d'événement pour la validation de la commande
btnOrder.addEventListener('click', displayOrderSummary);

// Fonction pour afficher le récapitulatif de la commande
// Fonction pour afficher le récapitulatif de la commande
function displayOrderSummary() {
  let orderSummary = '';
  let total = 0;

  quantityInputs.forEach((input, index) => {
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      const product = input.closest('.food-item');
      const name = product.querySelector('.food-name').textContent;
      const price = product.querySelector('.food-price').textContent;

      // Calculer le sous-total pour chaque produit
      const subtotal = parseInt(price.replace('$', '')) * quantity;
      total += subtotal;

      // Ajouter les détails du produit au récapitulatif de la commande
      orderSummary += `${name} - Quantité : ${quantity} - Sous-total : ${subtotal} Fcfa \n`;
    }
  });

  // Ajouter le montant total au récapitulatif de la commande
  orderSummary += `Total : ${total} Fcfa `;

  // Demander une confirmation à l'utilisateur
  const confirmation = confirm(`Êtes-vous sûr de vouloir passer cette commande?\n\n${orderSummary}`);

  // Vérifier la confirmation de l'utilisateur
  if (confirmation) {
    // Effectuer des actions supplémentaires pour valider la commande
    alert("Commande validée !");
    // Réinitialiser les quantités ou effectuer d'autres tâches si nécessaire
  } else {
    // L'utilisateur a annulé la commande, retourner au menu ou effectuer d'autres tâches si nécessaire
  }
}


