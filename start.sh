#!/bin/bash
set -e  # dừng script nếu có lỗi

echo "==== 1. Build FE ===="
cd FE
npm install
npm run build

echo "==== 2. Build Docker images ===="
cd ..
docker build -t spring_be ./BE
docker build -t react_fe ./FE

echo "==== 3. Stop old containers (nếu có) ===="
docker rm -f be fe || true

echo "==== 4. Run BE container ===="
docker run -d --name be -p 8080:8080 spring_be

echo "==== 5. Run FE container ===="
docker run -d --name fe -p 3000:80 react_fe

echo "==== ✅ All done! ===="
echo "FE: http://localhost:3000"
echo "BE: http://localhost:8080"