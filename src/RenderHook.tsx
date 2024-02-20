import { PropsWithChildren } from 'react';
import { renderHook, RenderHookResult } from '@testing-library/react-native';
import { Element } from './Element';

export type HookCallback<Result, Props> = (props: Props) => Result;

export class RenderHook<Result, Props> {
    constructor(
        private hookCallback: HookCallback<Result, Props>,
        private wrapperFunc: (props: PropsWithChildren) => Element,
    ) {}

    render(): RenderHookResult<Result, Props> {
        return renderHook(this.hookCallback, { wrapper: this.wrapperFunc });
    }

    renderAndGetResult() {
        return this.render().result.current;
    }
}
