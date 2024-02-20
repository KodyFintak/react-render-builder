import { RenderJSX } from './RenderJSX';
import { PropsWithChildren } from 'react';
import { HookCallback, RenderHook } from './RenderHook';
import { Element } from './Element';
import { RenderAPI, RenderHookResult } from '@testing-library/react-native';

export type ProviderFunction = (children: Element) => Element;

export class ReactRenderBuilder {
    private wrapperElements: ProviderFunction[] = [];

    protected addElement(wrapperElement: ProviderFunction) {
        this.wrapperElements.push(wrapperElement);
    }

    private createJSX(innerMostElement: Element) {
        return this.wrapperElements.reverse().reduce((children, providerFunction) => {
            return providerFunction(children);
        }, innerMostElement);
    }

    render(element: Element): RenderAPI {
        return new RenderJSX(this.createJSX(element)).render();
    }

    toJSX(element: Element = <></>): Element {
        return new RenderJSX(this.createJSX(element)).jsx();
    }

    renderHook<Result, Props>(hookCallback: HookCallback<Result, Props>): RenderHookResult<Result, Props> {
        return new RenderHook(hookCallback, this.wrapperFunction()).render();
    }

    renderHookResult<Result, Props>(hookCallback: HookCallback<Result, Props>): Result {
        return new RenderHook(hookCallback, this.wrapperFunction()).renderAndGetResult();
    }

    private wrapperFunction() {
        return (props: PropsWithChildren<any>) => this.createJSX(props.children);
    }
}
