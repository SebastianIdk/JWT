# 🚀 Mini App JWT con Node.js

![Node.js](https://img.shields.io/badge/Node.js-14.x-green) ![JWT](https://img.shields.io/badge/JWT-JSON%20Web%20Token-blue)

## 📄 Descripción  
Esta pequeña aplicación en Node.js demuestra cómo emitir y verificar tokens JWT. Incluye un endpoint `/login` que retorna el token y un middleware que protege rutas comprobando firma y expiración. Todo se prueba fácilmente con Postman.

---

## ⚙️ Instalación  
1. Clonar el repositorio.  
2. Crear un archivo `.env` con:  
   ```dotenv
   JWT_SECRET=unSecretoSuperSeguro
   JWT_EXPIRES_IN=1h
   ```  
3. Instalar dependencias:  
   ```bash
   npm install
   ```

---

## 🚀 Ejecución  
```bash
node index.js
```  
Quedarás escuchando en `http://localhost:3000`.

---

## 🔑 Endpoints  
- **POST** `/login`  
  - Body JSON:  
    ```json
    { "username": "admin", "password": "1234" }
    ```  
  - Respuesta:  
    ```json
    { "token": "<tu_jwt_aquí>" }
    ```  
  ![Postman Login](https://via.placeholder.com/400x200.png?text=Postman+Login)

- **GET** `/protegido`  
  - Header:  
    ```
    Authorization: Bearer <tu_jwt_aquí>
    ```  
  - Respuesta exitosa:  
    ```json
    { "message": "Hola admin, accediste correctamente" }
    ```  

---

## 🔧 Flujo JWT  
1. El cliente solicita `/login` con credenciales.  
2. El servidor firma un payload (usuario, rol) y devuelve el JWT.  
3. El cliente guarda el token y lo envía en `Authorization: Bearer <token>`.  
4. El middleware valida firma y expiración antes de permitir acceso.  

