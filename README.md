## 🎵 Back Player - API REST

_Back Player_ es una API REST en **Spring Boot** para gestionar y reproducir canciones, utilizando **MongoDB** como base de datos.  

### 🚀 Instalación y Ejecución  

#### 1️⃣ **Clonar el repositorio**  
```sh
git clone https://github.com/ssosag/back-player.git
cd back-player
```

#### 2️⃣ **Configurar la base de datos**  
Asegúrate de tener **MongoDB** instalado y ejecutándose en `localhost:27017`.  

#### 3️⃣ **Compilar el proyecto**  
```sh
mvn clean install
```

#### 4️⃣ **Ejecutar la aplicación**  
Puedes iniciar la aplicación de dos maneras:

- **Con Maven**  
  ```sh
  mvn spring-boot:run
  ```

- **Como un JAR independiente**  
  ```sh
  java -jar target/back-player-0.0.1-SNAPSHOT.jar
  ```

La API estará disponible en:  
🔗 `http://localhost:8080/api/song`

---

## 📌 Endpoints  

### 🔍 **Buscar canciones**  
```http
GET /api/song
```
**Parámetros opcionales:**  
- `title`: Filtra por título  
- `username`: Filtra por usuario  
- `size`: Filtra por tamaño  
- `fileName`: Filtra por nombre de archivo  

Ejemplo en **Postman** o **cURL**:
```sh
curl -X GET "http://localhost:8080/api/song?title=MySong"
```

---

### 🎵 **Subir una canción**  
```http
POST /api/song/upload
```
**Body:**  
- `song` (archivo `multipart/form-data`)  

Ejemplo en **Postman**:
1. En **Body**, selecciona `form-data`.  
2. Agrega la clave `"song"` y sube un archivo de audio.  

---

### ➕ **Crear una canción (sin archivo)**  
```http
POST /api/song
```
**Body (JSON):**
```json
{
  "title": "Mi Cancion",
  "username": "usuario123",
  "size": "5MB",
  "fileName": "mi_cancion.mp3"
}
```
Ejemplo en **cURL**:
```sh
curl -X POST "http://localhost:8080/api/song" -H "Content-Type: application/json" -d '{"title": "Mi Cancion", "username": "usuario123", "size": "5MB", "fileName": "mi_cancion.mp3"}'
```

---

### 💽 **Descargar una canción**  
```http
GET /api/song/{filename}
```
Ejemplo:
```sh
curl -O http://localhost:8080/api/song/mi_cancion.mp3
```

---

## 🛠 Tecnologías  

- **Spring Boot 3.4.3**  
- **MongoDB**  
- **Maven**  
- **Lombok**  
- **Spring Security (para cifrado con BCrypt)**  

---

## 📝 Notas  
Si necesitas configurar **CORS**, está habilitado con:  
```java
@CrossOrigin(origins = "*", allowedHeaders = "*")
```

Si tienes problemas con MongoDB, revisa que esté corriendo en `localhost:27017`.

---
