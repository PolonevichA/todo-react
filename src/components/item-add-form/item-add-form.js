import React, { Component } from 'react';


import './item-add-form.css'

export default class ItemAddForm extends Component {

    constructor(){
        super()

        this.state = {
            label: ''
        }

        this.onLabelChange = (e) => {
            this.setState({
                label: e.target.value
            })
        }
    }
    
    render() {

        return (
            <form className='item-add-form d-flex'>
                <input type='text'
                       className= 'form-control'
                       onChange = {this.onLabelChange}
                       placeholder ='What needs to be done?' />
                <button 
                className='btn btn-outline-secondary'
                onClick = {() => this.props.addItem('Hello World')}>add item</button>
            </form> 
        )
    }
}