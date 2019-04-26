import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Tabs from '../common/tab/tabs';
import TabsHeader from '../common/tab/tabsHeader';
import TabHeader from '../common/tab/tabHeader';
import TabsContent from '../common/tab/tabsContent';
import TabContent from '../common/tab/tabContent';
import { SALE_FORM } from '../main/util/types';
import { init, create, update, remove } from '../crud/crudActions';

import List from './saleList';
import Form from './saleForm';

class Sale extends Component {

    componentWillMount() {
        this.props.init('sales', SALE_FORM);
        localStorage.setItem('form', SALE_FORM);
    }

    render() {
        return (
            <div>
                <ContentHeader title='Vendas' small='Movimentações' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <List />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form
                                    onSubmit={this.props.create}
                                    submitLabel='Incluir' submitClass='primary'
                                />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form
                                    onSubmit={this.props.update}
                                    submitLabel='Alterar' submitClass='info'
                                />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form
                                    onSubmit={this.props.remove} readOnly
                                    submitLabel='Excluir' submitClass='danger'
                                />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init, create, update, remove
}, dispatch);

export default connect(null, mapDispatchToProps)(Sale);
