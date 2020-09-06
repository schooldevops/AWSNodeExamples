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
sudo yum install -y amazon-linux-extras
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install -y epel-release
sudo yum install -y nodejs
sudo yum install -y git

mkdir -p /user/home/ec2-user/app
cd /user/home/ec2-user/app

git clone https://github.com/schooldevops/AWSNodeExamples.git

cd AWSNodeExamples/AWSUserData/nodesample
npm install 

node app.js 

```

- 우선 yum 으로 패키지를 업데이트 한다. 
  ```
    sudo yum update -y
  ```
- 다음으로 amazon-linux-extras 를 설치한다. 
  ```
    sudo yum install -y amazon-linux-extras
  ```
- nodejs 를 설치하기 위해서 epel-release 를 설치한다. 
  ```
    sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    sudo yum install -y epel-release
  ```
- nodejs 를 설치한다. 
  ```
    sudo yum install -y nodejs
  ```
- source 를 가져오기 위해서 git 을 설치한다. 
  ```
    sudo yum install -y git
  ```
- 디렉토리를 생성하고, 소스를 clone 한 후, node 를 실행하도록 한다. 
  ```
    mkdir -p /user/home/ec2-user/app
    cd /user/home/ec2-user/app

    git clone https://github.com/schooldevops/AWSNodeExamples.git

    cd AWSNodeExamples/AWSUserData/nodesample
    npm install 

    node app.js 
  ```

## 테스트하기. 
이제 테스트를 수행해보자. 
인스턴스의 public ip 를 복사하고. 

```
https://<public_ip>:8080 을 해보자. 

Hello express!! 
```

Hello express!! 가 나오면 정상이다. 

우리는 userData 를 이용하여 필요한 어플을 설치하고, 소스를 clone 하는 등의 작업을 했다. 

## 참고
userData 는 인스턴스가 생성될때 딱 한번 실행된다. 
다시 node 를 실행하기 위해서는 서버가 실행될때 등록을 해주거나 다시 콘솔에 접속해서 node 를 실행해 주어야한다. 

예제를 위해서 인스턴스를 중지(Stop) 하거나, 재실행(Restart) 을 하면 브라우저로 접근해도 node 서버가 동작하지 않음을 알 수 있다. 

```

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
No packages needed for security; 2 packages available
Run "sudo yum update" to apply all updates.
[ec2-user@ip-172-31-27-161 ~]$ sudo su
[root@ip-172-31-27-161 ec2-user]# ls
[root@ip-172-31-27-161 ec2-user]# cd /user/home/ec2-user/

[root@ip-172-31-27-161 ec2-user]# cd app/
[root@ip-172-31-27-161 app]# ls
AWSNodeExamples

[root@ip-172-31-27-161 app]# cd AWSNodeExamples/
[root@ip-172-31-27-161 AWSNodeExamples]# ls
AWSUserData

[root@ip-172-31-27-161 AWSNodeExamples]# cd AWSUserData/
[root@ip-172-31-27-161 AWSUserData]# cd nodesample/
[root@ip-172-31-27-161 nodesample]# ls
app.js  node_modules  package.json  package-lock.json

[root@ip-172-31-27-161 nodesample]# node app.js
Node app is running on port: 8080
```

위와 같이 다시 실행하면 새로 생성된 ip 에 접근하면 같은 결과를 확인할 수 있다. 

