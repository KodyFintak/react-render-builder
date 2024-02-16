import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { RenderBuilder } from './RenderBuilder';

export class RenderJSXBuilder extends RenderBuilder {
    constructor(private content: React.JSX.Element) {
        super();
    }

    render(): RenderAPI {
        return render(this.jsx());
    }

    jsx() {
        return this.wrapperElements.reverse().reduce((children, providerFunction) => {
            return providerFunction(children);
        }, this.content);
    }
}
