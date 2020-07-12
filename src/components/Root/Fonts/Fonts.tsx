import React from "react";
import { createComponentName } from "@utils";
import { Helmet } from "react-helmet";

const Fonts = () => (
    <Helmet>
        <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
    </Helmet>
);

Fonts.displayName = createComponentName("Fonts");

export default Fonts;
