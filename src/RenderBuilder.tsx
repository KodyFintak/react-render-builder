import React from 'react';
import { CounterProvider } from './CounterContext';

export type ProviderFunction = (children: React.JSX.Element) => React.JSX.Element;

export abstract class RenderBuilder {
    protected wrapperElements: ProviderFunction[] = [];

    protected constructor() {}

    counter() {
        this.wrapperElements.push(children => <CounterProvider children={children} />);
        return this;
    }
}
