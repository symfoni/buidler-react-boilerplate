# 🎻 Getting started with Symfoni. CHECK FOR TODOS

> The Buidler React Project generator 👷

We have taken what we ❤️ about [Buidler projects](https://buidler.dev/) and have extended it with the possibility to generate an React context with:

* contract loading
* web3modal, ethers v5 and typed interfaces out of the box
* a great abd simple way to store data outside of the TODO

This is so that for application developers, get a good, typed starting point from their contracts. Also it gives them a way to store stuff outside of the blockchain e.g. to solve the GDPR challenges with personal data and blockchain. We also wish to include more storage options i.e. to handle accounts, groups, roles and encryption, and store and retrieve the data fra arbitrary destinations. This is so enterprises can store part of their data on premise.

### How It's Made

We're building an aggregated CLI accross Buidler, Buidler plugins and Textile. This is done in Typescript.

### Team

 [🇳🇴 Jon Ramvi](https://github.com/ramvi/),  [🇳🇴 Robin Pedersen](https://github.com/RobertoSnap), [🇩🇪 Hendrik Bilges](https://github.com/elektronaut0815)

# Tutorial

This tutorial will TODO

TODO test igjen
TODO test på windows
TODO npm project must include code



## ⚙️ Setup new project

* Create an empty directory for the project and enter it:

`mkdir mySymfoniProject && cd mySymfoniProject`

* Use regular Buidler to create a project:

`npx @nomiclabs/buidler` 


>  If you don't have solidity files ready, select the `Create a sample project`. You must choose this if you wish to follow this tutorial all the way through. The npx command will ask you to install a couple of packages with npm. Copy, paste and execute the npm command.

> If you do have projects files to include, choose `Create an empty buidler.config.js` and TODO

* Add Chai for testing in the dev environment:

`npm add --save-dev chai @types/node @types/mocha @types/chai`

* Create a deploy folder in the root:

`mkdir deploy`

* And [create a deployment file for each of your smart contracts](https://buidler.dev/plugins/buidler-deploy.html#deploy-scripts). If you chose to create a sample project in the first step, we have created a simple deploy script that you can use: 

```bash
echo 'import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function(bre: BuidlerRuntimeEnvironment) {
  const { deploy } = bre.deployments;
  const { deployer } = await bre.getNamedAccounts();
  await deploy("Greeter", {
    from: deployer,
    // gas: 4000000,
    args: ["Hello from Buidler React!"],
  });
};
export default func;' > deploy/Greeter.ts
```


###  🪄 Now let's add the Symfoni magic ✨

* Up untill now this is all just a regular Buidler project. Now run this command to add our packages:

`npm add @nomiclabs/buidler @symfoni/buidler-react @symfoni/buidler-typechain @typechain/ethers-v5 buidler-deploy buidler-ethers-v5 ethers ts-generator ts-node typechain typescript`

* Convert the project to a Buidler Typescript project by overwriting Buidler with the Symfoni configuration files ✨:

* Change the contents of `buidler.config.ts` to:

```typescript
import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";

usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");
usePlugin("@symfoni/buidler-typechain");
usePlugin("@symfoni/buidler-react");

const config: BuidlerConfig = {
  solc: {
    version: "0.6.8",
  },
};

export default config;

```

* Create `tsconfig.json`:
```json
{
   "compilerOptions":{
      "target":"es5",
      "module":"commonjs",
      "strict":true,
      "esModuleInterop":true,
      "outDir":"dist"
   },
   "include":[
      "./scripts",
      "./test",
      "./deploy"
   ],
   "files":[
      "./buidler.config.ts",
      "./node_modules/buidler-deploy/src/type-extensions.d.ts",
      "./node_modules/buidler-ethers-v5/src/type-extensions.d.ts",
      "./node_modules/@blockchangers/buidler-typechain/src/type-extensions.d.ts",
      "./node_modules/@symfoni/buidler-react/src/type-extensions.d.ts"
   ]
}
```






**Setup complete! 🥳**


## 🎨 Lets create the frontend

* Generate the React app:

`npx create-react-app frontend --template typescript`

* Go into the front-end folder: 

`cd frontend/`

* Then we need to add the dependencies:

> Note that "Create React app" comes with an old version of Typescript, which is not compatible with Typechain, so let's also ensure Typescript is fixed at v3.9.7. Please note that v4 does not work.

`npm add web3modal ethers typescript@^3.9.7`

* Serve the generated front-end application:

`npm run start`

* Now lets add the Buidler context to the front-end. Open in your code editor of choice `/frontend/src/App.tsx`

* Add to the imports on the top: `import { BuidlerContext } from "./buidler/BuidlerContext”;`

* Wrap your app in this context to have it available to use in any children: `<BuidlerContext></BuidlerContext>`

**Front-end setup complete! 🎉**

You can now start developing your app or continue with the tutorial.

## 📙 Tutorial 

To continue from here, you must have chosen `Create a sample project` way back in the first step.

Lets create a components that consumes a smart contract and gives us some results. From the Buidler sample project we have a smart contract called `Greeter.sol`.

* Create a `tsx` file for the view of the smart contract

`touch /frontend/component/Greeter.tsx`

* Open the file in your favorite editor and copy&paste:

```typescript
import React, { useContext, useEffect, useState } from 'react';
import { GreeterContext } from "./../buidler/BuidlerContext";

interface Props { }

export const Greeter: React.FC<Props> = () => {
    const greeter = useContext(GreeterContext)
    const [message, setMessage] = useState("");
    useEffect(() => {
        const doAsync = async () => {
            if (greeter.instance) {
                console.log("Greeter is deployed at ", greeter.instance.address)
                setMessage(await greeter.instance.greet())
            }
        };
        doAsync();
    }, [greeter])
    return (
        <div>
            <p>{message}</p>
        </div>
    )
}
```

Note that the Greeter context both provide you with

* a contract which contains all your functions, events and info, and
* a factory where you can let users easily deploy new contract instances from the frontend.

Lets import this component into our app, which leaves our `App.tsx` like this:

```typescript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BuidlerContext } from "./buidler/BuidlerContext";
import { Greeter } from './components/Greeter';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BuidlerContext>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <Greeter></Greeter>
        </BuidlerContext>
      </header>
    </div>
  );a
}

export default App;
```

You should see the Greeting from the smart contract and at what address it is deployed to. 

[You can see a full working example of the tutorial here](https://github.com/symfoni/buidler-react-boilerplate)

**Thanks for completing our tutorial!**

We hope that you can use this to more efficently write Ethereum applications 📈 If you have any feedback, good or bad, please don't hesitate to ping us at [@_robertosnap](https://twitter.com/_robertosnap/) and [@jonramvi](https://twitter.com/jonramvi/) 🐦
