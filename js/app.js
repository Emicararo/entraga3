

const confirmacion = prompt("Sos Socio del Club Atletico Belgrano? SI/NO").toUpperCase();

if (confirmacion === "SI") {
    class Carrito {
        constructor() {
            this.carritoVisible = false;
            if (document.readyState == 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.ready());
            } else {
                this.ready();
            }
        }

        ready() {
            const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
            for (let i = 0; i < botonesEliminarItem.length; i++) {
                const button = botonesEliminarItem[i];
                button.addEventListener('click', () => this.eliminarItemCarrito(button));
            }

            const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
            for (let i = 0; i < botonesSumarCantidad.length; i++) {
                const button = botonesSumarCantidad[i];
                button.addEventListener('click', () => this.sumarCantidad(button));
            }

            const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
            for (let i = 0; i < botonesRestarCantidad.length; i++) {
                const button = botonesRestarCantidad[i];
                button.addEventListener('click', () => this.restarCantidad(button));
            }

            const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
            for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
                const button = botonesAgregarAlCarrito[i];
                button.addEventListener('click', () => this.agregarAlCarritoClicked(button));
            }

            document.getElementsByClassName('btn-pagar')[0].addEventListener('click', () => this.pagarClicked());
        }

        pagarClicked() {
            alert("Gracias por la compra");
            const carritoItems = document.getElementsByClassName('carrito-items')[0];
            while (carritoItems.hasChildNodes()) {
                carritoItems.removeChild(carritoItems.firstChild);
            }
            this.actualizarTotalCarrito();
            this.ocultarCarrito();
        }

        agregarAlCarritoClicked(button) {
            const item = button.parentElement;
            const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
            const precio = item.getElementsByClassName('precio-item')[0].innerText;
            const imagenSrc = item.getElementsByClassName('img-item')[0].src;
            this.agregarItemAlCarrito(titulo, precio, imagenSrc);
            this.hacerVisibleCarrito();
        }

        hacerVisibleCarrito() {
            this.carritoVisible = true;
            const carrito = document.getElementsByClassName('carrito')[0];
            carrito.style.marginRight = '0';
            carrito.style.opacity = '1';
            const items = document.getElementsByClassName('contenedor-items')[0];
            items.style.width = '60%';
        }

        agregarItemAlCarrito(titulo, precio, imagenSrc) {
            const item = document.createElement('div');
            item.classList.add('item');
            const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

            const nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
            for (let i = 0; i < nombresItemsCarrito.length; i++) {
                if (nombresItemsCarrito[i].innerText == titulo) {
                    alert("El item ya se encuentra en el carrito");
                    return;
                }
            }

            const itemCarritoContenido = `
                <div class="carrito-item">
                    <img src="${imagenSrc}" width="80px" alt="">
                    <div class="carrito-item-detalles">
                        <span class="carrito-item-titulo">${titulo}</span>
                        <div class="selector-cantidad">
                            <i class="fa-solid fa-minus restar-cantidad"></i>
                            <input type="text" value="1" class="carrito-item-cantidad" disabled>
                            <i class="fa-solid fa-plus sumar-cantidad"></i>
                        </div>
                        <span class="carrito-item-precio">${precio}</span>
                    </div>
                    <button class="btn-eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            item.innerHTML = itemCarritoContenido;
            itemsCarrito.append(item);

            item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', () => this.eliminarItemCarrito(item));

            const botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
            botonRestarCantidad.addEventListener('click', () => this.restarCantidad(item));

            const botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
            botonSumarCantidad.addEventListener('click', () => this.sumarCantidad(item));

            this.actualizarTotalCarrito();
        }

        sumarCantidad(item) {
            const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
            let cantidadActual = Number(cantidadItem.value);
            cantidadActual++;
            cantidadItem.value = cantidadActual;
            this.actualizarTotalCarrito();
        }

        restarCantidad(item) {
            const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
            let cantidadActual = Number(cantidadItem.value);
            cantidadActual--;
            if (cantidadActual >= 1) {
                cantidadItem.value = cantidadActual;
                this.actualizarTotalCarrito();
            }
        }

        eliminarItemCarrito(item) {
            item.remove();
            this.actualizarTotalCarrito();
            this.ocultarCarrito();
        }

        ocultarCarrito() {
            const carritoItems = document.getElementsByClassName('carrito-items')[0];
            if (carritoItems.childElementCount == 0) {
                const carrito = document.getElementsByClassName('carrito')[0];
                carrito.style.marginRight = '-100%';
                carrito.style.opacity = '0';
                this.carritoVisible = false;
                const items = document.getElementsByClassName('contenedor-items')[0];
                items.style.width = '100%';
            }
        }

        actualizarTotalCarrito() {
            const carritoContenedor = document.getElementsByClassName('carrito')[0];
            const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
            let total = 0;

            for (let i = 0; i < carritoItems.length; i++) {
                const item = carritoItems[i];
                const precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

                const precioTexto = precioElemento.innerText;
                const precio = Number(precioTexto.replace('$', '').replace(',', ''));

                const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
                const cantidad = Number(cantidadItem.value);

                total += precio * cantidad;
            }

            const totalCarritoElemento = document.getElementsByClassName('carrito-precio-total')[0];
            totalCarritoElemento.innerText = '$' + total.toFixed(2) + '0';
        }
    }

    const carrito = new Carrito();
} else {
    alert("Debes ser socio para comprar en esta seccion");
}