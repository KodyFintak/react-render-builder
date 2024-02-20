# react-render-builder

Simplify reusing Context-like components when testing Components and Hooks in React-Native

## Install

### yarn

```shell
yarn add react-render-builder
```

### npm

```shell
npm install react-render-builder
```

## Usage

First create your RenderBuilder with any builder methods for adding in components you want

```tsx
import { CounterProvider } from './CounterContext';
import { ReactRenderBuilder } from 'react-render-builder';

export class RenderBuilder extends ReactRenderBuilder {
    counter(initialValue: number): this {
        this.addElement(children => <CounterProvider initialValue={initialValue} children={children}/>);
        return this;
    }
}
```

Then you can use it in your tests

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { describe, expect, it } from '@jest/globals';
import { useCounter } from './CounterContext';
import { RenderBuilder } from './RenderBuilder';

describe('hello with counter 1', () => {
    const renderBuilder = new RenderBuilder().counter(1);

    it('render correct string in Hello Component', () => {
        const renderApi = renderBuilder.render(<Hello/>);
        renderApi.getByText('Hello 1');
    });

    it('returns correct string in useHelloHook', () => {
        const helloText = renderBuilder.renderHookResult(useHelloHook);
        expect(helloText).toEqual('Hello 1');
    });
});

function Hello() {
    const counterValue = useHelloHook();
    return (
        <View>
            <Text>{counterValue}</Text>
        </View>
    );
}

function useHelloHook() {
    const counterValue = useCounter();
    return `Hello ${counterValue.value}`;
}
```

## Documentation

### ReactRenderBuilder

Wraps @testing-library/react-native [render](https://testing-library.com/docs/react-testing-library/api/#render)
and [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook) functions with a builder
interface for easily reusing setup of your JSX tree.

Typically, you will extend this class (as in the example above) and add in builder methods you will use in your tests
for reusing JSX Tree setup.

#### Methods

##### addElement

Only to be used on your extension of `ReactRenderBuilder`, this is used in your builder methods for wrapping a component
in the tree.

###### Parameters

- wrapperElement: ProviderFunction that is a function that given a child element returns an Element wrapped with that
  child.

e.g.

```tsx
this.addElement(children => <MyComponent children={children}/>);
```

##### render

##### toJSX

##### renderHook

##### renderHookResult



