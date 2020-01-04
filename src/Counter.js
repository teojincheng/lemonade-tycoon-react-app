import React from 'react';
export default class Counter{
    counterValue = 0;


    update(newValue){
        this.counterValue = newValue;
    }

    getValue(){
        return this.counterValue;
    }

    displayValue(){
        return <div>{this.getValue()}</div>
    }

}