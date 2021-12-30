import React from 'react';

function Loader({loading}) { 
    return ( 
        <>
            { loading 
            ? <div className="loadBox">
                    <img src="/images/etc/loading.gif" width="100"/>
                </div>
            : null
            }
        </>
    ); 
} 
        
export default Loader;

