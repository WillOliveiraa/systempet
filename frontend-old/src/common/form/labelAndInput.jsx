import React from 'react';
import '../../../node_modules/admin-lte/plugins/input-mask/jquery.inputmask.js';

import Grid from '../layout/grid';

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            {/* sprad: passando todos os dados para o input */}
            <input {...props.input} className='form-control'
                placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type}
                // data-inputmask="'mask': 'dd/mm/yyyy'"
                // data-inputmask="'alias': 'dd/mm/yyyy'"
                // data-mask=''
            />
        </div>
    </Grid>
);
