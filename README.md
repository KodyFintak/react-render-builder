# react-render-builder

Encapsulate Context/Data Providers when testing Components and Hooks in React-Native

Extension of @testing-library/react-native [render](https://testing-library.com/docs/react-testing-library/api/#render)
and [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook) functions with a builder
interface for easily reusing setup of your JSX tree.

## Install

### yarn

```shell
yarn add --dev react-render-builder
```

### npm

```shell
npm install --save-dev react-render-builder
```

This library has a peerDependencies listing
for [@testing-library/react-native](https://github.com/callstack/react-native-testing-library). Make sure you install it
alongside this library.

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

###### Example

```tsx
this.addElement(children => <MyContext children={children}/>);
```

##### render

Wraps @testing-library/react-native [render](https://testing-library.com/docs/react-testing-library/api/#render)
function, but wraps given element with tree constructed via `addElement` in builder methods.

###### Parameters

- element: React JSX Element to render

###### Returns

- renderAPI:
  @testing-library/react-native [RenderAPI](https://testing-library.com/docs/react-testing-library/api/#render-result)

###### Example

```tsx
const renderAPI = new RenderBuilder().render(<MyComponent/>);
```

##### toJSX

Returns JSX Tree that will be passed to `render`. Useful for debugging or for rerendering via the
[rerender](https://testing-library.com/docs/react-testing-library/api/#rerender) method from
the [RenderAPI](https://testing-library.com/docs/react-testing-library/api/#render-result).

###### Parameters

- element: React JSX Element to render

###### Returns

- JSX element that is the entire tree

###### Example

```tsx
const jsxTree = new RenderBuilder().toJSX(<MyComponent/>);
```

##### renderHook

Wraps @testing-library/react-native [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook)
function, but wraps given hook with tree constructed via `addElement` in builder methods.

###### Parameters

- hook: React Hook to render

###### Returns

- renderHookResult:
  @testing-library/react-native [RenderHookResult](https://testing-library.com/docs/react-testing-library/api/#renderhook)

###### Example

```tsx
const renderHookResult = new RenderBuilder().renderHook(useMyHook);
```

##### renderHookResult

Same as `renderHook` but returns the given hooks return value. Same as calling `renderHook(useMyHook).result.current`.

###### Parameters

- hook: React Hook to render

###### Returns

- return value of given hook

###### Example

```tsx
const helloString = new RenderBuilder().renderHookResult(() => useHello('John'));
```

