import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { changeDate } from '../../crud/crudActions';
import Grid from '../layout/grid';
import { convertStringToDateTime } from '../../crud/functions';

class InputPicker extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.props.changeDate(this.props.idForm, date);
    }

    renderDate(startDate) {
        // console.log(startDate);
        return (
            <DatePicker
                className='form-control'
                dateFormat='dd/MM/yyyy'
                selected={startDate.length !== undefined ? convertStringToDateTime(startDate) : startDate}
                onChange={this.handleChange}
                placeholderText={this.props.placeholder}
                readOnly={this.props.readOnly}
                locale={pt}
            />
        );
    }

    render() {
        // console.log(this.props);
        const { startDate } = this.props;
        return (
            <Grid cols={this.props.cols}>
                <div className='form-group'>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    {this.renderDate(startDate)}
                </div>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeDate }, dispatch);

export default connect(null, mapDispatchToProps)(InputPicker);
