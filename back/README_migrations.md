Las migraciones ya estan hechas, solo deben poner los siguientes comandos en /back :

1. npx sequelize-cli db:migrate

Y si no existe todavia admin/admin:

1. npx sequelize-cli db:seed:all