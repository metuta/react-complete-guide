import React from 'react';

const withClass = (WrappedComponent, className) => { // this function can have any number of parameters.
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;