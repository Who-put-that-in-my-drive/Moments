# Deploying Node.js Express Server

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
sudo amazon-linux-extras install epel
sudo yum install p7zip -y
sudo cp /usr/bin/7za /usr/bin/7z
```

## Deploying server to EC2 instance

### Building the express server

Run the build command from the root of the project, `npm run build-server`.

### Receive credentials
A credentials .pem file is required to ssh into the ec2 instance. Please place the .pem file you have received into the `prod` folder (the current directory this README.md file is in).

## Transferring the server to the instance
In order to complete this step, please run the `prepare.sh` bash script in the `prod` folder.

## SSH into the ec2 instance
```
ssh -i "TLGenesis.pem" ec2-user@ec2-54-235-34-39.compute-1.amazonaws.com
```

### Deploy the server
Now ssh into the ec2 instance by using your IDE's console and run the following one-liner:
```
rm -r *
7z x prod.zip
cd dist
```
continuing on...
```
fuser -k 5000/tcp
```
then...
```
npm i && screen npm run start > output.log &
```
then you can hit enter and that's all!
