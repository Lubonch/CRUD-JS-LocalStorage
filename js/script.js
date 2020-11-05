const formulario = document.querySelector('#formulario');
const listProductos = document.getElementById('listaProductos');
const elimTodo = document.querySelector('#eliminartodo');
const buscar = document.querySelector('#buscar');
let arrayProductos = [];


const CrearProducto = (producto, cantidad, precio) => { //Esto crea Productos

    let item = {
      producto: producto,
      cantidad: cantidad,
      precio: precio
    }
    arrayProductos = arrayProductos || [];
    arrayProductos.push(item);
  
    return item;
}

const AltaLS = () => { //carga el arrar de productos en el LS

    localStorage.setItem('productos', JSON.stringify(arrayProductos));
  
    LeerLS();
  
  }

const LeerLS = () => { //se encarga de leer el Ls y cargarlo en el html
    Loadtablehead();
    LStoArray();

    if(arrayProductos != null){
        arrayProductos.forEach(element => {
            Loadtablecontent(element);  
        });
    }
}

const BajaLS = (producto) =>{ //se encarga de dar de baja un producto
    let arrayIndex = arrayProductos.findIndex((e) => e.producto === producto);
    arrayProductos.splice(arrayIndex, 1);
    AltaLS();
}

const ModifLS = (producto) =>{ //me permite modificar un producto
    let arrayIndex = arrayProductos.findIndex((e) => e.producto === producto);//busco el indice del producto que quiero modificar
    let modnom = window.prompt("Producto: ");
    let modcant = window.prompt("Cantidad: ");
    let modpre = window.prompt("Precio: ");

    if(modnom != null) arrayProductos[arrayIndex].producto = modnom;

    if(modcant != null) arrayProductos[arrayIndex].cantidad = modcant;

    if(modpre != null) arrayProductos[arrayIndex].precio = modpre;
    
    AltaLS();
}

const EliminarLS = () => { //elimina todo el localstorage
    localStorage.clear();
    LStoArray();
    AltaLS();
}

const BuscarLS = (searchvalue) =>{ //se encarga de buscar cosas dentro del LS
    //alert("En construcción ¯\\\_(ツ)_/¯");
    Loadtablehead();

    if(arrayProductos != null){
        arrayProductos.forEach(element => {
                if(element.producto.startsWith(searchvalue)){ //itero sobre el array de objetos buscando los elementos donde el nombre de producto inicie con el string de la caja de busqueda
                    console.log("Encontre! "+element.producto);
                    Loadtablecontent(element);
                }
        }   );
    }

}

const Loadtablehead = () => {
    listProductos.innerHTML = `<table>
                                <tr>
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
elimTodo.addEventListener('submit', EliminarLS);

formulario.addEventListener('submit', (item) => {
        item.preventDefault();

        let productoNom = document.querySelector('#nombreProducto').value;
        let productoCant = document.querySelector('#cantidad').value;
        let productoPrice = document.querySelector('#precio').value;

        CrearProducto(productoNom, productoCant, productoPrice);
        AltaLS();

        formulario.reset();
        
    });

document.addEventListener('DOMContentLoaded', LeerLS)

listProductos.addEventListener('click', (e) => {
    e.preventDefault();
    const valor = e.path[3].childNodes[1].childNodes[0].innerHTML;
    console.log(valor);
    
    if(e.target.innerHTML === 'create'){
        ModifLS(valor);
    }else if (e.target.innerHTML === 'delete_forever'){
        BajaLS(valor);
    }
})

buscar.addEventListener('submit', (e) => {
    e.preventDefault();
    e = document.getElementById("busqueda").value;
    console.log("Quiero encontrar: "+e);
    BuscarLS(e);
});
