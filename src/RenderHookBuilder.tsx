import { RenderBuilder } from './RenderBuilder';
import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-native';

export class RenderHookBuilder<T> extends RenderBuilder {
    constructor(private hookCallback: () => T) {
        super();
    }

    render() {
        const wrapperFunc = (props: PropsWithChildren<any>) =>
            this.wrapperElements.reverse().reduce((children, providerFunction) => {
                return providerFunction(children);
            }, props.children);

        return renderHookWithWrapperRaw(this.hookCallback, wrapperFunc);
    }

    renderAndGetResult() {
        return this.render().result.current;
    }
}

function renderHookWithWrapperRaw<TValue>(
    callback: () => TValue,
    wrapper: (props: PropsWithChildren<any>) => React.JSX.Element,
) {
    return renderHook(callback, { wrapper });
}
