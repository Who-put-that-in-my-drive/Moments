# Back-end Node.js Express Server

## Pre-requisites

### Install node on the machine
We are currently using node v16

Start off by entering:
```
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash
```
then enter the following ...
```
sudo yum -y install gcc-c++ make nodejs
```

## SSH into the ec2 instance
```
ssh -i "TLGenesis.pem" ec2-user@ec2-174-129-50-55.compute-1.amazonaws.com
```

## Deploying server to EC2 instance

### Receive credentials
A credentials .pem file is required to ssh into the ec2 instance. Please place the .pem file you have received into the `server` folder (the current directory this README.md file is in).

### Prepare the server start-up
Files which need to be transferred to the server are the following:
- index.ts
- package.json

In order to complete this step, please run the `prepare.sh` bash script

Files which should already exist on the server are the following:
- tsconfig.json

### Deploy the server
Now ssh into the ec2 instance by using your IDE's console and run the following one-liner:
```
fuser -k 5000/tcp && npm i && screen npm run start > output.log &
```

### Updating API Routes
*Please refer to the readme.md file in the `./aws` directory*
