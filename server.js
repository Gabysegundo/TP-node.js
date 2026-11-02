const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // GET /imagen
  if (req.method === "GET" && req.url === "/imagen") {
    try {
      const imgPath = path.join(__dirname, "imagen.jpg");
      const data = await fs.readFile(imgPath);

      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Imagen no encontrada");
    }
  }

  // POST /data
  else if (req.method === "POST" && req.url === "/data") {
    try {
      const contenido = {
        curso: "BackEnd",
        tema: "node.js",
      };

      await fs.writeFile("data.json", JSON.stringify(contenido, null, 2));

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ mensaje: "Archivo data.json creado correctamente" }),
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error al crear el archivo");
    }
  }

  // PUT /update
  else if (req.method === "PUT" && req.url === "/update") {
    try {
      await fs.writeFile("info.txt", "Archivo actualizado correctamente");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Archivo info.txt actualizado");
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error al actualizar el archivo");
    }
  }

  // DELETE /mensaje
  else if (req.method === "DELETE" && req.url === "/mensaje") {
    try {
      await fs.unlink("message.txt");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Archivo message.txt eliminado correctamente");
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Error: El archivo message.txt no existe");
    }
  }

  // Ruta no encontrada
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
