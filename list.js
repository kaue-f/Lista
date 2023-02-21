// Seleção de Item
const lista = document.querySelector(".lista");
const alerta = document.querySelector(".alerta");
const nome = document.getElementById("nome");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".lista-container");
const itemLista = document.querySelector(".lista-item");
const limparBtn = document.querySelector(".limpar-btn");

// Editar Opção
let editElemento;
let editFlag = false;
let editID = "";

// Lista de Eventos
lista.addEventListener("submit", addItem); // Enviar  item da lista
limparBtn.addEventListener("click", clearItens); // Lmpar lista
window.addEventListener("DOMContentLoaded", setupItens); // Load  de itens

// Função da lista

// Função de adiciona item
function addItem(e) {
  e.preventDefault();
  const valor = nome.valor;
  const id = new Date().getTime().toString();

  if (valor !== "" && !editFlag) {
    const elemento = document.createElement("article");
    let artcl = document.createAttribute("data-id");
    artcl.valor = id;
    elemento.setAttributeNode(artcl);
    elemento.classList.add("item-button");
    elemento.innerHTML = `<p class="item-nome">${valor}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn"> 
              <i class="bi bi-pencil-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="bi bi-trash3"></i>
                </button>
            </div>
            `;

    // Evento de button
    const deleteBtn = elemento.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = elemento.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // Adicionar elemento
    itemLista.appendChild(elemento);
    //display de alerta
    displayAlerta("Item adicionado com Sucesso!", "success");
    // Apresentar
    container.classList.add("show-container");
    // Definir local de armazenamento
    addToLocalStorage(id, valor);
    // Definir local de armazenamento padrão
    setBackToDefault();
  } else if (valor !== "" && editFlag) {
    editElemento.innerHTML = valor;
    displayAlerta("Item editado!", "success");

    // Editar local de armazenamento
    editLocalStorage(editID, valor);
    setBackToDefault();
  } else {
    displayAlerta("Por Favor insirar o Item!", "danger");
  }
}

// Display de Alerta
function displayAlerta(text, action) {
  alerta.textContent = text;
  alerta.classList.add(`alerta-${action}`);
  // remove alerta
  setTimeout(function () {
    alerta.textContent = "";
    alerta.classList.remove(`alerta-${action}`);
  }, 1000);
}

// Limpar Itens
function clearItens() {
  const Itens = document.querySelectorAll(".item-button");
  if (Itens.length > 0) {
    Itens.forEach(function (item) {
      itemLista.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlerta("Lista Vazia!", "danger");
  localStorage.removeItem("itemLista");
}

// Deleta Itens
function deleteItem(e) {
  const elemento = e.currentTarget.parentElement.parentElement;
  const id = elemento.dataset.id;

  itemLista.removeChild(elemento);

  if (itemLista.children.length === 0) {
    container.classList.remove("show-cantainer");
  }
  displayAlerta("Item removido!", "danger");

  setBackToDefault();
  removeFromLocalStorage(id);
}

//Editar Itens
function editItem(e) {
  const elemento = e.currentTarget.parentElement.parentElement;
  editElemento = e.currentTarget.parentElement.previousElementSibling;

  nome.valor = editElemento.innerHTML;
  editFlag = true;
  editID = elemento.dataset.id;
  submitBtn.textContent = "edit";
}

// Definir padrão de volta
function setBackToDefault() {
  nome.valor = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

//local de armazenamento
function addToLocalStorage(id, valor) {
  const nome = { id, valor };
  let Itens = getLocalStorage();
  Itens.push(nome);
  localStorage.setItem("itemLista", JSON.stringify(Itens));
}
  
function getLocalStorage() {
  return localStorage.getItem("itemLista")
    ? JSON.parse(localStorage.getItem("itemLista"))
    : [];
}

function removeFromLocalStorage(id) {
  let Itens = getLocalStorage();

  Itens = Itens.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("itemLista", JSON.stringify(Itens));
}

function editLocalStorage(id, valor) {
  let Itens= getLocalStorage();

  Itens = Itens.map(function (item) {
    if (item.id === id) {
      item.valor = valor;
    }
    return item;
  });
  localStorage.setItem("itemLista", JSON.stringify(Itens));
}

//Configuração de Itens
function setupItens() {
  let Itens = getLocalStorage();

  if (Itens.length > 0) {
    Itens.forEach(function (item) {
      createItensLista(item.id, item.valor);
    });
    container.classList.add("show-container");
  }
}

function createItensLista(id, valor) {
  const elemento = document.createElement("article");
    let artcl = document.createAttribute("data-id");
    artcl.valor = id;
    elemento.setAttributeNode(artcl);
    elemento.classList.add("item-button");
    elemento.innerHTML = `<p class="item-nome">${valor}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn"> 
              <i class="bi bi-pencil-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="bi bi-trash3"></i>
                </button>
            </div>
            `;
      

   // Evento de button
   const deleteBtn = elemento.querySelector(".delete-btn");
   deleteBtn.addEventListener("click", deleteItem);
   const editBtn = elemento.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  
  itemLista.appendChild(elemento);
}