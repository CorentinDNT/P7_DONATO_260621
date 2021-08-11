P7_DONATO_260621

clôner le projet / repo Git

Installez les dépendances comme pour n'importe quel projet(assurez vous d’avoir mySql)

Dans le dossier backend => config => config.json mettez-y votre username et votre password ainsi que les bons ports a uttiliser pour la base de development

créer localement la base de donnée « groupomania »

assurez vous que sequelize-cli soit bien installé puis, Dans l'invite de commande faites : cd backend , tapez ensuite: sequelize db:create , puis sequelize db:migrate

faites npm start.

Pour le frontend déplacez vous dans le dossier frontend à l’aide de la commande cd frontend puis npm start

Vous pouvez maintenant vous créer compte et changer la ligne "isAdmin" à 1 pour créer un compte administrateur 
