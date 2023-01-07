
### Mysql Setsup
mysqld --initialize-insecure --datadir=/Users/kurotaku/projects/mysql_data
mysql_ssl_rsa_setup --datadir=/Users/kurotaku/projects/mysql_data

### Mysql Running
mysqld -D --datadir=/Users/kurotaku/projects/mysql_data

### Mysql Sutdown
mysqladmin -u root shutdown 


yarn sequelize-cli model:generate --name User --attributes name:string,email:string,emailVerifiedAt:date,password:string