import { createSlice, current } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalPrice: 0, 
        totalProducts: 0,
    },
    reducers: {
        saveProductHandler: (state, action) => {

            let copyArray = [... state.cart];
            let findIndex = null;
            copyArray.find((el, index) => {
                if(el.id === action.payload.id){
                    findIndex = index;
                }
            })

            if(findIndex === null){
                //dodajemo proizvod
                copyArray.push({
                    ...action.payload,
                    count: 1,
                    cartTotal: action.payload.price
                })
                state.totalProducts++;
                state.totalPrice += action.payload.price;
            }else{
                copyArray[findIndex].count++;
            }
            state.cart = copyArray;
        },
        setPriceHandler: (state, action) => {
            const {increment, index} = action.payload;

            //Promjeniti logiku, da se salje item(jedan proizvod preko action.payloa) i da se nadje index u array-u(state.cart) - (zadatak za uraditi)

            let copyArray = [...state.cart];

            copyArray[index].cartTotal += copyArray[index].price * increment;

            state.totalPrice = subTotal(copyArray) //subTotal-pozivamo function copyArray-prosljedjujemo

            //ovdje hendlujemo minus(increment)
            if(copyArray[index].count === 1 && increment === -1){ //u ovaj if ulazi samo ako je count 1 i ako smo kliknuli na -1
                //u ovom slucaju brisemo (kolicinu) proizvod iz korpe
                copyArray.splice(index, 1);
                state.totalProducts--;
            }else{
                copyArray[index].count += increment; //povecava ili umanjuje kolicinu proizvoda
            }

            state.cart = copyArray;
        }
    }
})

//reduce metodom prolazimo kroz array i izracunavamo state.totalPrice!
function subTotal(arrayCart){
    return arrayCart.reduce((acc, current) => {
        return acc + current.cartTotal;
    }, 0)
   
}

export const {saveProductHandler, setPriceHandler} = cartSlice.actions;
export default cartSlice.reducer;