import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

//type property below should match exactly what is in
//the burger ingredient component 

const controls = [
    { label: 'Salad', type: 'salad' }, 
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.buildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
);

export default buildControls;

