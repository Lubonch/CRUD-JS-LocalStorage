const formulario = document.querySelector('#formulario');
const listProductos = document.getElementById('listaProductos');
const elimTodo = document.querySelector('#eliminartodo');
const buscar = document.querySelector('#buscar');
let arrayProductos = [];
let lastId = 0;

//functions

const CreateProduct = (idprod, producto, cantidad, precio) => { //Esto crea Productos

    let item = {
      id: idprod,        
      producto: producto,
      cantidad: cantidad,
      precio: precio
    }
    arrayProductos = arrayProductos || [];
    arrayProductos.push(item);
    SetIdOnls();
    return item;
}

const LoadLS = () => { //carga el arrar de productos en el LS

    localStorage.setItem('productos', JSON.stringify(arrayProductos));
  
    ReadLS();
  
  }

const ReadLS = () => { //se encarga de leer el Ls y cargarlo en el html
    Loadtablehead();
    LStoArray();

    LoadID();

    if(arrayProductos != null){
        arrayProductos.forEach(element => {
            Loadtablecontent(element);  
        });
    }
}

const DeleterLS(valor) = (idproducto) =>{ //se encarga de dar de baja un producto
    let arrayIndex = FindArrayIndex(idproducto);
    arrayProductos.splice(arrayIndex, 1);
    LoadLS();
}

const ModifLS = (idproducto) =>{ //me permite modificar un producto
    let arrayIndex = FindArrayIndex(idproducto);//busco el indice del producto que quiero modificar
    let modnom = window.prompt("Producto: ");
    let modcant = window.prompt("Cantidad: ");
    let modpre = window.prompt("Precio: ");

    if(modnom != null && modnom != 0) arrayProductos[arrayIndex].producto = modnom;

    if(modcant != null && modcant != 0) arrayProductos[arrayIndex].cantidad = modcant;

    if(modpre != null && modpre != 0) arrayProductos[arrayIndex].precio = modpre;
    
    LoadLS();
}

const DeleteAllLS = () => { //elimina todo el localstorage
    localStorage.removeItem('productos');
    LStoArray();
    LoadLS();
}

const SearchLS = (searchvalue) =>{ //se encarga de buscar cosas dentro del LS
    //alert("En construcción ¯\\\_(ツ)_/¯");
    Loadtablehead();

    if(arrayProductos != null){
        arrayProductos.forEach(element => {
                if(element.producto.startsWith(searchvalue)){ //itero sobre el array de objetos buscando los elementos donde el nombre de producto inicie con el string de la caja de busqueda
                    Loadtablecontent(element);
                }
        }   );
    }

}

const Loadtablehead = () => {
    listProductos.innerHTML = `<table>
                                <tr>
                                    <th class="column-0">ID</th>
                                    <th class="column-1">Producto</th>
                                    <th class="column-2">Cantidad</th>
                                    <th class="column-3">Precio</th>
                                    <th class="column-4"></th>
                                </tr>
                               </table>`
}
const Loadtablecontent = (element) => {
    listProductos.innerHTML += 
    `<div class="alert alert-danger" role="alert">
        <table>
            <tr>
                <td class="column-0"><b>${element.id}</b></td>
                <td class="column-1"><b>${element.producto}</b></td>
                <td class="column-2"><b>${element.cantidad}</b></td>
                <td class="column-3">$<b>${element.precio}</b></td>
                <td class="column-4">
                    <span class="float-right">
                    <i class="material-icons">create</i>
                    <i class="material-icons">delete_forever</i>
                    </span>
                </td>
            </tr>
        </table>
    </div>`
}

const LStoArray = () =>{
    arrayProductos = JSON.parse(localStorage.getItem('productos')|| "[]");
}

const SetIdOnls = () =>{
    localStorage.setItem('lastid', lastId);
}

const LoadID = () =>{
    lastId = localStorage.getItem('lastid') || 0;
}

const FindArrayIndex = (value) =>{
    return  arrayProductos.findIndex((e) => e.id == value);
}

//Events listeners

elimTodo.addEventListener('submit', DeleteAllLS);

formulario.addEventListener('submit', (item) => {
        item.preventDefault();
        lastId++;
        let productoNom = document.querySelector('#nombreProducto').value;
        let productoCant = document.querySelector('#cantidad').value;
        let productoPrice = document.querySelector('#precio').value;

        CreateProduct(lastId, productoNom, productoCant, productoPrice);
        LoadLS();

        formulario.reset();
        
    });

document.addEventListener('DOMContentLoaded', ReadLS)

listProductos.addEventListener('click', (e) => {
    e.preventDefault();
    const valor = e.path[3].childNodes[1].childNodes[0].innerHTML;
    
    if(e.target.innerHTML === 'create'){
        ModifLS(valor);
    }else if (e.target.innerHTML === 'delete_forever'){
        DeleterLS(valor);
    }
})

buscar.addEventListener('submit', (e) => {
    e.preventDefault();
    e = document.getElementById("busqueda").value;
    SearchLS(e);
});
