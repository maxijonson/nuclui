# Known Issues

This file is just to keep track of some issues in Nuclui that I have yet to find an answer on how to fix them.

## Docs dependencies (`low`)

Although some docs specific dependencies are declared in the `dependencies` of [package.json](./package.json), they are stripped out before publishing to NPM using [scripts](./scripts/prepublishOnly.js). Since the docs are hosted on Heroku, this was necessary in order to make the docs work while keeping these docs specific dependencies out of the final product. I am aware this is a hacky solution and [I am looking for cleaner alternatives](https://stackoverflow.com/questions/62460197/how-do-you-exclude-certain-dependencies-from-being-published-with-npm).

## Third-Party Typings Dependency (`low`)

This is more or less a problem. Some types used by Nuclui come from third party typing modules, such as styled-components. When the package is published, the typings often refer to these external typings by importing them. However, if the user does not have the required types installed already, the whole component will have type `any`. To solve this, the types used have also been listed as dependencies so they are installed with Nuclui. This is okay for TypeScript users, however JavaScript users will still have the package installed. Finally, if a project using Nuclui as a dependency is published as well, the users of this package will also have these types installed, which bloats node_modules even more than it is already.

The reason I'm not too worried about this is explained in this issue: [How do I decide whether @types/\* goes into dependencies or devDependencies?](https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies)

## Branch coverage not working on object destructuring (`low`)

Some destructured properties with default values prevent coverage from being considered as covered, for unknown reasons. This notably happens on the `as` prop for components that can have a custom root node (such as Container and Flex). This can be "fixed" by using the old way of specifying defaults:

Example of the problem:

```tsx
const CustomComponent = (props) => {
    const { as: Component = "div", ...restProps } = props; // Here, the "," is considered as "not covered"
    return <Component {...restProps} />;
};
```

Example of the fix:

```tsx
const CustomComponent = (props) => {
    const { as, ...restProps } = props;
    const Component = as || "div"; // For unknown reasons, using the "??" operator instead of "||" gives the same issue. Maybe related?
    return <Component {...restProps} />;
};
```

See:

-   [why is a constructor parameter considered a branch and not covered?](https://github.com/istanbuljs/istanbuljs/issues/70)

## Casting components' default export (`high`)

Components with a dynamic root node (with the `component` prop) that are exported from a Styled-Component are often casted into the original component's type.

```tsx
const Component: Nui.FRC<{ someProp: string }, "div"> = React.forwardRef(
    (props, ref) => {
        const { component: Component } = props;
        return <Component ref={ref} />;
    }
);
const StyledComponent = styled(Component)`
    position: relative;
`;

export default StyledComponent as typeof Component;
```

This is done in order to preserve the dynamic HTML props and ref type behavior. If I was to export the `StyledComponent` without casting, when using it, none of the props specified in `Nui.FRC` are present. The only props are styled-components' base props (`as`, `theme`, `forwardedAs`, etc). It appears styled-components cannot carry props over when they are generic. I've managed to almost fix this by editing `NUI.FRC` and adding a non-generic function the `NUI.FRC`'s interface:

```ts
interface FowardedRefComponent<P extends object, D extends React.ElementType> {
    <C extends React.ElementType = D>(
        props: P & { component?: C } & Omit<
                React.ComponentPropsWithRef<C>,
                keyof P
            >
    ): React.ReactElement | null;

    /* Added this function */
    (
        props: P & { component?: D } & Omit<
                React.ComponentPropsWithRef<D>,
                keyof P
            >
    ): React.ReactElement | null;

    readonly $$typeof: symbol;
    defaultProps?: Partial<
        P & { component?: React.ElementType } & Omit<
                React.ComponentPropsWithRef<D>,
                keyof P
            >
    >;
    propTypes?: React.WeakValidationMap<
        P & { component?: React.ElementType } & Omit<
                React.ComponentPropsWithRef<D>,
                keyof P
            >
    >;
    displayName?: string;
}
```

Styled-components seems to understand the props of the second function and carries them over into the exported component. However, `component` can only be `"div" | undefined` and the `ref` will always be of type `HTMLDivElement`. For some unknown reason, it will never pick the first function which contains a generic parameter.

There are quite big issues with casting the export to its original type:

-   I really don't like the fact that I am casting an export. Casting in general, in my opinion, can lead to unexpected results and is an indication of a flaw in typings. In my case, I am pretty sure `NUI.FRC` has something to do with this flaw and that is why I've been trying solutions on this type rather than typing Styled-Components.
-   Since it is no longer typed as a StyledComponent, the component cannot be used as a selector inside tagged templates of other Styled-Components. However, it can still be casted inside of the template into one.
-   JSDocs for the component itself do not carry over, so there is no way of getting a description of the component when using it. However, JSDocs for props still pass.
-   Possibly more issues I have just yet to stumble upon.

Here are some issues I've stumbled on while searching for a solution:

-   [[TypeScript] styled wrapper doesn't preserve generic props](https://github.com/styled-components/styled-components/issues/1803)
-   [[@types/styled-components] Generics in functional components (and best practise for generics in general)](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/39136)
