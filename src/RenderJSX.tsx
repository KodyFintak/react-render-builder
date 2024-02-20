import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

export class RenderJSX {
    constructor(private content: React.JSX.Element) {}

    jsx() {
        return this.content;
    }

    render(): RenderAPI {
        return render(this.jsx());
    }
}
