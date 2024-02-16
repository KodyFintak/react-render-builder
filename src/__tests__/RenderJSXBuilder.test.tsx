import 'react-native';
import { describe, expect, it } from '@jest/globals';
import { RenderJSXBuilder } from '../RenderJSXBuilder';
import { CounterProvider, useCounter } from '../CounterContext';
import React from 'react';
import { Text, View } from 'react-native';
import { RenderHookBuilder } from '../RenderHookBuilder';

class ExtendedRenderer extends RenderJSXBuilder {
    counter(initialValue: number) {
        this.addElement(children => <CounterProvider initialValue={initialValue} children={children} />);
        return this;
    }
}

class ExtendedHookRenderer<T> extends RenderHookBuilder<T> {
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
        const renderApi = new ExtendedRenderer(<Hello />).counter(0).render();
        renderApi.getByText('Hello 0');
    });

    it('renders with counter value', () => {
        const renderApi = new ExtendedRenderer(<Hello />).counter(1).render();
        renderApi.getByText('Hello 1');
    });
});

describe('render hook ', () => {
    it('renders with default counter', () => {
        const renderApi = new ExtendedHookRenderer(useHelloHook).counter(0).renderAndGetResult();
        expect(renderApi).toEqual('Hello 0');
    });

    it('renders with counter value', () => {
        const renderApi = new ExtendedHookRenderer(useHelloHook).counter(1).renderAndGetResult();
        expect(renderApi).toEqual('Hello 1');
    });
});
