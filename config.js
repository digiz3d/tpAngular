//Conf for mail send
var config = {
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: 'ApiAirbnbLike@outlook.com',
        pass: 'r41NBow$'
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
    }
};


module.exports = {
    'jwtSecret': 'gfhduighdpgfdgdgd+45R68GT7YOH8UBHIJLLBHIBI^$ù',
    'pwdSecret': 'fàç_uesàu_çke$pg,sùg6%¨§L.OIJD?.P9H87',
    'database': 'mongodb://admin:123456*m@airbnblike-shard-00-00-rcbjh.mongodb.net:27017,airbnblike-shard-00-01-rcbjh.mongodb.net:27017,airbnblike-shard-00-02-rcbjh.mongodb.net:27017/angularbank?ssl=true&replicaSet=airbnblike-shard-0&authSource=admin',
    'mailConfig' : config,
};