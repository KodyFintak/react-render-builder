import React from 'react';

export type ProviderFunction = (children: React.JSX.Element) => React.JSX.Element;

export abstract class RenderBuilder {
    protected wrapperElements: ProviderFunction[] = [];

    protected constructor() {}

    protected addElement(element: ProviderFunction) {
        this.wrapperElements.push(element);
    }

    protected createJSX(innerMostElement: React.JSX.Element) {
        return this.wrapperElements.reverse().reduce((children, providerFunction) => {
            return providerFunction(children);
        }, innerMostElement);
    }
}
