import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    
    return (
        <p className='text-rose-600 text-sm'>{children}</p>
    )
}

export default ErrorMessage;