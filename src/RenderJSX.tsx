import React from 'react';
import { render, RenderResult } from '@testing-library/react';

export class RenderJSX {
    constructor(private content: React.JSX.Element) {}

    jsx(): React.JSX.Element {
        return this.content;
    }

    render(): RenderResult {
        return render(this.jsx());
    }
}
