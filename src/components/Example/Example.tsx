import React from "react";
import { createComponentName } from "@utils";

const Example = () => <div>Example</div>;

Example.displayName = createComponentName("example");

export default Example;
