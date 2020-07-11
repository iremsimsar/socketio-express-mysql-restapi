# SOCKET.-O-Express-Sequelize-MYSQL-With-Node.js-Rest-API-

Socket.io her platformda çalışan güvenilir ve hızlı olmaya odaklanmış, gerçek zamanlı,
çift yönlü ve olay tabanlı bir iletişimi sağlayan yapıdır.

Bu projede, Express, MySQL veritabanı ile Sequelize Ve Socket.io kullanılarak Node.js Rest API oluşturuldu.

Veri Tabanı Oluştur

create database restapi;  

Paketler

$ npm install express --save
$ npm install jsonwebtoken --save
$ npm install nodemon --save
$ npm install sequelize --save
$ npm install bcryptjs --save 
$ npm install body-parser --save
$ npm install mysql2 --save
$ npm install socket.io --save


Test

Test etmek için önce paketleri yükleyin ve çalıştırın.
$ npm install
$ npm start

Apide oluşturulan servisler ise aşağıdaki gibidir.

S1)
 http://localhost:3000/user/signup  //(POST) kullanıcı oluşturmak için kullanılır

 {
     "name": "person1",

     "username": "person1",

     "email": "person1@gmail.com",

     "roles": "user",  

     "password": "hmt123456"
 }


S2) 
 http://localhost:3000/signin  //(POST methoduyla istekte bulunulmalı) oturum açmak için kullanılır.
 {

     "email": "person1@gmail.com",

     "password": "hmt123456"
 }



S3)
http://localhost:3000/user/list  //(GET methoduyla istekte bulunulmalı)  kullanıcı listelemek için kullanılır.

