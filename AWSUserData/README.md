# UserData 를 이용하여, AWS 에 Node 설치 및 싫행. 

## Node 프로그램 생성. 

### Mode 설치 

[NodeJS Download](https://nodejs.org/) 에서 NodeJs 를 다운로드 받아 설치한다. 

### Node 개발 준비

```
npm init -y 
```

```
npm install express --save
npm install body-parser --save
```

### Node Express 프로그래밍 

```
const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send('Hello express!!');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Node app is running on port: ' + port);
});
```

### 실행 및 테스트 하기. 

```
node app.js
```

```
curl localhost:8080

Hello express!!
```

## AWS UserData 작성하기. 

UserData.txt

```
#! /bin/bash
sudo yum update -y
sudo yum install -y node 
sudo yum install -y git 

```
