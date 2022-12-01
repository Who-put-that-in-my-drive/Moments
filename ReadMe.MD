# 🖼️ Moments

## ⚒️ Pre-requisites

- Node v16
- Code IDE
- AWS Account
- MongoDB Account

## 💭 Environment Variables

Please refer to the `dev.env` files located under `./client` and `./server`. Insert variables for each file and then rename those files to `.env`.

AWS deployments require AWS credentials to be set in their respective `credentials` and `config` files. Refer to Amazon's documentation [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

## 🎨 Stack

### Front-end

- React
- TypeScript
- Node.js
- Chakra UI

### Back-end

- Node.js
- React
- TypeScript
- Express.js
- Mongoose
- MongoDB (server)

### Cloud

- AWS
- Netlify
- GoDaddy
- Github

## 📄 Scripts

### To add git hooks
```sh
npx simple-git-hooks
```

### To install packages -- this will install all packages for front-end and back-end
```sh
npm install
```

### To add a package for front-end
```sh
npm install <package-name> -w client
```

### To add a package for back-end
```sh
npm install <package-name> -w server
```

### To run front-end and back-end app
```sh
npm run start-all
```

### To run front-end ONLY
```sh
npm start -w client
```

### To build front-end
```sh
npm build -w client
```

### To run back-end ONLY
```sh
npm start -w server
```

### To build the back-end
```sh
npm build -w server
```

### To run cloud services ONLY
```sh
npm start -w aws
```

### To deploy cloud services
```sh
npm deploy -w aws
```
