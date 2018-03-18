import React from 'react';

import { auth } from '../../index';

const SignOutButton = () =>
    <button
        type="button"
        onClick={auth.doSignOut}
        className="btn-sm navigation"
    >
        SIGN OUT
    </button>

export default SignOutButton;