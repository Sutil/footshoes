import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>

        <tbody>
          { cart.map(product => (
            <tr>
            <td>
              <img
                src={product.image}
                alt={product.title}
              />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.formattedPrice}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={() => decrement(product)} >
                  <MdRemoveCircleOutline size={20} color="#49265c" />
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#49265c" />
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subTotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => removeFromCart(product.id)} >
                <MdDelete size={20} color="#49265c" />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{ total }</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.amount * product.price;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect (mapStateToProps, mapDispatchToProps)(Cart);
