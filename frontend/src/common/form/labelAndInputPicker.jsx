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

    componentWillMount() {
        // console.log(date.toLocaleString());
        this.props.changeDate(this.props.startDate);
    }

    handleChange(date) {
        this.props.changeDate(date);
    }

    render() {
        // console.log(this.props.date);
        return (
            <Grid cols={this.props.cols}>
                <div className='form-group'>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    <DatePicker
                        className='form-control'
                        dateFormat='dd/MM/yyyy'
                        selected={this.props.date.length != undefined ? convertStringToDateTime(this.props.date) : this.props.date}
                        onChange={this.handleChange}
                        placeholderText={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        locale={pt}
                    />
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ date: state.crud.dateSale });
const mapDispatchToProps = dispatch => bindActionCreators({ changeDate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InputPicker);
