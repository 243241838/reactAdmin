import React, { Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
function Template(props) {
    const [token] = useState(React.$Cookies.get('token'))
    return (
        <div>
            <Suspense fallback={<div>Loading</div>}>
                {token && renderRoutes(props.route.children)}

            </Suspense>
        </div>
    )
}
export default Template;