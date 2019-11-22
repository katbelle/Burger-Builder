import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

//variable below is in all caps because its going to be a global variable
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    //method to check whether we should turn purchaseable (in state) to true or keep it false. 
    updatePurchaseState (ingredients) {
        console.log(ingredients);
        //returns an array of strings ['salad', 'bacon', 'cheese','meat']
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            //this time we want to reduce the array to turn it into a single number (the sum of all the ingredients the user picks)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState( { purchaseable: sum > 0 } )
    }

    //Methods to build whats actually going to be on the burger

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        // state update when new ingredient is added
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }


    //disabled fn below will let program know which buttons should be clickable
    // step 1: create a var called "disabledInfo" & make it a shallow copy of the state object
    // step 2: loop through all the keys in disabledInfo object and check if the count is zero or less
    // if it is zero or less, set it to disabled. 
        render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;