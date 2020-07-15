# Known Issues

This file is just to keep track of some issues in Nuclui that I have yet to find an answer on how to fix them.

### Docs dependencies

Although some docs specific dependencies are declared in the `dependencies` of [package.json](./package.json), they are stripped out before publishing to NPM using [scripts](./scripts/prepublishOnly.js). Since the docs are hosted on Heroku, this was necessary in order to make the docs work while keeping these docs specific dependencies out of the final product. I am aware this is a hacky solution and [I am looking for cleaner alternatives](https://stackoverflow.com/questions/62460197/how-do-you-exclude-certain-dependencies-from-being-published-with-npm).

### Third-Party Typings Dependency

This is more or less a problem. Some types used by Nuclui come from third party typing modules, such as styled-components. When the package is published, the typings often refer to these external typings by importing them. However, if the user does not have the required types installed already, the whole component will have type `any`. To solve this, the types used have also been listed as dependencies so they are installed with Nuclui. This is okay for TypeScript users, however JavaScript users will still have the package installed. Finally, if a project using Nuclui as a dependency is published as well, the users of this package will also have these types installed, which bloats node_modules even more than it is already.

The reason I'm not too worried about this is explained in this issue: [How do I decide whether @types/\* goes into dependencies or devDependencies?](https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies)
