# Entrega-Final-Proyecto-Final
Ultima entrega del proyecto final para el curso de Backend en Coderhouse

<h2>Instrucciones para la corrección:</h2>

Se creo una API REST con 3 rutas principales:
/users
/productos
/carrito

Al entrar a la ruta raiz se presenta una pantalla que posee 2 botones, login y register. Con login se va a la ruta "/users/login" y con register a la ruta "/users/register".

<h4>/users</h4>

Hay dos rutas dentro que son /login y /register. Si el usuario esta autenticado, y tiene una sesión activa, al intentar entrar a alguna de esas rutas se lo redirecciona
a la ruta /users, donde se muestran los datos del ecommerce, que son los productos agregados y el carrito con los productos que tenga adentro.

<hr>

<h4>/productos</h4>

Dentro de esta ruta se encuentran:

/guardar
/listar
/actualizar
/borrar

<h6>/productos/guardar</h6>
Ruta POST donde se ingresan productos nuevos 

<h6>/productos/listar</h6>
Ruta GET donde se ven los productos agregados

<h6>/productos/actualizar</h6>
Ruta PUT donde se actualizan individualmente los productos ingresando por parametros el _id de mongo del producto a actualizar y los nuevos datos del mismo

<h6>/productos/borrar</h6>
Ruta DELETE donde se borra un producto a partir del _id de mongo ingresado por parametros.

<hr>

<h4>/carrito</h4>

Dentro se encuentran las rutas:

/guardar
/listar
/actualizar
/borrar

<h6>/carrito/guardar</h6>
Ruta POST donde se agregan productos al carrito a partir del _id de mongo del producto que se quiera.

<h6>/carrito/listar</h6>
Ruta GET donde se ven los contenidos del carrito

<h6>/carrito/actualizar</h6>
Ruta PUT donde se pueden actualizar y cambiar el contenido del carrito ingresando por parametros el _id del producto dentro del carrito

<h6>/carrito/borrar</h6>
Ruta DELETE donde se borra el carrito y todos su contenido
