#!/bin/bash
scp -i "TLGenesis.pem" -r "../index.ts" "../package.json" tsconfig.json ec2-user@ec2-174-129-50-55.compute-1.amazonaws.com:/home/ec2-user
exec bash
