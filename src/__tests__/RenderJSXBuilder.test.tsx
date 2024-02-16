import 'react-native';
import { describe, expect, it } from '@jest/globals';
import { CounterProvider, useCounter } from '../CounterContext';
import React from 'react';
import { Text, View } from 'react-native';

import { RenderBuilder } from '../RenderBuilder';

class MyRenderBuilder extends RenderBuilder {
    counter(initialValue: number) {
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
        const renderApi = new MyRenderBuilder().counter(0).renderJSX(<Hello />);
        renderApi.getByText('Hello 0');
    });

    it('renders with counter value', () => {
        const renderApi = new MyRenderBuilder().counter(1).renderJSX(<Hello />);
        renderApi.getByText('Hello 1');
    });
});

describe('render hook ', () => {
    it('renders with default counter', () => {
        const renderApi = new MyRenderBuilder().counter(0).renderHookAndGetResult(useHelloHook);
        expect(renderApi).toEqual('Hello 0');
    });

    it('renders with counter value', () => {
        const renderApi = new MyRenderBuilder().counter(1).renderHookAndGetResult(useHelloHook);
        expect(renderApi).toEqual('Hello 1');
    });
});
