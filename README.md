🏃‍♂️ Para ejecutar migraciones

npm run migration:run

🔄 Para revertir la última migración

npm run migration:revert


✨ Para generar una nueva migración automáticamente

npm run migration:generate src/Infrastructure/Database/Migrations/CreateNuevaTabla

Generar valor seguro para CRYPTO_KEY

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

Aquí tienes un valor seguro para tu variable de entorno CRYPTO_KEY (32 bytes en base64):

```
9ceVPL3edDfMNW6GHQKv3X+//BpyZDS8lGT/59Q6R+U=
```

Puedes agregarlo a tu archivo .env así:
```
CRYPTO_KEY=9ceVPL3edDfMNW6GHQKv3X+//BpyZDS8lGT/59Q6R+U=
```

¿Te gustaría que te ayude a configurar el archivo .env o necesitas algo más?