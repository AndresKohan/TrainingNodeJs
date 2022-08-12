# TrainingNodeJs
Cloudx Node Js training

Challenge

Desarrollar una API sin autenticación que permita hacer un CRUD de la entidad `Article`, con la siguiente spec:
GET /api/articles
Retorna un array de `articles` con todos los Article almacenados en MongoDB.
GET /api/articles/{id}
Retorna un object `article` con los datos de un Article buscado por _id almacenado en MongoDB.
POST /api/articles
Almacena un Article en MongoDB con la siguiente estructura:
title: required string
body: required string
author: required string
createdAt (autogenerado)
updatedAt (autogenerado)
Retorna 201 Created.
PUT /api/articles/{id}
Sobreescribe el un Article ya almacenado en MongoDB buscado por _id.
Retorna 200 OK.
DELETE /api/articles/{id}
Elimina un Article almacenado en MongoDB por _id.
Elimina todos los Comment almacenado en MongoDB asociados al Article dado.
Retorna 200 OK.


Desarrollar una API para los Comment asociados a los Article previamente mencionados con la siguiente spec:
GET /api/comments?article={articleId}
Retorna un array de comments almacenados en MongoDB filtrados por el atribute `article`.
POST /api/comments
Create un Comment en MongoDB con la siguiente estructura:
body: required string
author: required string
article: ObjectId (Referencia al Article a.k.a. FK)
createdAt (autogenerado)
updatedAt (autogenerado)
Retorna 201 Created.
PUT /api/comments/{id}
Sobreescribe el un Comment ya almacenado en MongoDB buscado por _id.
Retorna 200 OK.
DELETE /api/comments/{id}
Elimina un Comment almacenado en MongoDB por _id.
Retorna 200 OK.

Entregar en un repositorio Git en GitHub, se permite forkear el repositorio de ejemplo trabajado en clase: https://github.com/navarroaxel/crud-express
Utilizar TypeScript para todo el proyecto.
Agregar los unit tests para los servicios y controllers.

