import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initialCount } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';
import { CLIENTS_COUNT, PRODUCTS_COUNT, ANIMALS_COUNT } from '../main/util/types';

class Dashboard extends Component {

    componentWillMount() {
        this.props.initialCount('clients', CLIENTS_COUNT);
        this.props.initialCount('products', PRODUCTS_COUNT);
        this.props.initialCount('animals', ANIMALS_COUNT);
    }

    render() {
        const { client, product, animal } = this.props.dashboard;
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox
                            cols='12 4' color='green' icon='user'
                            value={client} text='Quantidade de Clientes'
                        />
                        <ValueBox
                            cols='12 4' color='red' icon='shopping-cart'
                            value={product} text='Quantidade de Produtos'
                        />
                        <ValueBox
                            cols='12 4' color='blue' icon='paw'
                            value={animal} text='Quantidade de Animais'
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
