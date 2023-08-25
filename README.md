## Run Locally

Clone the project

```bash
  git clone git@github.com:xtrap029/hos_front.git
```

Go to the project directory

```bash
  cd hos_front
```

Install dependencies

```bash
  npm install
```

Start the JSON Server

```bash
  npx json-server --watch db.json --port 3030
```

On another terminal within `hos_front` folder, start the app server

```bash
  npm start
```

You can unit test order item picking by running

```bash
  npm test
```

Enjoy :)
