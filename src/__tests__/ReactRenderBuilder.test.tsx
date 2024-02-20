import 'react-native';
import { describe, expect, it } from '@jest/globals';
import { CounterProvider, useCounter } from '../../examples/CounterContext';
import React from 'react';
import { Text, View } from 'react-native';

import { ReactRenderBuilder } from '../ReactRenderBuilder';

class RenderBuilder extends ReactRenderBuilder {
    counter(initialValue: number): this {
        this.addElement(children => <CounterProvider initialValue={initialValue} children={children} />);
        return this;
    }
}

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

describe('render jsx builder', () => {
    it('renders with default counter', () => {
        const renderApi = new RenderBuilder().counter(0).render(<Hello />);
        renderApi.getByText('Hello 0');
    });

    it('renders with counter value', () => {
        const renderApi = new RenderBuilder().counter(1).render(<Hello />);
        renderApi.getByText('Hello 1');
    });

    it('gets jsx without passing element', () => {
        const jsx = new RenderBuilder().counter(1).toJSX();
        expect(jsx).toEqual(
            <CounterProvider initialValue={1}>
                <></>
            </CounterProvider>,
        );
    });

    it('gets jsx with counter provider', () => {
        const jsx = new RenderBuilder().counter(1).toJSX(<Hello />);
        expect(jsx).toEqual(
            <CounterProvider initialValue={1}>
                <Hello />
            </CounterProvider>,
        );
    });
});

describe('render hook ', () => {
    it('renders with default counter', () => {
        const helloText = new RenderBuilder().counter(0).renderHookResult(useHelloHook);
        expect(helloText).toEqual('Hello 0');
    });

    it('renders with counter value', () => {
        const helloText = new RenderBuilder().counter(1).renderHookResult(useHelloHook);
        expect(helloText).toEqual('Hello 1');
    });

    it('renders with full hook result', () => {
        const renderHookResult = new RenderBuilder().counter(0).renderHook(useHelloHook);
        expect(renderHookResult.result.current).toEqual('Hello 0');
    });
});
