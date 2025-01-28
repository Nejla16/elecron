import React, { useEffect } from "react";
import CategoryComponents from "../components/CategoryComponents";
import ProductService from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import SingleCardComponents from "../components/SingleCardComponents";
import { productsHandler } from "../store/productSlice";

function ProductPage() {

  const {products, currentCategory} = useSelector(state => state.productStore)
  const dispatch = useDispatch();
  
  useEffect(() => {
    ProductService.getAllProducts()
    .then((res) => dispatch(productsHandler(res.data.products)))
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    ProductService.getProductByCategory(currentCategory)
    .then(res => {
      dispatch(productsHandler(res.data.products))
    })
    .catch(err => console.log(err))
  }, [currentCategory]) //kada se trenutna kategorija pokrene (da li kategorija laptopi, parfemi..) on se pokrece i na tu promjenu

  return (
  <div>
    <CategoryComponents />

    <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[50px] gap-3 place-items-center">
      {products.map(product => {
        return <SingleCardComponents key={product.id} product={product} />
      })}
    </div>
    </div>
  </div>
)
}

export default ProductPage;
