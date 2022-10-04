#!/bin/bash
scp -i "./prod/TLGenesis.pem" -r "./src" tsconfig.json ec2-user@ec2-174-129-50-55.compute-1.amazonaws.com:/home/ec2-user
exec bash
