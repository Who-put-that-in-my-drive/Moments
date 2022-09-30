#!/bin/bash
scp -i "TLGenesis.pem" -r index.ts package.json ec2-user@ec2-3-93-63-205.compute-1.amazonaws.com:/home/ec2-user # tsconfig.json already pre-configured on the server
ssh -i "TLGenesis.pem" ec2-user@ec2-3-93-63-205.compute-1.amazonaws.com 'npm i && nohup npm run start > output.log &'
exec bash
