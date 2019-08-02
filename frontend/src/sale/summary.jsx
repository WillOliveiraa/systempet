import React from 'react';

import ValueBox from '../common/widget/valueBox';
import Grid from '../common/layout/grid';
import Row from '../common/layout/row';
import { floatToString } from '../crud/functions';

export default props => (
    <Grid cols='12 12'>
        <fieldset>
            <legend>{props.legend}</legend>
            <Row>
                <div style={{ backgroundColor: 'green' }} class='teste'>
                    <ValueBox
                        cols='12 4' color='blue' icon='shopping-cart'
                        value={props.count} text='Quantidade de Itens'
                    />
                    <ValueBox
                        cols='12 4' color='green' icon='usd' text='Total da Venda'
                        value={props.total !== 0 ? `R$ ${floatToString(props.total)}`
                            : `R$ ${floatToString('0')}`}
                    // value='1.500'
                    />
                </div>
            </Row>
        </fieldset>
    </Grid>
);
