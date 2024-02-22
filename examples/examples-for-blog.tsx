import { render, RenderAPI } from '@testing-library/react-native';
import { it } from '@jest/globals';
import React, { PropsWithChildren } from 'react';
import { ReactRenderBuilder } from 'react-render-builder';

it('renders hello', () => {
    const renderApi = render(<Hello name={'Kody'} />);
    renderApi.getByText('Hello Kody!');
});

it('renders hello with Redux', () => {
    const store = createTestReduxStore({ name: 'Kody' });
    const renderApi = render(
        <Provider store={store}>
            <Hello />
        </Provider>,
    );
    renderApi.getByText('Hello Kody!');
});

function renderWithStore(element: Element, store: Store): RenderAPI {
    return render(<Provider store={store}>{element}</Provider>);
}

function renderWithStoreAndToday(
    element: Element,
    store: Store,
): RenderAPI {
    return renderWithStore(
        <TodayDateTimeProvider>{element}</TodayDateTimeProvider>,
        store,
    );
}

function renderWithNavigation(element: Element, store: Store) {
    return renderWithStoreAndToday(
        <NavigationContainer>{element}</NavigationContainer>,
        store,
    );
}

function renderHookWithStore<T>(hook: () => T, store: Store) {
    const wrapper = (props: PropsWithChildren) => (
        <Provider store={store}>{props.children}</Provider>
    );
    return renderHook(hook, { wrapper });
}

it('renders hook with Builder', () => {
    const store = createTestReduxStore({ name: 'Kody' });
    const helloText = new RenderHookBuilder()
        .store(store)
        .today()
        .navigation()
        .renderHookResult(useHello);
    expect(helloText).toEqual('Hello Kody!');
});

describe('with name Kody', () => {
    let builder: RenderHookBuilder;

    beforeEach(() => {
        const store = createTestReduxStore({ name: 'Kody' });
        builder = new RenderHookBuilder().store(store);
    });

    it('shows today as current time', () => {
        const text = builder
            .today()
            .renderHookResult(useTimeGreeting);
        expect(text).toEqual(
            'Greetings Kody. The date is 2024-01-02',
        );
    });

    it('shows yesterday as current time', () => {
        const text = builder
            .yesterday()
            .renderHookResult(useTimeGreeting);
        expect(text).toEqual(
            'Greetings Kody. The date is 2024-01-01',
        );
    });
});

it('renders hello with Builder', () => {
    const store = createTestReduxStore({ name: 'Kody' });
    const renderApi = new RenderBuilder()
        .store(store)
        .today()
        .navigation()
        .render(<Hello />);
    renderApi.getByText('Hello Kody!');
});

class RenderBuilder extends ReactRenderBuilder {
    store(store: Store): this {
        this.addElement(children => (
            <Provider store={store} children={children} />
        ));
        return this;
    }

    today(): this {
        this.addElement(children => (
            <TodayTimeProvider children={children} />
        ));
        return this;
    }
}
