import React from 'react'

const withClass = (WrappedComponent, className) => {
    return (props) => (
        <div className = {className}>
            <WrappedComponent {...props}/>
        </div>
    )

    // above code is equivalent to the below code
    // return (props) => {
    //     return <div className = {className}>
    //                 <WrappedComponent {...props}/>
    //            </div>
    // }
}

export default withClass;