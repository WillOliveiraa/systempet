import React from 'react';

import MenuItem from './menuItem';
import MenuTree from './menuTree';

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'> 
            <MenuItem
                path='clients'
                label='Clientes' icon='user'
            />
            <MenuItem
                path='providers'
                label='Fornecedores' icon='user-o'
            />
            <MenuItem
                path='animals'
                label='Animais' icon='paw'
            />
            <MenuItem
                path='products'
                label='Produtos' icon='shopping-cart'
            />
        </MenuTree>
        <MenuTree label='Movimentações' icon='edit'> 
            <MenuItem
                path='sales'
                label='Vendas' icon='shopping-cart'
            />
            <MenuItem
                path='purchases'
                label='Compras' icon='shopping-bag'
            />
        </MenuTree>
    </ul>
);
