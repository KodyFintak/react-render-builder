import { RenderJSXBuilder } from './RenderJSXBuilder';
import { PropsWithChildren } from 'react';
import { HookCallback, RenderHookBuilder } from './RenderHookBuilder';
import { Element, ProviderFunction } from './Element';
import { RenderHookResult } from '@testing-library/react-native';

export abstract class RenderBuilder {
    protected wrapperElements: ProviderFunction[] = [];

    protected addElement(element: ProviderFunction) {
        this.wrapperElements.push(element);
    }

    protected createJSX(innerMostElement: Element) {
        return this.wrapperElements.reverse().reduce((children, providerFunction) => {
            return providerFunction(children);
        }, innerMostElement);
    }

    render(element: Element) {
        return new RenderJSXBuilder(this.createJSX(element)).render();
    }

    renderHook<Result, Props>(hookCallback: HookCallback<Result, Props>): RenderHookResult<Result, Props> {
        return new RenderHookBuilder(hookCallback, this.wrapperFunction()).render();
    }

    renderHookResult<Result, Props>(hookCallback: HookCallback<Result, Props>): Result {
        return new RenderHookBuilder(hookCallback, this.wrapperFunction()).renderAndGetResult();
    }

    private wrapperFunction() {
        return (props: PropsWithChildren<any>) => this.createJSX(props.children);
    }
}
