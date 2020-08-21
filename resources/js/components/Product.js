import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import {Table,Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';


export class ContainerProduct extends React.Component {
    constructor(props) {
        super()
        this.state = {            
            items: [],
            newProductData:{
               nombre_producto: '',
               referencia: '',
               precio: '',
               peso: '',
               categoria: '',
               stock: '',
               fecha_venta:''
            },
            editProductData:{
                id:'',
                nombre_producto: '',
                referencia: '',
                precio: '',
                peso: '',
                categoria: '',
                stock: '',
                fecha_venta:''
             },
            newProductModal: false,
            editProductModal: false,           
            errors: {}
        }
    }
    componentWillMount() {
       this._refreshProduct();

    }

    toggleNewProductModal(){
        this.setState({
            newProductModal:!this.state.newProductModal
        });
        //this.state.newProductModal = true;

    }   
    toggleEditProductModal(){
        this.setState({
            editProductModal:!this.state.editProductModal
        });
        //this.state.newProductModal = true;

    }  
    addProduct(){
        if(this.handleValidation()){
            alert("Enviado");            
         }else{
            alert("Formulario tiene errores")
            console.log(this.state.errors)
            return false
         }
        axios.post('http://127.0.0.1:8000/product/add',{
            nombre_producto: this.state.newProductData.nombre_producto,
                referencia: this.state.newProductData.referencia,
                precio: this.state.newProductData.precio,
                peso: this.state.newProductData.peso,
                categoria: this.state.newProductData.categoria,
                stock: this.state.newProductData.stock,
                fecha_venta:this.state.newProductData.fecha_venta               
        }).then((response) => {
               let{ items } = this.state;
               items.push(response.data);
               this.setState({items, newProductModal: false, newProductData: {
                nombre_producto: '',
                referencia: '',
                precio: '',
                peso: '',
                categoria: '',
                stock: '',
                fecha_venta:''  
               }});
                console.log(response.data);
            })
            .catch(function (error) {
                //handle error
                console.log(error);
            });
    }
    updateProduct(){        
        axios.put('http://127.0.0.1:8000/product/update',{
            id: this.state.editProductData.id,
            nombre_producto: this.state.editProductData.nombre_producto,
                referencia: this.state.editProductData.referencia,
                precio: this.state.editProductData.precio,
                peso: this.state.editProductData.peso,
                categoria: this.state.editProductData.categoria,
                stock: this.state.editProductData.stock,
                fecha_venta:this.state.editProductData.fecha_venta               
        }).then((response) => {
          this._refreshProduct();
          this.setState({
              editProductModal:false, editProductData: {
                nombre_producto: '',
                referencia: '',
                precio: '',
                peso: '',
                categoria: '',
                stock: '',
                fecha_venta:''  
               }
          })          
             //console.log(response.data);
         })
         .catch(function (error) {
             //handle error
             console.log(error);
         });

    }
    
    editProduct(id, nombre_producto, referencia, precio, peso, categoria, stock, fecha_venta){
        this.setState({
            editProductData:{id, nombre_producto, referencia, precio, peso, categoria, stock, fecha_venta}, editProductModal:!this.state.editProductModal
        });
    

    }
    deleteProduct(id){
        axios.delete('http://127.0.0.1:8000/product/delete/'+id).then((response) => {
          
        this._refreshProduct();          
             console.log(response);
         })
         .catch(function (error) {
             //handle error
             console.log(error);
         });
    }

    handleValidation(){        
        let errors = {};
        let formIsValid = true;

        //nombre_producto
        if(this.state.newProductData.nombre_producto == ''){           
           formIsValid = false;
           errors["nombre_producto"] = "No puede estar vacio";
        }

        if(typeof this.state.newProductData.nombre_producto !== "undefined"){
           if(!this.state.newProductData.nombre_producto.match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["nombre_producto"] = "Solo letras";
           }        
        }

         //referencia
         if(this.state.newProductData.referencia == ''){
            formIsValid = false;
            errors["referencia"] = "No puede estar vacio";
         }
 
         if(typeof this.state.newProductData.referencia !== "undefined"){
            if(!this.state.newProductData.referencia.match(/^[0-9]+$/)){
               formIsValid = false;
               errors["referencia"] = "Solo número";
            }        
         }

         //precio
         if(this.state.newProductData.precio == ''){
            formIsValid = false;
            errors["precio"] = "No puede estar vacio";
         }
 
         if(typeof this.state.newProductData.precio !== "undefined"){
            if(!this.state.newProductData.precio.match(/^[0-9]+$/)){
               formIsValid = false;
               errors["precio"] = "Solo número";
            }        
         }

           //peso
           if(this.state.newProductData.peso == ''){
            formIsValid = false;
            errors["peso"] = "No puede estar vacio";
         }
 
         if(typeof this.state.newProductData.peso !== "undefined"){
            if(!this.state.newProductData.peso.match(/^[0-9]+$/)){
               formIsValid = false;
               errors["peso"] = "Solo número";
            }        
         }

         //categoria
         if(this.state.newProductData.categoria == ''){
            formIsValid = false;
            errors["categoria"] = "No puede estar vacio";
         }
 
         if(typeof this.state.newProductData.categoria !== "undefined"){
            if(!this.state.newProductData.categoria.match(/^[A-Za-z\s]+$/g)){
               formIsValid = false;
               errors["categoria"] = "Solo letras";
            }        
         }

          //stock
          if(this.state.newProductData.stock == ''){
            formIsValid = false;
            errors["stock"] = "No puede estar vacio";
         }
 
         if(typeof this.state.newProductData.stock !== "undefined"){
            if(!this.state.newProductData.stock.match(/^[0-9]+$/)){
               formIsValid = false;
               errors["stock"] = "Solo número";
            }        
         }

         //fecha venta
         if(this.state.newProductData.fecha_venta == ""){
            formIsValid = false;
            errors["fecha_venta"] = "No puede estar vacio";
         }
        

       this.setState({errors: errors});
       return formIsValid;
   }

   
    _refreshProduct(){
        axios.get('http://127.0.0.1:8000/product')
        .then((response) => {
            console.log(response.data);
            this.setState({
                items: response.data.product.data
            })

            console.log(this.state.items)

        })
        .catch(function (error) {
            //handle error
            console.log(error);
        });

    }
    render() {
        let items = this.state.items.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre_producto}</td>
                    <td>{item.referencia}</td>
                    <td>{item.precio}</td>
                    <td>{item.peso}</td>
                    <td>{item.categoria}</td>
                    <td>{item.stock}</td>
                    <td>{item.fecha_creacion}</td>
                    <td>{item.fecha_venta}</td>
                    <td>
                    <Button color="success" size="sm" onClick={this.editProduct.bind(this, item.id, item.nombre_producto, item.referencia, item.precio, item.peso, item.categoria, item.stock, item.fecha_venta)}>Editar</Button> 
                    <Button color="danger" onClick={this.deleteProduct.bind(this, item.id)} size="sm">Eliminar</Button>
                    </td>
                </tr>
            )

        });
        return (
            <div className="container">
                <h1>Aplicación producto</h1>
                
                <Button color="primary" onClick={this.toggleNewProductModal.bind(this)}>Agregar producto</Button>

                <Modal isOpen={this.state.newProductModal} toggle={this.toggleNewProductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewProductModal.bind(this)}>Agregar producto </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="nombre del producto">Nombre del producto</Label>
                    <Input type="text" id="nombre_producto"  placeholder="ingresar normbre del producto" value={this.state.newProductData.nombre_producto}
                    onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.nombre_producto = e.target.value;
                        this.setState({newProductData});
                    }} />
                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                     </FormGroup>
                     <FormGroup>
                    <Label for="referencia">Referencia</Label>
                    <Input type="number" id="referencia" placeholder="ingresar referencia" value={this.state.newProductData.referencia}
                    onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.referencia = e.target.value;
                        this.setState({newProductData});
                    }} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="precio">Precio</Label>
                    <Input type="number" name="precio" id="precio" placeholder="ingresar precio" value={this.state.newProductData.precio}
                     onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.precio = e.target.value;
                        this.setState({newProductData});
                    }}
                     />
                    </FormGroup>
                    <FormGroup>
                    <Label for="peso">Peso</Label>
                    <Input type="number" name="peso" id="peso" placeholder="ingresar peso" value={this.state.newProductData.peso}
                     onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.peso = e.target.value;
                        this.setState({newProductData});
                    }}
                     />
                    </FormGroup>
                    <FormGroup>
                    <Label for="categoria">Categoría</Label>
                    <Input type="text" name="categoria" id="categoria" placeholder="ingresar categoria" value={this.state.newProductData.categoria}
                     onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.categoria = e.target.value;
                        this.setState({newProductData});
                    }}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="stock">Stock</Label>
                    <Input type="text" name="stock" id="stock" placeholder="ingresar stock" value={this.state.newProductData.stock}
                    onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.stock = e.target.value;
                        this.setState({newProductData});
                    }}
                    />
                    </FormGroup>
                    <FormGroup>                    
                    <Label for="fecha_venta">Fecha venta</Label>
                    <Input
                    type="datetime"
                    name="fecha_venta"
                    id="fecha_venta"
                    placeholder="ingresar fecha venta"
                    value={this.state.newProductData.fecha_venta}
                    onChange={(e) => {
                        let {newProductData} = this.state;
                        newProductData.fecha_venta = e.target.value;
                        this.setState({newProductData});
                    }}
                    />
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addProduct.bind(this)}>Agregar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewProductModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editProductModal} toggle={this.toggleEditProductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>Editar producto </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="nombre del producto">Nombre del producto</Label>
                    <Input type="text" id="nombre_producto"  placeholder="ingresar normbre del producto" value={this.state.editProductData.nombre_producto}
                    onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.nombre_producto = e.target.value;
                        this.setState({editProductData});
                    }} />
                     </FormGroup>
                     <FormGroup>
                    <Label for="referencia">Referencia</Label>
                    <Input type="number" id="referencia" placeholder="ingresar referencia" value={this.state.editProductData.referencia}
                    onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.referencia = e.target.value;
                        this.setState({editProductData});
                    }} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="precio">Precio</Label>
                    <Input type="number" name="precio" id="precio" placeholder="ingresar precio" value={this.state.editProductData.precio}
                     onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.precio = e.target.value;
                        this.setState({editProductData});
                    }}
                     />
                    </FormGroup>
                    <FormGroup>
                    <Label for="peso">Peso</Label>
                    <Input type="number" name="peso" id="peso" placeholder="ingresar peso" value={this.state.editProductData.peso}
                     onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.peso = e.target.value;
                        this.setState({editProductData});
                    }}
                     />
                    </FormGroup>
                    <FormGroup>
                    <Label for="categoria">Categoría</Label>
                    <Input type="text" name="categoria" id="categoria" placeholder="ingresar categoria" value={this.state.editProductData.categoria}
                     onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.categoria = e.target.value;
                        this.setState({editProductData});
                    }}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="stock">Stock</Label>
                    <Input type="text" name="stock" id="stock" placeholder="ingresar stock" value={this.state.editProductData.stock}
                    onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.stock = e.target.value;
                        this.setState({editProductData});
                    }}
                    />
                    </FormGroup>
                    <FormGroup>                    
                    <Label for="fecha_venta">Fecha venta</Label>
                    <Input
                    type="datetime"
                    name="fecha_venta"
                    id="fecha_venta"
                    placeholder="ingresar fecha venta"
                    value={this.state.editProductData.fecha_venta}
                    onChange={(e) => {
                        let {editProductData} = this.state;
                        editProductData.fecha_venta = e.target.value;
                        this.setState({editProductData});
                    }}
                    />
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateProduct.bind(this)}>Editar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditProductModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre de producto</th>
                            <th>Referencia</th>
                            <th>Precio</th>
                            <th>Peso</th>
                            <th>Categoria</th>
                            <th>Stock</th>
                            <th>Fecha de creación</th>
                            <th>Fecha de Venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            </div>
        )
    }



}

ContainerProduct.propTypes = {


}


if (document.getElementById('product')) {
    ReactDOM.render(<ContainerProduct />, document.getElementById('product'));
}

