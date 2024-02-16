import 'react-native';
import { describe, it } from '@jest/globals';
import { RenderJSXBuilder } from '../RenderJSXBuilder';
import { CounterProvider, useCounter } from '../CounterContext';
import React from 'react';
import { Text, View } from 'react-native';

class ExtendedRenderer extends RenderJSXBuilder {
    counter(initialValue: number) {
        this.wrapperElements.push(children => <CounterProvider initialValue={initialValue} children={children} />);
        return this;
    }
}

function Hello() {
    const counterValue = useCounter();
    return (
        <View>
            <Text>Hello {counterValue.value}</Text>
        </View>
    );
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
