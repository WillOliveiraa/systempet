import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initialCount } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';
import { SALES_COUNT, PRODUCTS_COUNT, PURCHASES_COUNT } from '../main/util/types';

class Dashboard extends Component {

    componentWillMount() {
        this.props.initialCount('sales', SALES_COUNT);
        this.props.initialCount('products', PRODUCTS_COUNT);
        this.props.initialCount('purchases', PURCHASES_COUNT);
    }

    render() {
        const { sale, product, purchase } = this.props.dashboard;
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox
                            cols='12 4' color='green' icon='shopping-cart'
                            value={sale} text='Quantidade de Vendas'
                        />
                        <ValueBox
                            cols='12 4' color='red' icon='paw'
                            value={product} text='Quantidade de Produtos'
                        />
                        <ValueBox
                            cols='12 4' color='blue' icon='shopping-bag'
                            value={purchase} text='Quantidade de Compras'
                        />
                    </Row>
                </Content>
            </div>
        );
    }
}

const mapStateToProps = state => ({ dashboard: state.dashboard.dashboard });
const mapDispatchToProps = dispatch => bindActionCreators({ initialCount }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
