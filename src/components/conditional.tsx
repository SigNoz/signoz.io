function Conditional(props) {
    const { If, children } = props;

    if (If) {
        return children;
    } else {
        return null;
    }
};

export { Conditional };