# Restaurant "La comanda"

# Integrantes:
 - ### Sabrina Veiga  [![](/images/github.png)](https://github.com/Sabsolvei  "Github de Sabrina Veiga")
 
## ¿De que se trata el proyecto?
_El proyecto consiste en desarrollar una aplicacion Web Para optimizar la gestión y control del uso de las mesas y los pedidos de los clientes de un restaurante. Además proporciona información para la gestión del comercio.._

## ¿Como se va a desarrollar el proyecto?
_El proyecto es desarrollado a traves de [Angular 7 ](https://angular.io/ "Angular "), utilizando como base de datos [Firebase](https://firebase.google.com/ "Firebase")_

***

### Perfiles de usuarios:
- ##### Socio
- ##### Mozo
- ##### Cocinero
- ##### Cervecero
- ##### Bartender
- ##### Cliente

***

# Funcionalidades:


## MOZO

![MOZO](/src/assets/mozo_mesas.JPG)
 - ### Visualizar el estado de cada mesa. Libre, esperando, comiendo y pagando.
 - ### Cargar una nueva comanda asociada a una mesa. Dicha comanda tiene todos los pedidos hechos por el cliente.
 - ### Cargar cada pedido del cliente de forma independiente para poder gestionarlo en distintos momentos: Modiricarlo o eliminarlo mientras no haya sido derivado al sector (cocina, bar, cervecería), derivarlo al sector cuando quiera que se ponga en marcha, y entregarlo cuando todos los sectores involucrados en el pedido hayan modificado el estado a Listo.
 - ### Visualizar el detalle del valor de cada producto, cantidad y el monto gastado.
 - ### Buscar o registrar un cliente para asociarlo a la mesa.
 - ### Cuando el cliente lo llama, el mozo es notificado por colores titilantes.
 - ### Cuando el cliente solicita pagar, el mozo debe modificar el estado de la mesa a Cobrar para que el socio cobre y cierre la mesa.


## SOCIO -> ADMIN

![ADMIN](/src/assets/admin_mesas.JPG)

 - ### Tiene todos los mismos permisos del mozo para gestionar los pedidos, excepto el de Cobrar. En su lugar es tiene la función de cerrar la mesa para que quede en estado Libre.
 - ### Registrar empleados con sus respectivos perfiles
 - ### Visualizar el gráfico que indica los productos más vendidos.
 - ### Descargar en pdf el gráfico.
 - ### Descargar el excel con los datos de los empleados


## COCINERO | BARTENDER | CERVECERO

![COCINERO](/src/assets/Cocinero_Bartender_Cervecero.JPG)
 - ### Visualizar la lista de pedidos que tiene en pendiente. Puede aumentar o disminuir el tiempo estimado de a 5 min. Cuando lo ponga en marcha debe cambiar su estado a En Preparación.
 - ### Visualizar la lista de pedidos en preparacion. Cuando termine de prepararlo debe cambiar su estado a Listo.
 - ### Visualizar la lista de pedidos listos que no hayan sido entregados por el mozo.


## CLIENTE

![CLIENTE](/src/assets/Cliente_suComanda.JPG)

 - ## Ingresar a la aplicacion como cliente anónimo o como cliente registrado.
 - ## En caso de ingresar como cliente anónimo, su comanda debe ser buscada por el código de mesa.
 - ## Visualizar su comanda con el detalle de cada pedido y del monto total gastado hasta el momento.
 - ## Llamar al mozo o solicitarle la cuenta.
 - ## Completar una encuesta sobre los distintos aspectos del restaurant

 
