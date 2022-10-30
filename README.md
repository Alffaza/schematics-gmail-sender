
install dependencies
``` 
npm install 
```

make a .env file to login gmail account

```
USEREMAIL=""
PASSWORD=""
```

fill in `peserta.csv`, (feel free to add more columns depending on the template, however `email` column is used for the destination email)

fill in `template/body.txt` and `template/subject.txt`  
instances of a column name surrounded by `#` will be replaced by the columns value

run the program
```
node send_gmail.js
```

if any error occurs during login, you can refresh or page back to login manually and the program will continue once you have logged in
