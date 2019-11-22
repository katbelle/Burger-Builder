import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { arrayExpression } from '@babel/types';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        //This bit of code underneath is a built-in JS method that basically
        //squashes the array into one value, which is good if we have an array 
        // of empty things because then we can make a conditional statement once its
        //reduced to check that the length is equal to zero
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please add some ingredients to your burger :)</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;