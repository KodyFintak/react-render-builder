```tsx
it('renders Hello', () => {
    const renderApi = render(<Hello name={'Kody'}/>);
    renderApi.getByText('Hello Kody!');
});
```

"I never thought I would miss styling with CSS, but then I used React-Native StyleSheets...."

This new blog, by our coaches Kody Fintak and Adam Whaley, introduces our new, open-source React-Native library
media-style-sheet, that adds Media Query Extensions to React-Native.

If you have found yourself struggling with styling across multiple device configurations, give this a read.
